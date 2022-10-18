/*
 * @Descripttion: 任务看板
 * @Author: huangjitao
 * @Date: 2021-04-24 21:01:29
 * @Function: use of this file
 */

import styled from "@emotion/styled";
import { useDocumentTitle } from "utils/useDocumentTitle";
import { KanbanColumn } from "pages/projectBoard/components/KanbanColumn";
import {
  useDragEnd,
  useKanbansSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "pages/projectBoard/utils";
import { useKanbans } from "api/Kanban";
import { SearchPannel } from "pages/projectBoard/components/SearchPannel";
import { Container } from "components";
import { CreateKanban } from "./components/CreateKanban";
import { useTasks } from "api/Task";
import { Spin } from "antd";
import { EditTask } from "./components/EditTask";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "components/DragAndDrop";
import { Profiler } from "components/Profiler";

const ProjectBoard = () => {
  useDocumentTitle("看板列表");
  const { data: currentProject } = useProjectInUrl();
  const { data: kanbans, isLoading: kanbanIsLoading } = useKanbans(
    useKanbansSearchParams()
  );
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || kanbanIsLoading;

  const onDragEnd = useDragEnd();

  return (
    <Profiler id={"看板页面"}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Container>
          <h3>{currentProject?.name}</h3>
          <SearchPannel />
          {isLoading ? (
            <Spin size={"large"} />
          ) : (
            <ColumnsContainer>
              <Drop droppableId="kanban" type="COLUMN" direction="horizontal">
                <DropChild style={{ display: "flex" }}>
                  {kanbans?.map((kanban, index) => (
                    <Drag
                      draggableId={"kanban" + kanban.id}
                      index={index}
                      key={kanban.id}
                    >
                      <KanbanColumn kanban={kanban} key={kanban.id} />
                    </Drag>
                  ))}
                </DropChild>
              </Drop>
              <CreateKanban />
            </ColumnsContainer>
          )}
          <EditTask />
        </Container>
      </DragDropContext>
    </Profiler>
  );
};

export default ProjectBoard;

const ColumnsContainer = styled("div")`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
