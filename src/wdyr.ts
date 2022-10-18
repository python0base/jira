/*
 * @Descripttion: 一个查找循环渲染的工具
 * @Author: huangjitao
 * @Date: 2021-04-24 21:18:54
 * @Function: use of this file
 */

import React from "react";

if (process.env.NODE_ENV === "development") {
  const whyDidYouRender = require("@welldone-software/why-did-you-render");
  whyDidYouRender(React, {
    trackAllPureComponents: false,
  });
}
