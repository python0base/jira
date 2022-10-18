/*
 * @Descripttion: 业务组件-用户选择框
 * @Author: huangjitao
 * @Date: 2021-04-28 21:15:02
 * @Function: 使用频繁的业务场景，单独封装的组件
 */

import { useUsers } from "api/Users";
import React from "react";
import IdSelect from "./IdSelect";

export const UserSelect = (props: React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers();
  return <IdSelect options={users || []} {...props} />;
};
