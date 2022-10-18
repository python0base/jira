/*
 * @Descripttion: 页面加载组件
 * @Author: huangjitao
 * @Date: 2021-04-23 21:00:42
 * @Function: use of this file
 */

import styled from "@emotion/styled";
import { Spin } from "antd";

export const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading = () => (
  <FullPage>
    <Spin size="large" />
  </FullPage>
);

export default Loading;
