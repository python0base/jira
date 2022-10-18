/*
 * @Descripttion: 与项目列表有关的工具函数
 * @Author: huangjitao
 * @Date: 2021-04-28 20:38:45
 * @Function: use of this file
 */

import { useProject } from "api/Projects";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useUrlQueryParam, { useSetUrlSearchParam } from "utils/useUrlQueryParam";

/**
 * 使用useUrlQueryParam，从url中获取的参数值永远是string类型
 */
export const useProjectParamsSearch = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectsQueryKey = () => {
  const [params] = useProjectParamsSearch();
  return ["projects", params];
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);

  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );

  const setUrlSearchParam = useSetUrlSearchParam();
  const close = () =>
    setUrlSearchParam({ editingProjectId: "", projectCreate: "" });
  const open = () => setProjectCreate({ projectCreate: true });
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });

  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProjectId),
    closeModal: close,
    openModal: open,
    editingProject,
    startEdit,
    isLoading,
  } as const;
};
