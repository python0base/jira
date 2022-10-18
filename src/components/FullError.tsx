/*
 * @Descripttion: 全局错误信息组件
 * @Author: huangjitao
 * @Date: 2021-04-23 21:06:26
 * @Function: use of this file
 */

import { Typography } from "antd";
import { FullPage } from "components/Loading";
import { DevTools } from "jira-dev-tool";

const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({ error }: { error: unknown }) => {
  if (isError(error)) {
    return <Typography.Text type="danger">{error.message}</Typography.Text>;
  } else {
    return null;
  }
};

const FullError = ({ error }: { error: Error | null }) => (
  <FullPage>
    <DevTools />
    <Typography.Text>{error?.message}</Typography.Text>
  </FullPage>
);

export default FullError;
