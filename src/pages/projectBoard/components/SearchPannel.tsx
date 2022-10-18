/*
 * @Descripttion: 任务搜索栏
 * @Author: huangjitao
 * @Date: 2021-07-18 16:24:25
 * @Function: 该文件用途描述
 */

import { Button, Input } from "antd";
import { Row } from "components";
import { TaskTypeSelect } from "components/TaskTypeSelect";
import { UserSelect } from "components/UserSelect";
import { useSetUrlSearchParam } from "utils/useUrlQueryParam";
import { useTasksSearchParams } from "../utils";

export const SearchPannel = () => {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const reset = () => {
    setSearchParams({
      name: undefined,
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
    });
  };

  return (
    <Row marginBottom={4} marginTop={2} gap={2} justifyContent="flex-start">
      <Input
        style={{ width: "20rem" }}
        placeholder={"任务名"}
        value={searchParams.name}
        onChange={(evt) => setSearchParams({ name: evt.target.value })}
      />
      <UserSelect
        defaultValue={"经办人"}
        value={searchParams.processorId}
        onChange={(value) => setSearchParams({ processorId: value })}
      />
      <TaskTypeSelect
        defaultValue={"类型"}
        value={searchParams.typeId}
        onChange={(value) => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  );
};
