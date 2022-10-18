/*
 * @Descripttion: 看板、任务相关的工具函数hooks
 * @Author: huangjitao
 * @Date: 2021-07-17 11:07:13
 * @Function: 该文件用途描述
 */

import { useKanbans, useReorderKanban } from "api/Kanban";
import { useProject } from "api/Projects";
import { useReorderTask, useTask, useTasks } from "api/Task";
import { useCallback, useMemo } from "react";
import { DropResult } from "react-beautiful-dnd";
import { useLocation } from "react-router";
import { useDebounce } from "utils";
import useUrlQueryParam from "utils/useUrlQueryParam";

/**
 * 获取url中的projectId
 * @returns
 */
export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

/**
 * 根据url中的projectId获取项目数据
 */
export const useProjectInUrl = () => useProject(useProjectIdInUrl());

/**
 * 根据url中的projectId获取看板请求参数
 */
export const useKanbansSearchParams = () => ({
  projectId: useProjectIdInUrl(),
});

export const useKanbansQueryKey = () => ["kanbans", useKanbansSearchParams()];

/**
 * 根据url中的projectId获取任务请求参数
 */
export const useTasksSearchParams = () => {
  const [params, setParams] = useUrlQueryParam([
    "name",
    "typeId",
    "processorId",
    "tagId",
  ]);
  const projectId = useProjectIdInUrl();

  const name = useDebounce(params.name, 200);

  return useMemo(
    () => ({
      projectId,
      name: name || undefined,
      typeId: Number(params.typeId) || undefined,
      processorId: Number(params.processorId) || undefined,
      tagId: Number(params.tagId) || undefined,
    }),
    [projectId, params]
  );
};

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];

export const useTaskModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId",
  ]);
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));

  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );

  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: "" });
  }, [setEditingTaskId]);

  return {
    editingTask,
    isLoading,
    startEdit,
    close,
    editingTaskId,
  };
};

export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbansSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
  const { data: allTasks = [] } = useTasks(useTasksSearchParams());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      // 看板排序
      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({ fromId, referenceId: toId, type });
      }
      if (type === "ROW") {
        const fromKanbanId = +source.droppableId;
        const toKanbanId = +destination.droppableId;
        // if (fromKanbanId === toKanbanId) {
        //   return;
        // }
        const fromTask = allTasks.filter(
          (task) => task.kanbanId === fromKanbanId
        )[source.index];
        const toTask = allTasks.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ];
        if (fromTask?.id === toTask?.id) {
          return;
        }
        reorderTask({
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
          type:
            fromKanbanId === toKanbanId && destination.index > source.index
              ? "after"
              : "before",
        });
      }
    },
    [kanbans, reorderKanban, allTasks, reorderTask]
  );
};

export const reorder = ({
  fromId,
  type,
  referenceId,
  list,
}: {
  list: { id: number }[];
  fromId: number;
  type: "after" | "before";
  referenceId: number;
}) => {
  const copiedList = [...list];
  // 找到fromId对应项目的下标
  const movingItemIndex = copiedList.findIndex((item) => item.id === fromId);
  if (!referenceId) {
    return insertAfter([...copiedList], movingItemIndex, copiedList.length - 1);
  }
  const targetIndex = copiedList.findIndex((item) => item.id === referenceId);
  const insert = type === "after" ? insertAfter : insertBefore;
  return insert([...copiedList], movingItemIndex, targetIndex);
};

/**
 * 在list中，把from放在to的前边
 * @param list
 * @param from
 * @param to
 */
const insertBefore = (list: unknown[], from: number, to: number) => {
  const toItem = list[to];
  const removedItem = list.splice(from, 1)[0];
  const toIndex = list.indexOf(toItem);
  list.splice(toIndex, 0, removedItem);
  return list;
};

/**
 * 在list中，把from放在to的后面
 * @param list
 * @param from
 * @param to
 */
const insertAfter = (list: unknown[], from: number, to: number) => {
  const toItem = list[to];
  const removedItem = list.splice(from, 1)[0];
  const toIndex = list.indexOf(toItem);
  list.splice(toIndex + 1, 0, removedItem);
  return list;
};
