/*
 * @Descripttion: 对原有Select的封装
 * @Author: huangjitao
 * @Date: 2021-04-26 21:16:24
 * @Function: 解决了Select的value类型为string，默认值为label的问题
 */

import { Select } from "antd";

type SelectProps = React.ComponentProps<typeof Select>;

interface IdSelectProp
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value?: number | string | string | null | undefined;
  onChange?: (value: number) => void;
  defaultValue?: string;
  options?: {
    name: string;
    id: number;
  }[];
}

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));

const IdSelect = (props: IdSelectProp) => {
  const { value, onChange, defaultValue, options } = props;
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => {
        onChange?.(toNumber(value));
      }}
    >
      {defaultValue ? (
        <Select.Option key={0} value={0}>
          {defaultValue}
        </Select.Option>
      ) : null}
      {options
        ? options.map((item) => {
            return (
              <Select.Option key={item.id} value={item.id}>
                {item.name}
              </Select.Option>
            );
          })
        : null}
    </Select>
  );
};

export default IdSelect;
