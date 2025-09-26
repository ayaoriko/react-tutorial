// デフォルトエクスポートは中括弧なし
import InputWithState from './InputWithState.js';
import PassingDataDeeplyWithContext from './PassingDataDeeplyWithContext';
import StateLogicReducer from './StateLogicReducer';


export default function ManagingState() {
  return (
    <>
<section>
      <h1>state を使って入力に反応する</h1>
      <InputWithState />
    </section>
    <section>
       <h1>state ロジックをリデューサに抽出する</h1>
    <StateLogicReducer />
    </section>
    <section>
      <h1>コンテクストで深くデータを受け渡す</h1>
      <PassingDataDeeplyWithContext />
    </section>
    </>
  );
}

