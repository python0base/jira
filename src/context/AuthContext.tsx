/*
 * @Descripttion: your project
 * @Author: huangjitao
 * @Date: 2021-04-22 22:16:18
 * @Function: use of this file
 */
import { User } from "types/User";
import React, { ReactNode, useState } from "react";
import * as auth from "api/AuthProvider";
import { useMount } from "utils";
import { http } from "utils/http";
import { useAsync } from "utils/useAsync";
import { FullError, Loading } from "components";
import { useQueryClient } from "react-query";

const bootStrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

const AuthContext = React.createContext<
  | {
      user: User | null;
      login: (form: auth.IAuthParam) => Promise<void>;
      register: (form: auth.IAuthParam) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    run,
    isLoading,
    isError,
    error,
    isIdle,
    data: user,
    setData: setUser,
  } = useAsync<User | null>();
  const queryClient = useQueryClient();
  const login = (form: auth.IAuthParam) => auth.login(form).then(setUser);
  const register = (form: auth.IAuthParam) => auth.register(form).then(setUser);
  const logout = () =>
    auth.logout().then(() => {
      setUser(null);
      queryClient.clear();
    });

  useMount(() => {
    // bootStrapUser().then(setUser);
    run(bootStrapUser());
  });

  if (isIdle || isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <FullError error={error} />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
