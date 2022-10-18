/*
 * @Descripttion: 看板相关接口请求
 * @Author: huangjitao
 * @Date: 2021-07-17 11:04:02
 * @Function: 该文件用途描述
 */

import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "types/Kanban";

import { useHttp } from "utils/http";
import {
  useAddOptimistic,
  useDeleteOptimistic,
  useReorderKanbanOptimistic,
} from "utils/useOptimistic";

export const useKanbans = (param?: Partial<Kanban>) => {
  const httpFetch = useHttp();

  return useQuery<Kanban[]>(["kanbans", param], () =>
    httpFetch("kanbans", { data: param })
  );
};

export const useAddKanban = (queryKey: QueryKey) => {
  const httpFetch = useHttp();
  return useMutation(
    (params: Partial<Kanban>) =>
      httpFetch(`kanbans`, {
        data: params,
        method: "POST",
      }),
    useAddOptimistic(queryKey)
  );
};

export const useDeleteKanban = (queryKey: QueryKey) => {
  const httpFetch = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      httpFetch(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useDeleteOptimistic(queryKey)
  );
};

export interface SortProps {
  // 要重新排序的 item
  fromId: number;
  // 目标 item
  referenceId: number;
  // 放在目标item的前还是后
  type: "before" | "after";
  fromKanbanId?: number;
  toKanbanId?: number;
}

export const useReorderKanban = (queryKey: QueryKey) => {
  const httpFetch = useHttp();
  return useMutation(
    (params: SortProps) =>
      httpFetch("kanbans/reorder", {
        data: params,
        method: "POST",
      }),
    useReorderKanbanOptimistic(queryKey)
  );
};
