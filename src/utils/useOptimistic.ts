/*
 * @Descripttion: 乐观更新通用hook
 * @Author: huangjitao
 * @Date: 2021-07-13 22:09:45
 * @Function: 该文件用途描述
 */

import { reorder } from "pages/projectBoard/utils";
import { QueryKey, useQueryClient } from "react-query";
import { Task } from "types/Task";

const useOptimistic = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    onMutate: async (target: any) => {
      // 乐观更新
      const previousItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });
      return { previousItems };
    },
    onError: (error: Error, newItem: any, context: any) => {
      // 修改失败，回滚数据
      queryClient.setQueryData(queryKey, context.previousItems);
    },
  };
};

export const useEditOptimistic = (queryKey: QueryKey) =>
  useOptimistic(
    queryKey,
    (target, old) =>
      old?.map((item) =>
        item.id === target.id ? { ...item, ...target } : item
      ) || []
  );

export const useDeleteOptimistic = (queryKey: QueryKey) =>
  useOptimistic(
    queryKey,
    (target, old) => old?.filter((item) => item.id !== target.id) || []
  );

export const useAddOptimistic = (queryKey: QueryKey) =>
  useOptimistic(queryKey, (target, old) => (old ? [...old, target] : [target]));

export const useReorderKanbanOptimistic = (queryKey: QueryKey) =>
  useOptimistic(queryKey, (target, old) => reorder({ list: old, ...target }));

export const useReorderTaskOptimistic = (queryKey: QueryKey) =>
  useOptimistic(queryKey, (target, old) => {
    const orderedList = reorder({ list: old, ...target }) as Task[];
    return orderedList.map((item) =>
      item.id === target.fromId
        ? { ...item, kanbanId: target.toKanbanId }
        : item
    );
  });

export default useOptimistic;
