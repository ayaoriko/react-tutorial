import './App.scss';
// ページャーの追加
import { Routes, Route, Link } from 'react-router-dom';

import Top from './pages/Top';
import QuickStart from './pages/QuickStart';
import TicTacToe from './pages/TicTacToe';
import SearchList from './pages/SearchList';
import LearnUI from './pages/LearnUI/Index';
import LearnInteractivity from './pages/LearnInteractivity/Index';
function App() {
  return (
    <>
      {/* Link は「ブラウザをリロードしないリンク」 */}
      <nav style={{ padding: 20 }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/quick-start">クイックスタート</Link> |{" "}
        <Link to="/tic-tac-toe">三目並べ</Link> |{" "}
        <Link to="/search-list">検索リスト</Link>|{" "}
        <Link to="/learn-ui">UI を学ぶ</Link>|{" "}
        <Link to="/learn-interactivity">インタラクティビティの追加</Link>
      </nav>
      {/* Routes と Route で「道と出口」を決める */}
      <main className="main">
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/quick-start" element={<QuickStart />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/search-list" element={<SearchList />} />
          <Route path="/learn-ui" element={<LearnUI />} />
          <Route path="/learn-interactivity" element={<LearnInteractivity />} />
        </Routes>
      </main>
    </>
  );
}
export default App;

