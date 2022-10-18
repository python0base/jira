/*
 * @Descripttion: 看板列表
 * @Author: huangjitao
 * @Date: 2021-07-17 16:09:05
 * @Function: 该文件用途描述
 */

import React from "react";
import { Kanban } from "types/Kanban";
import {
  useKanbansQueryKey,
  useTaskModal,
  useTasksSearchParams,
} from "pages/projectBoard/utils";
import { TaskTypeIcon } from "./TaskTypeIcon";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { useTasks } from "api/Task";
import { CreateTask } from "pages/projectBoard/components/CreateTask";
import { Row } from "components";
import { useDeleteKanban } from "api/Kanban";
import { Mark } from "./Mark";
import { Drag, Drop, DropChild } from "components/DragAndDrop";

export const KanbanColumn = React.forwardRef<
  HTMLDivElement,
  { kanban: Kanban }
>(({ kanban, ...props }, ref) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  const { startEdit } = useTaskModal();
  const { name: keyword } = useTasksSearchParams();

  const More = ({ kanban }: { kanban: Kanban }) => {
    const { mutateAsync } = useDeleteKanban(useKanbansQueryKey());
    const onDelete = () => {
      Modal.confirm({
        okText: "确定",
        cancelText: "取消",
        title: "确定删除看板吗",
        onOk() {
          return mutateAsync({ id: kanban.id });
        },
      });
    };
    const overlay = (
      <Menu>
        <Menu.Item>
          <Button type={"link"} onClick={onDelete}>
            删除
          </Button>
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={overlay}>
        <Button type={"link"}>...</Button>
      </Dropdown>
    );
  };

  return (
    <Container {...props} ref={ref}>
      <Row justifyContent="space-between">
        <h3>{kanban.name}</h3>
        <More kanban={kanban} />
      </Row>

      <TasksContainer>
        <Drop droppableId={String(kanban.id)} type="ROW" direction="vertical">
          <DropChild style={{ minHeight: "1rem" }}>
            {tasks?.map((task, taskIndex) => (
              <Drag
                key={task.id}
                draggableId={"task" + task.id}
                index={taskIndex}
              >
                <div>
                  <Card
                    style={{ marginBottom: "0.5rem", cursor: "pointer" }}
                    key={task.id}
                    onClick={() => {
                      startEdit(task.id);
                    }}
                  >
                    <p>
                      <Mark name={task.name} keyword={keyword} />
                    </p>
                    <TaskTypeIcon id={task.typeId} />
                  </Card>
                </div>
              </Drag>
            ))}
          </DropChild>
        </Drop>
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  );
});

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`;
