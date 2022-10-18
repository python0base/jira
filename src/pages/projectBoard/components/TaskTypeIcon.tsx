/*
 * @Descripttion: 任务类型图标组件
 * @Author: huangjitao
 * @Date: 2021-07-17 18:31:39
 * @Function: 该文件用途描述
 */

import { useTaskTypes } from "api/Task";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";

export const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskType } = useTaskTypes();
  const name = taskType?.find((type) => type.id === id)?.name;

  if (name) {
    return <img src={name === "task" ? taskIcon : bugIcon} alt="#" />;
  } else {
    return null;
  }
};
