/*
 * @Descripttion: 项目详情入口文件
 * @Author: huangjitao
 * @Date: 2021-04-24 20:04:59
 * @Function: use of this file
 */

import React from "react";
import { Link } from "react-router-dom";
import { Navigate, Route, Routes } from "react-router";
import ProjectBoard from "pages/projectBoard";
import TaskGroup from "pages/taskGroup";
import styled from "@emotion/styled";
import { Menu } from "antd";
import { useRouteType } from "./utils";

const ProjectDetail = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu mode={"inline"} selectedKeys={[routeType]}>
          <Menu.Item key={"kanban"}>
            <Link to={"kanban"}>看板</Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to={"epic"}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          {/*projects/:projectId/kanban*/}
          <Route path={"/kanban"} element={<ProjectBoard />} />
          {/*projects/:projectId/epic*/}
          <Route path={"/epic"} element={<TaskGroup />} />
          <Navigate to={window.location.pathname + "/kanban"} replace={true} />
        </Routes>
      </Main>
    </Container>
  );
};

export default ProjectDetail;

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
  width: 100%;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`;
