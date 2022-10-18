/*
 * @Descripttion: your project
 * @Author: huangjitao
 * @Date: 2021-07-19 20:45:40
 * @Function: 该文件用途描述
 */

import { Card, Input } from "antd";
import { useAddTask } from "api/Task";
import { useEffect, useState } from "react";
import { useProjectIdInUrl, useTasksQueryKey } from "../utils";

interface CreateTaskProps {
  kanbanId: number;
}

export const CreateTask = (props: CreateTaskProps) => {
  const { kanbanId } = props;
  const [name, setName] = useState<string>("");
  const [inputMode, setInputMode] = useState<boolean>(false);
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());

  const submit = async () => {
    await addTask({ name, projectId, kanbanId });
    setInputMode(false);
    setName("");
  };

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  const toggle = () => setInputMode((mode) => !mode);

  if (!inputMode) {
    return <div onClick={toggle}> + 创建任务</div>;
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        name={name}
        onChange={(evt) => setName(evt.target.value)}
        autoFocus={true}
        onPressEnter={submit}
      />
    </Card>
  );
};
