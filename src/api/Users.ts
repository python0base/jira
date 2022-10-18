/*
 * @Descripttion: 用户信息请求函数hook
 * @Author: huangjitao
 * @Date: 2021-04-22 22:16:18
 * @Function: use of this file
 */
import { User } from "types/User";
import { useHttp } from "utils/http";
import { useQuery } from "react-query";

export const useUsers = (params?: Partial<User>) => {
  const httpFetch = useHttp();

  return useQuery<User[]>(["users", params], () =>
    httpFetch("users", { data: params })
  );
};
