import { useState, useRef } from 'react';
import sculptureList from './sculptureList.json';
export default function ComponentMemori() {
    const [index, setIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const hasPrev = index > 0;

  function handlePrevClick() {
    if (hasPrev) {
      setIndex(index - 1);
    }
  }
  function handleNextClick() {
    if ( index < sculptureList.length - 1) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }
    let sculpture = sculptureList[index];
    
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  function handleFirstNameChange(e) {
    setFirstName(e.target.value);
  }

  function handleLastNameChange(e) {
    setLastName(e.target.value);
  }
  
  function handleReset() {
    setFirstName('');
    setLastName('');
  }
  
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  const containerRef = useRef(null);
  
  let nextId = useRef(0); 
  const [name, setName] = useState('');
  const [artists, setArtists] = useState([]);
    
  let initialCounters = [
  0, 0, 0
];
  const [counters, setCounters] = useState(
    initialCounters
  );
 
  // map 関数を使うことで、配列の一部またはすべての要素を 変更できる
    function handleIncrementClick(index) {
    const nextCounters = counters.map((c, i) => {
      if (i === index) {
        // Increment the clicked counter
        return c + 1;
      } else {
        // The rest haven't changed
        return c;
      }
    });
    setCounters(nextCounters);
  }
  
  /// JavaScript の reverse() や sort() メソッドは元の配列を書き換えるため、直接使うことはできません。
  // ただし、最初に配列をコピーしてから、そのコピーに変更を加えることはできます。
  
    function reverseClick() {
    const nextArtist = [...artists];
    nextArtist.reverse();
    setArtists(nextArtist);
  }
  
  return (
    <>
            <button
        onClick={handlePrevClick}
        disabled={!hasPrev}
      >
        Previous
      </button>
      <button onClick={handleNextClick}>
        Next
      </button>
    <button onClick={() => {setIndex(0); }}>最初に戻る</button>
      <h2>
        <i>{sculpture.name} </i> 
        by {sculpture.artist}
      </h2>
      <h3>  
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img 
        src={sculpture.url} 
        alt={sculpture.alt}
      />
      <div style={{ marginTop: 20 }}>
    <form onSubmit={e => e.preventDefault()}>
      <input
        placeholder="First name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <input
        placeholder="Last name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <h1>Hi, {firstName} {lastName}</h1>
      <button onClick={handleReset}>Reset</button>
    </form>
    <div
      ref={containerRef}
      onPointerMove={e => {
        // containerRef.current → React の ref で参照している DOM 要素そのもの。
        // .getBoundingClientRect() → その要素の 境界情報 をオブジェクトで返す。
        // clientX / clientY は 画面全体に対しての位置
        const rect = containerRef.current.getBoundingClientRect();
        setPosition({
          // e.clientX / e.clientY は 画面全体（ビューポート左上基準）
          x: e.clientX - rect.left, // 枠の左端を 0 にした相対座標
          y: e.clientY - rect.top // 枠の上端を 0 にした相対座標
        });
      }}
      style={{
        position: 'relative',
        width: '500px',
        height: '500px',
        border: '1px solid #ccc',
      }}
    >
      <div style={{
      position: 'absolute',
      backgroundColor: 'red',
      borderRadius: '50%',
      // 中心がカーソルにくるように -10 ずらす
      transform: `translate(${position.x - 10}px, ${position.y - 10}px)`,
      width: 20,
      height: 20,
    }} />
    </div>
    </div>
    <div>
        <h3>Inspiring sculptors:</h3>
      <input
        value={name}
        onChange={e => 
          setName(e.target.value)
        }
      />
      <button onClick={() => {
        setArtists([
          ...artists,
          { id: nextId.current++, name }
        ]);
        setName(''); // addボタンを追加したら、入力枠を空にする
      }}>Add</button>
            <button onClick={reverseClick}>
        Reverse
      </button>
      <ul>
        {artists.map(artist => (
          <li key={artist.id}>{artist.id} : {artist.name} 
          <button onClick={() => {
              setArtists(
                // 「artist.id と異なる ID を持つ artists のみの配列を作成する」という意味です。
                // 複製してsplice関数を使う方法もあるが、spliceは配列を書き換えるので、filterやsliceの方がシンプルになる
                artists.filter(a =>
                  a.id !== artist.id
                )
              );
            }}>
              Delete
            </button></li>
        ))}
      </ul>
      <ul>
      {counters.map((counter, i) => (
        <li key={i}>
          {counter}
          <button onClick={() => {
            handleIncrementClick(i);
          }}>+1</button>
        </li>
      ))}
    </ul>
    </div>
    </>
  );
}

