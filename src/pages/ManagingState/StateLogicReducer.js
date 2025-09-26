import { useState } from 'react';

// 本来は
// import { useReducer } from 'react';
// と定義す流だけでOKだけど、関数で定義してもそこまでの分量にならない
function useReducer(reducer, initialState) {
  const [state, setState] = useState(initialState);

  function dispatch(action) {
    // 下記でもOKだけど、React の setState は「非同期でまとめて更新」されるから、もし dispatch を連続で呼んだりすると「古い state」を見ちゃう可能性がある。
    //const nextState = reducer(state, action);
    //setState(nextState);
    // 下記は模範回答(React公式)の書き方。setState に「関数」を渡して、必ず「直前の最新 state (s)」を reducer に渡しているので、どんなに dispatch を連続で呼んでも安全。
    setState((s) => reducer(s, action));
  }

  return [state, dispatch];
}


// 普通の useState を使う場合
//const [count, setCount] = useState(0);
//function handleIncrement() {
//  setCount(count + 1);
//}
//function handleDecrement() {
//  setCount(count - 1);
//}

// レデューサーは“状態の変化パターンを一箇所にまとめる関数”
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      throw new Error('Unknown action: ' + action.type);
  }
}


export default function StateLogicReducer() {
  const [count, dispatch] = useReducer(counterReducer, 0);
  return (
    <>
    { count }
     {/*リデューサ内に alert を置かないことが重要です。 */}
    <button onClick={() => {
      alert('数を増やしました。')
      dispatch({ type: 'increment' })
      }}>+</button>
      <button onClick={() => {
      alert('数を減らしました。')
      dispatch({ type: 'decrement' })
      }}>+</button>
    </>
  );
}

