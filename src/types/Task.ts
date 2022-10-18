/*
 * @Descripttion: Task类型声明
 * @Author: huangjitao
 * @Date: 2021-07-17 10:51:55
 * @Function: 任务的相关属性
 */

export interface Task {
  id: number;
  name: string;
  // 经办人
  processorId: number;
  projectId: number;
  // 任务组
  epicId: number;
  kanbanId: number;
  // bug or task
  typeId: number;
  note: string;
}
