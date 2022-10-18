/*
 * @Descripttion: 创建看板组件
 * @Author: huangjitao
 * @Date: 2021-07-19 20:32:24
 * @Function: 该文件用途描述
 */

import { useAddKanban } from "api/Kanban";
import { useState } from "react";
import { useKanbansQueryKey, useProjectIdInUrl } from "../utils";
import { Container } from "pages/projectBoard/components/KanbanColumn";
import { Input } from "antd";

export const CreateKanban = () => {
  const [name, setName] = useState<string>("");

  const projectId = useProjectIdInUrl();
  const kanbanQueryKey = useKanbansQueryKey();
  const { mutateAsync: addKanban } = useAddKanban(kanbanQueryKey);

  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };

  return (
    <Container>
      <Input
        value={name}
        placeholder="请输入看板名称"
        onPressEnter={submit}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Container>
  );
};
