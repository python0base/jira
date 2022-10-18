/*
 * @Descripttion: 错误便捷组件
 * @Author: huangjitao
 * @Date: 2021-04-24 08:29:38
 * @Function: 错误边界必须使用class组件，具体可参照 https://react.docschina.org/docs/error-boundaries.html
 */

import React from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (this.state.error) {
      return fallbackRender({ error });
    } else {
      return children;
    }
  }
}

export default ErrorBoundary;
