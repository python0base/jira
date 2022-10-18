/*
 * @Descripttion: 关键字高亮
 * @Author: huangjitao
 * @Date: 2021-07-20 21:45:41
 * @Function: 该文件用途描述
 */

import React from "react";

export const Mark = ({
  name,
  keyword,
}: {
  name: string;
  keyword: string | undefined;
}) => {
  if (!keyword) {
    return <>{name}</>;
  }
  const arr = name.split(keyword);
  return (
    <>
      {arr.map((str, index) => (
        <span key={index}>
          {str}
          {index === arr.length - 1 ? null : (
            <span style={{ color: "#ec581d" }}>{keyword}</span>
          )}
        </span>
      ))}
    </>
  );
};
