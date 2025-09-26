import { useState } from 'react';

export default function InputWithState() {
const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');
  const [isImageClick, setIsImageClick] = useState(false);
  
  const [IsEditProfile, setIsEditProfile] = useState(false);
  const [FirstName, setFirstName] = useState('Jane');
  const [LastName, setLastName] = useState('Jacobs');
  
  function imageClick(e) {
    isImageClick ? setIsImageClick(false) : setIsImageClick(true);
  }
  
  
  // useStateで変更される値は、独立して書かないといけない
  let backgroundClassName = isImageClick ? 'background' : 'background background--active';
  let imgClassName = isImageClick ? 'picture picture--active' : 'picture';
  
  if (status === 'success') {
    return <h1>That's right!</h1>
  }
  
    async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (err) {
      setStatus('typing');
      setError(err);
    }
  }
  
    function handleTextareaChange(e) {
        setAnswer(e.target.value);
    }

    

  return (
    <>
        <h2>City quiz</h2>
      <p>
        りんごと入力してください。
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleTextareaChange}
          disabled={status === 'submitting'}
        />
        <br />
        <button disabled={
          answer.length === 0 ||
          status === 'submitting'
        }>
          Submit
        </button>
        {error !== null &&
          <p className="Error">
            {error.message}
          </p>
        }
      </form>
      <h3>チャレンジ問題1</h3>
    <div className={backgroundClassName} onClick={imageClick}>
      <img
        className={imgClassName}
        alt="Rainbow houses in Kampung Pelangi, Indonesia"
        src="https://i.imgur.com/5qwVYb1.jpeg"
      />
    </div>
    <h3>チャレンジ問題2</h3>
    <form className='profile-form'>
        {/* React で <input> を使う場合は onChange を書かないと編集できない（読み取り専用扱いになって警告が出る） */}
      <label>
        First name:{' '}
        { IsEditProfile ? <input value={FirstName} onChange={(e) => setFirstName(e.target.value)} /> :  <b>{FirstName}</b>}
      </label>
      <label>
        Last name:{' '}
        { IsEditProfile ? <input value={LastName} onChange={(e) => setLastName(e.target.value)} />: <b> {LastName}</b> }
      </label>
      {/* type="button"じゃないとうまく作動しない */}
    <button type="button"  onClick={() => setIsEditProfile(prev => !prev)}>
              { IsEditProfile ? 'Save Profile' : 'Edit Profile' }
      </button>
      
      <p><i>Hello, {FirstName} {LastName}!</i></p>
    </form>
    {/*
    <h2>state 構造の選択</h2>
    <h3>チャレンジ問題にトライ/ 壊れた荷物リストの修正 </h3>
            // ✅ 正しい
        items.filter(item => item.packed);

        // ✅ 正しい（ブロックとreturnを明示）
        items.filter(item => {
        return item.packed;
        });

        // ❌ 間違い（ブロックなのにreturnがない）
        items.filter(item => {
        item.packed;
        });
        */}
    </>
  );
}

function submitForm(answer) {
  // Pretend it's hitting the network.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let shouldError = answer.toLowerCase() !== 'りんご'
      if (shouldError) {
        reject(new Error('Good guess but a wrong answer. Try again!'));
      } else {
        resolve();
      }
    }, 1500);
  });
}
