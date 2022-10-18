/*
 * @Descripttion: 创建项目模态框
 * @Author: huangjitao
 * @Date: 2021-05-29 20:57:13
 * @Function: 用于创建项目，基于antd-Drawer组件
 */

import React, { useEffect } from "react";
import { Button, Drawer, Form, Input, Spin } from "antd";
import { useAddProject, useEditProject } from "api/Projects";
import styled from "@emotion/styled";
import { useForm } from "antd/lib/form/Form";
import { ErrorBox } from "components/FullError";
import { UserSelect } from "components/UserSelect";
import { useProjectModal, useProjectsQueryKey } from "../utils";

const ProjectModal = () => {
  const {
    projectModalOpen,
    closeModal,
    editingProject,
    isLoading,
  } = useProjectModal();

  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(
    useProjectsQueryKey()
  );
  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      closeModal();
    });
  };

  const title = editingProject ? "编辑项目" : "创建项目";

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  const close = () => {
    closeModal();
    form.resetFields();
  };

  return (
    <Drawer
      forceRender={true}
      onClose={close}
      visible={projectModalOpen}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"名称"}
                name={"name"}
                rules={[{ required: true, message: "请输入项目名" }]}
              >
                <Input placeholder={"请输入项目名称"} />
              </Form.Item>

              <Form.Item
                label={"部门"}
                name={"organization"}
                rules={[{ required: true, message: "请输入部门名" }]}
              >
                <Input placeholder={"请输入部门名"} />
              </Form.Item>

              <Form.Item label={"负责人"} name={"personId"}>
                <UserSelect defaultValue={"负责人"} />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default ProjectModal;
