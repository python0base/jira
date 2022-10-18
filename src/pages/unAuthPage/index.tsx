/*
 * @Descripttion: 未认证页面入口
 * @Author: huangjitao
 * @Date: 2021-04-17 19:00:52
 * @Function: use of this file
 */
import { Button, Card, Divider, Typography } from "antd";
import { useState } from "react";
import styled from "@emotion/styled";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import logo from "assets/logo.svg";
import left from "assets/left.svg";
import right from "assets/right.svg";
// import { useDocumentTitle } from "utils/useDocumentTitle";
import { ErrorBox } from "components/FullError";

const UnAutnPage = () => {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  // const title = isRegister ? '注册页面' : '登录页面'
  // useDocumentTitle(title, false)

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>{isRegister ? "注 册" : "登 录"}</Title>
        {error ? <ErrorBox error={error} /> : null}
        {isRegister ? (
          <RegisterPage onError={setError} />
        ) : (
          <LoginPage onError={setError} />
        )}
        <Divider />
        <Button
          type="link"
          onClick={() => {
            setIsRegister(!isRegister);
          }}
        >
          {isRegister ? "已有账号？直接登录" : "没有账号？注册账号"}
        </Button>
      </ShadowCard>
    </Container>
  );
};

export default UnAutnPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Header = styled.div`
  background: url(${logo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;
