/*
 * @Descripttion: 自定义useUndo练习页面
 * @Author: huangjitao
 * @Date: 2021-05-30 15:41:58
 * @Function: 该文件用途描述
 */

import { useUndo } from "utils";

const TryUseUndo = () => {
  const [state, operation] = useUndo<number>(0);
  const present = state.present as number;
  const { undo, redo, canUndo, canRedo, set, reset } = operation;
  return (
    <div style={{ textAlign: "center" }}>
      <h1>useUndo测试页面</h1>
      <div>当前值：{present}</div>
      <div style={{ marginTop: 30 }}>
        <button onClick={undo} disabled={!canUndo} style={{ marginRight: 15 }}>
          撤销
        </button>
        <button onClick={redo} disabled={!canRedo} style={{ marginRight: 15 }}>
          恢复撤销
        </button>
        <button
          onClick={() => {
            set(present + 1);
          }}
          style={{ marginRight: 15 }}
        >
          增加
        </button>
        <button
          onClick={() => {
            set(present - 1);
          }}
          style={{ marginRight: 15 }}
        >
          减少
        </button>
        <button onClick={reset}>重置</button>
      </div>
    </div>
  );
};

export default TryUseUndo;
