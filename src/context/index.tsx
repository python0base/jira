/*
 * @Descripttion: contextProvider入口
 * @Author: huangjitao
 * @Date: 2021-04-17 19:00:51
 * @Function: 用于提供全局状态管理
 */
import React, { ReactNode } from "react";
import { AuthProvider } from "context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

export const AppProviders = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>{children}</AuthProvider>
    </QueryClientProvider>
  );
};
