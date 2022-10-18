/*
 * @Descripttion: 注册页面
 * @Author: huangjitao
 * @Date: 2021-04-17 19:00:52
 * @Function: use of this file
 */
import { Form, Input } from "antd";
import { useAuth } from "context/AuthContext";
import { useAsync } from "utils/useAsync";
import { LongButton } from "./LoginPage";

interface RegisterPageProps {
  onError: (error: Error) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = (props) => {
  const { onError } = props;
  const { register } = useAuth();
  const { run, isLoading } = useAsync();

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await run(register(values));
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
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};

export default RegisterPage;
