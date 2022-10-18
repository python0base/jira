/*
 * @Descripttion: User接口声明
 * @Author: huangjitao
 * @Date: 2021-07-15 20:48:32
 * @Function: 用户的相关属性
 */

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}
