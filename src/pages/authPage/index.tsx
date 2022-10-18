/*
 * @Descripttion: 认证通过页面主入口
 * @Author: huangjitao
 * @Date: 2021-04-17 19:00:51
 * @Function: use of this file
 */
import styled from "@emotion/styled";
import ProjectList from "pages/projectList";
import Header from "./components/Header";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import ProjectDetail from "pages/project";
import ProjectModal from "pages/projectList/components/ProjectModal";

const AuthPage = () => {
  return (
    <Container>
      <BrowserRouter>
        <Header />
        <Main>
          <Routes>
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/:projectId/*" element={<ProjectDetail />} />
            <Navigate to={"/projects"} />
          </Routes>
        </Main>
        <ProjectModal />
      </BrowserRouter>
    </Container>
  );
};

export default AuthPage;

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Main = styled.main`
  display: flex;
  overflow: hidden;
`;
