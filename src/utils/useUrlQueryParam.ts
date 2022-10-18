/*
 * @Descripttion: 浏览器url查询hook
 * @Author: huangjitao
 * @Date: 2021-04-26 07:33:50
 * @Function: use of this file
 */
import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (params: Partial<{ [key in string]: unknown }>) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParams(o);
  };
};

const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const setUrlSearchParam = useSetUrlSearchParam();
  return [
    useMemo(() => {
      return keys.reduce((pre, key) => {
        return { ...pre, [key]: searchParams.get(key) || "" };
      }, {} as { [key in K]: string });
    }, [searchParams]),
    (params: Partial<{ [key in K]: unknown }>) => {
      // iterator
      // iterator: https://codesandbox.io/s/upbeat-wood-bum3j?file=/src/index.js
      setUrlSearchParam(params);
    },
  ] as const;
};

export default useUrlQueryParam;
