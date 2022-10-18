/*
 * @Descripttion: 任务组通用函数hook
 * @Author: huangjitao
 * @Date: 2021-07-25 19:20:25
 * @Function: 该文件用途描述
 */

import { useProjectIdInUrl } from "pages/projectBoard/utils";

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useEpicsQueryKey = () => ["epics", useEpicSearchParams()];
