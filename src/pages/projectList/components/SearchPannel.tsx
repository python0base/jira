/*
 * @Descripttion: your project
 * @Author: huangjitao
 * @Date: 2021-04-17 19:00:52
 * @Function: use of this file
 */
/* @jsxImportSource @emotion/react */
// import { jsx } from "@emotion/react";
import { Input, Select } from "antd";
import { Form } from "antd";
import { UserSelect } from "components/UserSelect";
import React from "react";
import { Project } from "types/Project";
import { User } from "types/User";

interface ISearchPannelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: ISearchPannelProps["param"]) => void;
}

const SearchPannel: React.FC<ISearchPannelProps> = (props) => {
  const { users, param, setParam } = props;
  return (
    <Form css={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder="项目名"
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          value={param.personId}
          defaultValue="负责人"
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={String(user.id)}>
              {user.name}
            </Select.Option>
          ))}
        </UserSelect>
      </Form.Item>
    </Form>
  );
};

export default SearchPannel;
