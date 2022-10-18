/*
 * @Descripttion: 自定义异步请求hook
 * @Author: huangjitao
 * @Date: 2021-04-22 22:16:18
 * @Function: 用于统一处理请求后台接口
 */
import { useCallback, useReducer, useRef, useState } from "react";
import { useMountedRef } from "utils";

interface State<T> {
  data: T | null;
  error: Error | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultState: State<null> = {
  data: null,
  error: null,
  stat: "idle",
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0),
    [dispatch, mountedRef]
  );
};

export const useAsync = <T>(
  initialState?: State<T>,
  isThrowError?: boolean
) => {
  const [state, dispatch] = useReducer(
    (state: State<T>, action: Partial<State<T>>) => ({ ...state, ...action }),
    { ...defaultState, ...initialState }
  );
  const safeDispatch = useSafeDispatch(dispatch);
  const [retry, setRetry] = useState(() => () => {});
  const runRef = useRef<any>();

  // 请求成功
  const setData = useCallback(
    (data: T) => {
      safeDispatch({
        data,
        error: null,
        stat: "success",
      });
    },
    [safeDispatch]
  );

  // 请求失败
  const setError = useCallback(
    (error: Error) => {
      safeDispatch({
        data: null,
        error,
        stat: "error",
      });
    },
    [safeDispatch]
  );

  // 触发异步操作的函数
  const run = useCallback(
    (promise: Promise<T>, retryConfig?: () => Promise<T>) => {
      if (!promise || !promise.then) {
        throw new Error("请传入promise函数");
      }

      // 当第一次请求时将该请求函数保存起来，以供后面刷新数据使用
      if (retryConfig) {
        runRef.current = () => run(retryConfig(), retryConfig);
        setRetry(() => () => run(retryConfig(), retryConfig));
      }

      safeDispatch({ stat: "loading" });
      return promise
        .then((res) => {
          setData(res);
          return res;
        })
        .catch((error: Error) => {
          setError(error);
          // 这里如果不手动抛出异常，则会在这里消化异常，外面就接收不到异常
          if (isThrowError || isThrowError === undefined) {
            return Promise.reject(error);
          }
          return error;
        });
    },
    [isThrowError, safeDispatch, setData, setError]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    retry,
    ...state,
    runRef,
  };
};
