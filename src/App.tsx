/*
 * @Descripttion: 主页面
 * @Author: huangjitao
 * @Date: 2021-03-19 07:48:44
 * @Function: 页面的主入口，包含错误边界
 */

import React from "react";
import "./App.css";
import { useAuth } from "context/AuthContext";
import { ErrorBoundary, FullError, Loading } from "components";
// import TryUseUndo from "tryUseUndo";

const AuthPage = React.lazy(() => import("pages/authPage"));
const UnAutnPage = React.lazy(() => import("pages/unAuthPage"));

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullError}>
        <React.Suspense fallback={<Loading />}>
          {user ? <AuthPage /> : <UnAutnPage />}
        </React.Suspense>
      </ErrorBoundary>
      {/* <TryUseUndo /> */}
    </div>
  );
}

export default App;
