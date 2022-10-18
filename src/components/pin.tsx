/*
 * @Descripttion: 收藏功能组件
 * @Author: huangjitao
 * @Date: 2021-04-29 21:37:13
 * @Function: use of this file
 */


import React from "react";
import { Rate } from "antd";

interface PinProps extends React.ComponentProps<typeof Rate> {
  checked: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Pin = ({ checked, onCheckedChange, ...restProps }: PinProps) => {
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckedChange?.(!!num)}
      {...restProps}
    />
  );
};

export default Pin
