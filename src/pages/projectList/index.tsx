/*
 * @Descripttion: 项目列表页面主入口
 * @Author: huangjitao
 * @Date: 2021-04-17 19:00:52
 * @Function: use of this file
 */
import React, { useState } from "react";
import SearchList from "./components/SearchList";
import SearchPannel from "./components/SearchPannel";
import { useDebounce } from "utils";
import { useUsers } from "api/Users";
import { useProjects } from "api/Projects";
import { Button, Input } from "antd";
import { useDocumentTitle } from "utils/useDocumentTitle";
import { useProjectModal, useProjectParamsSearch } from "./utils";
import { Container, Row } from "components";
import { ErrorBox } from "components/FullError";

const ProjectList = () => {
  const [param, setParam] = useProjectParamsSearch();
  const { data: users } = useUsers();
  const { isLoading, error, data: lists } = useProjects(
    useDebounce(param, 500)
  );
  const { openModal } = useProjectModal();

  useDocumentTitle("项目列表", false);

  // const [state, setstate] = useState('1')

  return (
    <Container>
      <Row justifyContent="space-between" style={{ marginBottom: 13 }}>
        <h2>项目列表</h2>
        <Button style={{ padding: 0 }} onClick={openModal} type={"link"}>
          创建项目
        </Button>
      </Row>
      {/* <Input value={state} onChange={(e) => setstate(e.target.value)} /> */}
      <SearchPannel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <SearchList
        loading={isLoading}
        dataSource={lists || []}
        users={users || []}
      />
    </Container>
  );
};

// ProjectList.whyDidYouRender = true

export default ProjectList;
