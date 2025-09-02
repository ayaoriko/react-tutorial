import './App.scss';
// ページャーの追加
import { Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Learn from './pages/Learn';

function App() {
  return (
    <>
      {/* Link は「ブラウザをリロードしないリンク」 */}
      <nav style={{ padding: 20 }}>
        <Link to="/">Home</Link> |{" "}
        <Link to="/learn">Learn</Link>
      </nav>
      {/* Routes と Route で「道と出口」を決める */}
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<Learn />} />
        </Routes>
      </main>
    </>
  );
}
export default App;

