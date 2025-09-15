
import { getImageUrl } from './utils.js';
import { getImageUrl2 } from './utils.js';
const today = new Date();

const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function Avatar() {
  const avatar = 'https://i.imgur.com/7vQD0fPs.jpg';
  const description = person.name;
  return (
    <div>
      <div  style={{
        backgroundColor: 'black',
        color: 'pink',
        margin: '20px 0'
      }}>
      <img
        className="avatar"
        src={avatar}
        alt={description}
      />
      <br />
      <p>{description} / To Do List for {formatDate(today)}</p>
      </div>
    </div>
  );
}


export function Avatar2({ person, size = 's'}) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

// propを使うことで、丸ごと渡すことができる
export function AvatarSend(props) {
  return (
    <div className="card">
      {/* ここで props を展開して Avatar2 に渡す */}
      <Avatar2 {...props} />
    </div>
  );
}

export function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}


function formatDate(date) {
  return new Intl.DateTimeFormat(
    'en-US',
    { weekday: 'long' }
  ).format(date);
}

// ProfileChallenge(personProfile) { →props 全体
// ProfileChallenge( {personProfile}) { → props から直接 personProfile を取り出している

export function ProfileChallenge( {personProfile}) {
  
  return (
    <section className="profile">
      <h2>{personProfile.name}</h2>
        <img
        className="avatar"
        src={getImageUrl2(personProfile.imageId)}
        alt={personProfile.name}
        width='70'
        height='70'
      />
      <ul>
          <li>
            <b>Profession: </b> 
            {personProfile.profession}
          </li>
          <li>
            <b>Awards: {personProfile.awards.length}</b> 
            （{personProfile.awards.join(', ')}）
          </li>
          <li>
            <b>Discovered: </b>
            {personProfile.discovered}
          </li>
      </ul>
    </section>
  );
}
