/*
 * @Descripttion: 修改页面标题hook
 * @Author: huangjitao
 * @Date: 2021-04-24 10:59:44
 * @Function: keepOnUnmount--页面卸载时，title是否保持住，不变回原来的默认值
 */

import { useEffect, useRef } from "react";

export const useDocumentTitle = (
  title: string,
  keepOnUnmount: boolean = true
) => {
  // 页面原有的默认title
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    // 根据组件传入的值，更改页面title
    document.title = title;
  }, [title]);

  useEffect(() => {
    // 组件卸载后，变回默认title，之后没有指定title的组件都将使用默认title
    return () => {
      if (!keepOnUnmount) {
        console.log("卸载时的oldTitle：", oldTitle);
        document.title = oldTitle;
      }
    };
  }, [keepOnUnmount, oldTitle]);
};
