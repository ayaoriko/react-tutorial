import { Fragment } from 'react';
import { getImageUrl3 } from './utils.js';
import people2 from './people.json';
import recipe from './recipe.json';
// 名前付きエクスポートは好きなだけ置くことができます。
export default function PackageList() {
const peopleItems = people.map(person => <li>{person}</li>);
const people2Items = people2.map(person => <li>{person.name}</li>);
// アロー関数は => の直後の式を自動的に返しますので、return 文を直接書く必要はありません。
// ただし、もし => の次に { が続く場合は、必ず return 文を明示的に書く必要があります。
const chemists = people2.filter(person =>
  person.profession === 'chemist'
);
// 配列の各アイテムには、key を渡す必要があります。
const peopleListItems = chemists.map(person =>
  <li key={person.id}>
     <img
       src={getImageUrl3(person)}
       alt={person.name}
     />
     <p>
       <b>{person.name}:</b>
       {' ' + person.profession + ' '}
       known for {person.accomplishment}
     </p>
  </li>
);
  return (
    <>
    <h2>パッケージリスト</h2>
      <ul>
        <PackageItem 
          isPacked={true} 
          name="Space suit" 
        />
        <PackageItem 
          isPacked={true} 
          name="Helmet with a golden leaf" 
        />
        <PackageItem 
          isPacked={false} 
          name="Photo of Tam" 
        />
      </ul>
        <h2>リストのレンダー</h2>
        <ul>
        { peopleItems }
        {people2Items}
        {peopleListItems}
        </ul>
    </>
  );
}

const people = [
  'Creola Katherine Johnson: mathematician',
  'Mario José Molina-Pasquel Henríquez: chemist',
  'Mohammad Abdus Salam: physicist',
  'Percy Lavon Julian: chemist',
  'Subrahmanyan Chandrasekhar: astrophysicist'
];


function PackageItem({ name, isPacked }) {
    let PackageItemContent = name;
    if (isPacked) {
        PackageItemContent = name + " ✅";
    }
  if (isPacked) {
  return (
    <>
        <li className="PackageItem">
        {isPacked ? (
            <del>
            {name}  {isPacked && '✅'}
            </del>
        ) : (
            name
        )}
        </li>
        <li className="PackageItem">
        {PackageItemContent}
        </li>
    </>
  );
  }
  return (
    <>
      <li className="PackageItem">{name}</li>
        <li className="PackageItem">
            {isPacked ? name + ' ✅' : name}
        </li>
    </>
);
}

export function ListChallenge() {
  const chemist =  people2.filter( p => p.profession === 'chemist')
  const notChemist =  people2.filter( p => p.profession !== 'chemist')
  return (
    <article>
      <h1>Scientists</h1>
      <ListChallengeItem title ="chemist"  people = { chemist  }/>
        <ListChallengeItem title ="other" people = { notChemist  }/>
    </article>
  );
}

// React のコンポーネントは props オブジェクトを1つ受け取る形になるので、
// title, peopleではなく{ title, people }で指定する
function ListChallengeItem( { title, people }) {
  return (
    <>
    <h2>{title}</h2>
    {people.map(person =>
        <li key={person.id}>
          <img
            src={getImageUrl3(person)}
            alt={person.name}
          />
          <p>
            <b>{person.name}:</b>
            {' ' + person.profession + ' '}
            known for {person.accomplishment}
          </p>
        </li>
      )}
    </>
  )
}



export function RecipeChallenge() {
    return (
      <>
      {recipe.map(r =>
      <RecipeChallengeComponent 
      {...r} 
       key={recipe.id}
      />
      )}
    </>
  )}
  
  
 function RecipeChallengeComponent({name,ingredients}){
    return (
          <>
          <h2>{ name }</h2>
          <ul>
            {ingredients.map(ingredient => 
            <li key={ingredient}>{ingredient}</li>
            )}
          </ul>
          </>
      )
}


const poem = {
  lines: [
    'I write, erase, rewrite',
    'Erase again, and then',
    'A poppy blooms.'
  ]
};

export function PoemChallenge() {
  
  // JSでは poemToDisplay= poemにすると参照渡し扱いとなり、 poemToDisplayを変えるとpoemも変わるため、slice()を使って「中身が同じだけど別物の配列」を作る必要がある。
  // poem はオブジェクト { lines: [...] } 、poem.linesは配列
  // そのためpoem.slice()は使えない。
  // 別解：const poemToDisplay = [...poem.lines];
  const poemToDisplay = poem.lines.slice();
  poemToDisplay.push( 'New Poem!!' )
  return (
    <article>
      { poemToDisplay.map((line, index) =>
      <Fragment key={index}>
        {index !== 0 && <hr /> }
        <p> {line} </p>
      </Fragment>
      )}
    </article>
  );
}