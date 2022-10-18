/*
 * @Descripttion: 简单的自定义hook和工具类函数
 * @Author: huangjitao
 * @Date: 2021-04-11 21:24:19
 * @Function: use of this file
 */
import { useCallback, useEffect, useReducer, useRef, useState } from "react";

const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const cleanObject = (object: { [key: string]: unknown }) => {
  const temp = { ...object };
  Object.keys(temp).forEach((key) => {
    const value = temp[key];
    if (isFalsy(value)) {
      delete temp[key];
    }
  });
  return temp;
};

/**
 * 仅组件挂载时的副作用
 * @param callback 回调函数
 */
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

/**
 * 节流函数
 * @param value 输入数值
 * @param delay 时延
 * @returns debounceValue：节流处理后的输入值
 */
export const useDebounce = <T>(value: T, delay: number) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounceValue;
};

/**
 * 返回组件的挂载状态
 * @returns mountedRef：如果还没挂载或者已经卸载，返回false；反之，返回true
 */
export const useMountedRef = () => {
  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);
  return mountedRef;
};

export const resetRoute = () => (window.location.href = window.location.origin);

/**
 * @function 自定义useArray练习，用于操作数组。
 * @param val 初始化数组
 * @returns clear：清空数组；removeIndex：移除数组特定位置的元素；add：添加元素
 */
export const useArray = <T>(val: T[]) => {
  const [value, setValue] = useState(val);
  const clear = () => {
    setValue([]);
  };
  const removeIndex = (index: number) => {
    const temp = [...value];
    temp.splice(index, 1);
    setValue(temp);
  };
  const add = (thing: T) => {
    const temp = [...value];
    temp.push(thing);
    setValue(temp);
  };
  return {
    value,
    clear,
    removeIndex,
    add,
  };
};

/**
 * @function 自定义useUndo练习
 * @param {T}initialPresent 初始值
 * @returns
 */

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

type State<T> = {
  past: T[]; // 存放历史值
  present: T; // 当前值
  future: T[]; // 存放undo值，用于取消撤销
};

type Action<T> = {
  newPresent?: T;
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
};

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { newPresent } = action;
  switch (action.type) {
    case UNDO:
      if (past.length === 0) return state;
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    case REDO:
      if (future.length === 0) return state;
      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    case SET:
      if (newPresent === present) return state;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    case RESET:
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    default:
      return state;
  }
};
export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>);

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  /**
   * 撤销
   */
  const undo = useCallback(() => {
    dispatch({ type: UNDO });
  }, []);

  /**
   * 取消撤销
   */
  const redo = useCallback(() => {
    dispatch({ type: REDO });
  }, []);

  /**
   * 指定为特定值
   */
  const set = useCallback((newPresent: T) => {
    dispatch({ type: SET, newPresent: newPresent });
  }, []);

  /**
   * 重置为初始值
   */
  const reset = useCallback(() => {
    dispatch({ type: RESET, newPresent: initialPresent });
  }, [initialPresent]);

  return [state, { undo, redo, set, reset, canUndo, canRedo }] as const;
};
