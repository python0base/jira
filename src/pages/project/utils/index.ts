/*
 * @Descripttion: 项目详情 —— 工具函数
 * @Author: huangjitao
 * @Date: 2021-07-18 18:03:16
 * @Function: 该文件用途描述
 */

import { useLocation } from "react-router";

export const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};
