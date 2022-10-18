/*
 * @Descripttion: craco配置
 * @Author: huangjitao
 * @Date: 2021-04-18 18:36:13
 * @Function: 用于覆盖create-react-app的一些默认配置
 */

const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "rgb(0, 82, 204)",
              "@font-size-base": "16px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};