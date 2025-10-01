import { useContext } from 'react';
import { createContext } from 'react';
const LevelContext = createContext(1);

export default function PassingDataDeeplyWithContext() {
  return (
    // チュートリアルではLevelContextに省略されているけど、本来はLevelContext.Providerじゃないといけない。
    <LevelContext.Provider value={1}>
      <Section>
        <Heading>タイトル</Heading>
        <Section>
          <Heading>小見出し</Heading>
          <Section>
            <Heading>さらに小見出し</Heading>
          </Section>
            <Section>
            <Heading>さらに小見出し</Heading>
          </Section>
        </Section>
      </Section>
    <Section>
        <Heading>タイトル2</Heading>
        <Section>
            <Heading>小見出し</Heading>
            <Section>
                <Heading>さらに小見出し</Heading>
            </Section>
        </Section>
    </Section>
    </LevelContext.Provider>
  );
}

function Section({ children }) {
  // useContext(LevelContext) → 親からもらった「現在の階層の数値」を読む
  const level = useContext(LevelContext);
  return (
    <section className="section">
        {/*<LevelContext.Provider value={level + 1}> → 子どもには「階層を1つ深めた値」を渡す */}
      <LevelContext.Provider value={level + 1}>
        {children}
      </LevelContext.Provider>
    </section>
  );
}

function Heading({ children }) {
 // useContext(LevelContext) → 親からもらった「現在の階層の数値」を読む
  const level = useContext(LevelContext);
  switch (level) {
    case 1: return <h1>{children}</h1>;
    case 2: return <h2>{children}</h2>;
    case 3: return <h3>{children}</h3>;
    default: return <p>{children}</p>;
  }
}