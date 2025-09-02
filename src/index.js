import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client'; // ページ遷移機能
import './index.scss';
import { BrowserRouter } from 'react-router-dom'; // ページ遷移機能
import App from './App'; // Appが記載されているファイルを指定
import reportWebVitals from './reportWebVitals'; //パフォーマンス測定（Web Vitalsの計測）用の仕組みです。

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();