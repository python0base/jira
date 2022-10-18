/*
 * @Descripttion: 自定义Row组件
 * @Author: huangjitao
 * @Date: 2021-04-18 22:05:45
 * @Function: use of this file
 */

import styled from "@emotion/styled";

const Row = styled.div<{
  gap?: number | boolean;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  marginBottom?: number;
  marginTop?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : "space-between"};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom + "rem" : 0};
  margin-top: ${(props) => (props.marginTop ? props.marginTop + "rem" : 0)};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

export default Row;
