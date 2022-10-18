/*
 * @Descripttion: 任务相关接口请求
 * @Author: huangjitao
 * @Date: 2021-07-17 11:04:09
 * @Function: 该文件用途描述
 */

import { QueryKey, useMutation, useQuery } from "react-query";
import { Project } from "types/Project";
import { Task } from "types/Task";
import { TaskType } from "types/TaskType";
import { useHttp } from "utils/http";
import {
  useAddOptimistic,
  useDeleteOptimistic,
  useEditOptimistic,
  useReorderTaskOptimistic,
} from "utils/useOptimistic";
import { SortProps } from "./Kanban";

export const useTasks = (param?: Partial<Task>) => {
  const httpFetch = useHttp();

  return useQuery<Task[]>(["tasks", param], () =>
    httpFetch("tasks", { data: param })
  );
};

export const useTask = (id?: number) => {
  const httpFetch = useHttp();

  return useQuery<Task>(["tasks", { id }], () => httpFetch(`tasks/${id}`), {
    enabled: Boolean(id),
  });
};

export const useTaskTypes = (param?: Partial<TaskType>) => {
  const httpFetch = useHttp();

  return useQuery<TaskType[]>(["taskTypes"], () =>
    httpFetch("taskTypes", { data: param })
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const httpFetch = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      httpFetch(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddOptimistic(queryKey)
  );
};

export const useEditTask = (queryKey: QueryKey) => {
  const httpFetch = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      httpFetch(`tasks/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditOptimistic(queryKey)
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const httpFetch = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      httpFetch(`tasks/${id}`, {
        method: "DELETE",
      }),
    useDeleteOptimistic(queryKey)
  );
};

export const useReorderTask = (queryKey: QueryKey) => {
  const httpFetch = useHttp();
  return useMutation(
    (params: SortProps) =>
      httpFetch("tasks/reorder", {
        data: params,
        method: "POST",
      }),
    useReorderTaskOptimistic(queryKey)
  );
};
