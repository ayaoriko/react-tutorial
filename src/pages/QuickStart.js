import logo from './../logo.svg';
// 画面の更新
import { useState } from 'react';

function QuickStart() {
  // ログイン中かどうかを確認
  let isLoggedIn = checkLogin ()
  
  // リストをチェック
  const listItems = products.map(product =>
    <li
      key={product.id}
      style={{
        color: product.title === 'Apple' ? 'magenta' : 'darkgreen'
      }}
    >
      {product.title}
    </li>
  );
  
  // MyButton2の初期設定
  // myapp内で共通の値にする
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-text">
          Edit <code>src/App.js</code> and save to reload.<br />{settingText.goodMorning}
        </p>
        <a
          className="App-link"
          href="https://react.dev/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Quick Start
        </a>
        下2つは別々にカウント
      <MyButton />
      <MyButton />
      下2つは一緒にカウント
      <MyButton2 count={count} onClick={handleClick} />
      <MyButton2 count={count} onClick={handleClick} />
        <main className="main">
        {isLoggedIn ? ( <AdminPanel /> ) : ( <LoginForm /> )}
      </main>
      <ul>{listItems}</ul>
      </div>
    </div> /* .App */ 
  );
}

// 一番最初に表示される関数を定義
export default QuickStart;

// <MyButton />を定義
// ボタンごとにそれぞれ別にカウントをする
function MyButton() {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}
// <MyButton2 />を定義
// MyAppのコンポーネント側の変数を使うことで、どのボタンを押しても連動する仕様に変更
function MyButton2({ count, onClick }) {
  return (
    <button onClick={onClick}>
      Clicked {count} times
    </button>
  );
}

// <LoginForm />を定義
function AdminPanel () {
  return (
    <p>Admin Page</p>
  );
}

// <LoginForm />を定義
function LoginForm  () {
  return (
    <p>Login Form</p>
  );
}

// ログイン中かどうかをチェック
function checkLogin () {
  return (
    false
  );
}

// 表示するsettingText中身を定義
const settingText = {
  goodMorning: 'Good morning！',
  imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
  imageSize: 90,
};

// jsonを取得
const products = [
  { title: 'Cabbage', id: 1 },
  { title: 'Garlic', id: 2 },
  { title: 'Apple', id: 3 },
];

