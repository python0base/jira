/*
 * @Descripttion: 项目相关请求封装
 * @Author: huangjitao
 * @Date: 2021-04-22 22:16:18
 * @Function: use of this file
 */
import { Project } from "types/Project";
import { useProjectParamsSearch } from "pages/projectList/utils";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { useDeleteOptimistic, useEditOptimistic } from "utils/useOptimistic";
import useUrlQueryParam from "utils/useUrlQueryParam";

export const useProjects = (params?: Partial<Project>) => {
  const httpFetch = useHttp();
  return useQuery<Project[]>(["projects", params], () =>
    httpFetch("projects", { data: cleanObject(params || {}) })
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const httpFetch = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      httpFetch(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditOptimistic(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const httpFetch = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      httpFetch(`projects`, {
        data: params,
        method: "POST",
      }),
    useEditOptimistic(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const httpFetch = useHttp();
  return useMutation(
    ({ id }: { id: number }) =>
      httpFetch(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteOptimistic(queryKey)
  );
};

/**
 *
 * @param id 根据id请求project详细信息
 * @returns
 */
export const useProject = (id?: number) => {
  const httpFetch = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => httpFetch(`projects/${id}`),
    {
      enabled: Boolean(id),
    }
  );
};
