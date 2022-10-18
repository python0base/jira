/*
 * @Descripttion: 收藏项目列表
 * @Author: huangjitao
 * @Date: 2021-05-29 21:01:19
 * @Function: 头部项目按钮悬浮下的项目收藏列表
 */

import React from "react";
import { Button, Divider, List, Popover, Typography } from "antd";
import { useProjects } from "api/Projects";
import styled from "@emotion/styled";
import { useProjectModal } from "pages/projectList/utils";

export const ProjectPopover = () => {
  const { data: projects, refetch } = useProjects();
  const { openModal } = useProjectModal();
  const pinnedProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <Button style={{ padding: 0 }} onClick={openModal} type={"link"}>
        创建项目
      </Button>
    </ContentContainer>
  );

  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement={"bottom"}
      content={content}
    >
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
