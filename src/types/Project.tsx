/*
 * @Descripttion: Project类型声明
 * @Author: huangjitao
 * @Date: 2021-07-15 20:40:57
 * @Function: 项目列表相关属性
 */

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}
