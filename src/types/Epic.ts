/*
 * @Descripttion: 任务组类型声明
 * @Author: huangjitao
 * @Date: 2021-07-25 19:17:21
 * @Function: 该文件用途描述
 */

export interface Epic {
  id: number;
  name: string;
  projectId: number;
  // 开始时间
  start: number;
  // 结束时间
  end: number;
}
