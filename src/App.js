import './App.scss';
// ページャーの追加
import { Routes, Route, Link } from 'react-router-dom';

import QuickStart from './pages/Home';
import TicTacToe from './pages/TicTacToe';
import Top from './pages/Top';

function App() {
  return (
    <>
      {/* Link は「ブラウザをリロードしないリンク」 */}
      <nav style={{ padding: 20 }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/quick-start">クイックスタート</Link> |{" "}
        <Link to="/tic-tac-toe">三目並べ</Link>
      </nav>
      {/* Routes と Route で「道と出口」を決める */}
      <main className="main">
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/quick-start" element={<QuickStart />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
        </Routes>
      </main>
    </>
  );
}
export default App;

