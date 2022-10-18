/*
 * @Descripttion: 编辑任务对话框
 * @Author: huangjitao
 * @Date: 2021-07-20 20:36:52
 * @Function: 该文件用途描述
 */

import { Button, Form, Input, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useDeleteTask, useEditTask } from "api/Task";
import { TaskTypeSelect } from "components/TaskTypeSelect";
import { UserSelect } from "components/UserSelect";
import { useEffect } from "react";
import { useTaskModal, useTasksQueryKey } from "../utils";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const EditTask = () => {
  const { editingTaskId, editingTask, close } = useTaskModal();
  const [form] = useForm();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );
  const { mutate: deleteTask } = useDeleteTask(useTasksQueryKey());

  const onCancel = () => {
    form.resetFields();
    close();
  };

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  const onDelete = () => {
    close();
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除任务吗",
      onOk() {
        return deleteTask({ id: Number(editingTaskId) });
      },
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      forceRender={true}
      onCancel={onCancel}
      onOk={onOk}
      okText={"确认"}
      cancelText={"取消"}
      confirmLoading={editLoading}
      title={"编辑任务"}
      visible={!!editingTaskId}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"经办人"} name={"processorId"}>
          <UserSelect defaultValue={"经办人"} />
        </Form.Item>
        <Form.Item label={"类型"} name={"typeId"}>
          <TaskTypeSelect />
        </Form.Item>
      </Form>
      <div style={{ textAlign: "right" }}>
        <Button onClick={onDelete} style={{ fontSize: "14px" }} size={"small"}>
          删除
        </Button>
      </div>
    </Modal>
  );
};
