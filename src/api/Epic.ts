/*
 * @Descripttion: 任务组相关接口请求
 * @Author: huangjitao
 * @Date: 2021-07-25 19:18:32
 * @Function: 该文件用途描述
 */

import { QueryKey, useMutation, useQuery } from "react-query";
import { Epic } from "types/Epic";
import { useHttp } from "utils/http";
import { useAddOptimistic, useDeleteOptimistic } from "utils/useOptimistic";

export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp();

  return useQuery<Epic[]>(["epics", param], () =>
    client("epics", { data: param })
  );
};

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics`, {
        data: params,
        method: "POST",
      }),
    useAddOptimistic(queryKey)
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`epics/${id}`, {
        method: "DELETE",
      }),
    useDeleteOptimistic(queryKey)
  );
};
