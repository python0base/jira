/*
 * @Descripttion: 业务组件--任务类型选择器
 * @Author: huangjitao
 * @Date: 2021-07-18 16:22:35
 * @Function: 该文件用途描述
 */

import { useTaskTypes } from "api/Task";
import React from "react";
import IdSelect from "components/IdSelect";

export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IdSelect>
) => {
  const { data: taskTypes } = useTaskTypes();
  return <IdSelect options={taskTypes || []} {...props} />;
};
