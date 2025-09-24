import StateGallery from './StateGallery.js';
import ComponentMemori from './ComponentMemori.js';
export default function LearnReact() {
  return (
    <>
        <section>
        <h1><a href="https://ja.react.dev/learn/adding-interactivity">インタラクティビティの追加</a></h1>
        <h2>state：コンポーネントのメモリ</h2>
        <StateGallery />
      </section>
      <section>
        <h2>コンポーネントのメモリ</h2>
        <ComponentMemori />
      </section>
    </>
  );
}
