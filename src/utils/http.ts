/*
 * @Descripttion: your project
 * @Author: huangjitao
 * @Date: 2021-04-22 22:16:18
 * @Function: use of this file
 */
import qs from "qs";
import * as auth from "api/AuthProvider";
import { useAuth } from "context/AuthContext";
import { baseUrl } from "consts";
import { useCallback } from "react";

interface IConfig extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (
  url: string,
  { data, token, headers, ...customConfig }: IConfig = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    url = `${url}?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return window.fetch(`${baseUrl}/${url}`, config).then(async (res) => {
    if (res.status === 401) {
      await auth.logout();
      window.location.reload();
      return Promise.reject({ message: "请重新登录" });
    }
    const dataRes = await res.json();
    if (res.ok) {
      return dataRes;
    } else {
      return Promise.reject(dataRes);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();
  return useCallback(
    (...[url, config]: Parameters<typeof http>) =>
    http(url, { ...config, token: user?.token }),
    [user?.token],
  )
};
