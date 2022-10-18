/*
 * @Descripttion: 登陆页面
 * @Author: huangjitao
 * @Date: 2021-04-12 21:20:50
 * @Function: use of this file
 */

import styled from "@emotion/styled";
import { Button, Input, Form } from "antd";
import { useAuth } from "context/AuthContext";
import { useAsync } from "utils/useAsync";

interface LoginPageProps {
  onError: (error: Error) => void;
}

const LoginPage: React.FC<LoginPageProps> = (props) => {
  const { onError } = props;
  const { login } = useAuth();
  const { run, isLoading } = useAsync();

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(login(values));
    } catch (error) {
      onError(error);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Form.Item>
        <LongButton htmlType={"submit"} type={"primary"} loading={isLoading}>
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default LoginPage;

export const LongButton = styled(Button)`
  width: 100%;
`;
