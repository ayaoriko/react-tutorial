# 概要

これは公式のチュートリアルを読みながら作ったものです。
項目ごとにページが遷移する機能も実装しています。

# Reactの基本的な構造

## Reactのはじめかた

参考：[【React入門】ローカル環境でReact開発を始めるには？](https://qiita.com/y_kato_eng/items/68e6c971358ddffbc5ff).

### 1. コマンド実行
```
npx create-react-app react-sample-app
```
→ ディレクトリに「react-sample-app」というディレクトリが作成される

### 2. 以下コマンドでディレクトリ内に移動
```
cd react-sample-app
```

### 3. ローカルのサーバーを起動
```
npm start
```
ブラウザが開いて、ローカルで実装中のサイトを閲覧できる。
ctrl+Cで停止が可能。

## Reactの重要なファイル・フォルダの説明

### buildフォルダ
Reactアプリを公開するための ビルド成果物 が入る。
下記コマンドで生成されます：
```
npm run build
```
**build/ の中身をそのまま WEB サーバーにアップすると、アプリが公開可能。**
開発中はこのフォルダを直接触る必要はなく、Gitではこのファイルは基本的にコミットしません。

### publicフォルダ
静的ファイル置き場 です。ビルド時にそのままコピーされるので、srcフォルダ内のJS や CSS とは別。
- index.html 内に書いた <head> や <body> の内容は 全ページ共通。
    - React のコンポーネントは <div id="root"></div> に挿入
- favicon や GA コード、meta タグなどはここに書く。
    - もしmeta情報などを変更したい場合は「React Helmet」の機能を使う。
- React 内から参照する静的ファイルは、process.env.PUBLIC_URL または絶対パスでアクセス可能

### assetsフォルダ

制作に使う素材を置く場所（画像・SVG・フォントなど）。
- 直下にassetsフォルダを設置する
    - 更新しても再ビルド不要。
    - 基本的に絶対パス /assets/xxx で参照（相対パスは非推奨）。
    - デメリット：**公開時には build フォルダとは別に、同じ階層にフォルダ を置く必要がある**ので管理が手間。
- srcフォルダ内にassetsフォルダを設置する場合
    - import して React コンポーネントや JS から直接参照できる
    - 公開時に別途設置する必要がない。
    - デメリット：素材の更新の度にビルドが必要

### srcフォルダ
主にビルド時にバンドルされる(1つのフォルダにまとまる)ファイル。基本的にここを触る。
App.jsを書き換えた場合：
- 消してOK：App.test.js、logo.svg
- 残すべき：reportWebVitals.js(パフォーマンス測定やログ送信を行う時に必要)、setupTests.js(テスト関連に必要)

### package.json
アプリ開発の際に自分がインストールして使ったライブラリと同じライブラリを，他の開発者の人にも使ってもらうための情報が詰まったファイル。

### package-lock.json
package.jsonをビルドすることで生成される。
**基本的に自分で編集しない（npm が自動更新する）が、Gitに入れる必要がある。**

### node_modulesフォルダ
アプリ開発の際に使うライブラリの情報が詰まったファイル。
package.json、package-lock.jsonの情報をもとに生成されるので、Gitにコミットする必要はない。

# オプションなどの導入方法

## SCSSの導入方法
下記コマンドを実行
```
npm install sass --save-dev
```

## Tailwind CSSの導入方法
### 1. 下記コマンドを実行。
```
npm install -D tailwindcss postcss autoprefixer
```
→postcss.config.jsとtailwind.config.jsが生成される。

### 2. tailwind.config.jsを下記内容に変更して、srcフォルダ内でtailwindを有効にする。
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ここに対象ファイルを指定
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

### 3. index.css (もしくは index.scss)に追記
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 補足tailwind: command not found　と出る場合
参考：[Create React App で Tailwind CSS が “command not found” や PostCSS plugin エラーになる問題の解決方法](https://qiita.com/0yasumi_m0de/items/e791b864c3d645424025).
```
npm install -D tailwindcss@3.4.3 postcss@8.4.31 autoprefixer@10.4.14
```

## React Router の導入方法

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

# Gitについて

## Gitのコマンド
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

## 最新コミットの名前を変える方法
--amend で直前のコミットを書き換えます。
--force でリモートに上書きプッシュします。
```
git commit --amend --author="新しい名前 <メールアドレス@example.com>" -m "既存のコミットメッセージ"
git push --force
```

## .gitignoreに記載する内容
```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
```