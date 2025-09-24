import sculptureList from './sculptureList.json';
import { useState } from 'react';
import { useImmer } from 'use-immer';

export default function StateGallery() {
  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const hasNext = index < sculptureList.length - 1;
    const [score, setScore] = useState(0);
    const [number, setNumber] = useState(0);
  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }
  function handleMoreClick() {
    setShowMore(!showMore);
  }

  function increment() {
    setScore(s => s + 1);
  }
  
   let sculpture = sculptureList[index];

 // react.jsではpersonを直接変更してはいけない（ミューテート禁止）
 // const [person, setPerson] = useState({ name: "Alice", age: 20 });
 // NG（直接書き換え）: person.age++;
 // OK（新しいオブジェクトを渡す）：setPerson({ ...person, age: person.age + 1 });
 // useStateではなくuseImmerを使うことで、NGのような書き方が許されるようになる
 // import { useImmer } from "use-immer";
 // const [person, updatePerson] = useImmer({ name: "Alice", age: 20 });
 // updatePerson(draft => {  draft.age++; });
  
const [person, updatePerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e) {
    updatePerson(draft => {
      draft.name = e.target.value;
    });
  }

  function handleTitleChange(e) {
    updatePerson(draft => {
      draft.artwork.title = e.target.value;
    });
  }

  function handleCityChange(e) {
    updatePerson(draft => {
      draft.artwork.city = e.target.value;
    });
  }

  function handleImageChange(e) {
    updatePerson(draft => {
      draft.artwork.image = e.target.value;
    });
  }

  return (
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h3>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h3>
      <h4>
        ({index + 1} of {sculptureList.length})
      </h4>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <img
        src={sculpture.url}
        alt={sculpture.alt}
      />
      <div style={{ marginTop: 20 }}>
    <button onClick={() => increment()}>+1</button>
      <button onClick={() => {
        increment();
        increment();
        increment();
      }}>+3</button>
      <h1>Score: {score}</h1>
      <button onClick={() => {
        // 今の number に 5 を足した値に更新
        setNumber(number + 5);
        // 関数を渡すと「前の state の値」を引数に受け取れる
        // → この書き方なら state が複数回更新されても安全に加算できる
        setNumber(n => n + 1);
        // 固定値を渡すと、その値に置き換わる
        // setNumber(42); // これで必ず 42 にリセットされる
      }}>Increase the number</button>
      <h1>{number}</h1>
      </div>
      <div>
        <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <img
        src={person.artwork.image}
        alt={person.artwork.title}
      />
      </div>
    </>
  );
}