/*
 * @Descripttion: 搜索结果展示列表
 * @Author: huangjitao
 * @Date: 2021-04-11 21:24:19
 * @Function: use of this file
 */
import { Button, Dropdown, Menu, Modal, Table, TableProps } from "antd";
import dayjs from "dayjs";
import React from "react";
import { User } from "types/User";
import { Link } from "react-router-dom";
import { Pin } from "components";
import { useDeleteProject, useEditProject } from "api/Projects";
import { useProjectModal, useProjectsQueryKey } from "../utils";
import { Project } from "types/Project";

interface ISearchListProps extends TableProps<Project> {
  users: User[];
}

const SearchList = React.memo((props: ISearchListProps) => {
  const { mutate } = useEditProject(useProjectsQueryKey());
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  console.log("list render");

  const More = ({ project }: { project: Project }) => {
    const { startEdit } = useProjectModal();
    const editProject = (id: number) => () => startEdit(id);
    const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
    const confirmDeleteProject = (id: number) => {
      Modal.confirm({
        title: "确定删除这个项目吗?",
        content: "点击确定删除",
        okText: "确定",
        onOk() {
          deleteProject({ id });
        },
      });
    };
    return (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item onClick={editProject(project.id)} key={"edit"}>
              编辑
            </Menu.Item>
            <Menu.Item
              onClick={() => confirmDeleteProject(project.id)}
              key={"delete"}
            >
              删除
            </Menu.Item>
          </Menu>
        }
      >
        <Button type={"link"}>...</Button>
      </Dropdown>
    );
  };

  return (
    <Table
      rowKey="id"
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{value}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {props.users.find((user) => user.id === project.personId)
                  ?.name || "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    />
  );
});

export default SearchList;
