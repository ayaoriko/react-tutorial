# 概要

これは公式のチュートリアルを読みながら作ったものです。
項目ごとにページが遷移する機能も実装しています。

# Reactの始め方

参考：[【React入門】ローカル環境でReact開発を始めるには？](https://qiita.com/y_kato_eng/items/68e6c971358ddffbc5ff).

## 1. ターミナルを開き、任意のディレクトリにて以下コマンドを実行しましょう。

コマンド実行したディレクトリに「react-sample-app」というディレクトリが作成されているはずです。

```
npx create-react-app react-sample-app
```

### 以下コマンドでディレクトリ内に移動
```
cd react-sample-app
```

### ローカルのサーバーを起動
停止する場合はctrl+Cで停止ができます。
```

```

# 補足

## SCSSが使えるように導入
```
npm install sass --save-dev
```

## React Router を導入

### 1. npmを実行
npm install react-router-dom

### 2.app.jsに追記

```
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'; // 追記

function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 20 }}>
        {/* ナビゲーション（ページ切り替え用リンク） */}
        <Link to="/">Home</Link> |{" "}
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

function Home() {  return ( ... ); }
function About() {  return ( ... ); }

export default App;
```

### 3. BrowserRouter をアプリ全体の外側に置くことで、

index.js

```
import React from 'react';
import { BrowserRouter } from 'react-router-dom'; // 追記
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
```

app.js
```
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // BrowserRouterを削除

function App() {
  return (
    <>
      {/* どのページでも共通で表示したいメニュー */}
      <nav style={{ padding: 20 }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/learn">Learn</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
      </Routes>
    </>
  );
}

function Home() {  return ( ... ); }
function About() {  return ( ... ); }

export default App;
```

# Gitメモ

初回（ディレクトリ「react-sample-app」内で動作）
```
git init
echo "node_modules/" >> .gitignore
git remote add origin https://github.com/ayaoriko/react-tutorial.git
git branch -M main
git push -u origin main
```

※上記で競合が起きた場合、かつGitHub 上のものは消えてもいい場合は、下記にて強制プッシュをする
```
git push -u origin main --force
```

以降、開発のたびに下記の流れを繰り返せば、履歴付きで安全に進められます。
```
git add .
git commit -m "◯◯を修正"
git push
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
