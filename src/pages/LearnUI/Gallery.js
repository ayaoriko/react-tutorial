import { ProfileChallenge } from './Avatar.js';
// React コンポーネントの名前は大文字で始めなければなりません。
// ファイルにはデフォルトエクスポートは 1 つまでしか置けません
export default function Gallery({ Profile }) {
    return(
        <>
            <Profile />
            <Profile />
            <Profile />
        </>
    )
}

export function GalleryChallenge() {
  return (
    <div>
      <h1>Notable Scientists</h1>
      <ProfileChallenge
        personProfile={{ 
            name: 'Maria Skłodowska-Curie', 
            imageId: '1bX5QH6',
            profession: 'physicist and chemist',
            awards: [
                'Nobel Prize in Physics',
                'Nobel Prize in Chemistry', 
                'Davy Medal' ,
                'Matteucci Medal'
            ],
            discovered: 'polonium (chemical element)'
            }}
      />
      <ProfileChallenge
        personProfile={{ 
            name: 'Lin Maria Skłodowska-Curie', 
            imageId: 'YfeOqp2',
            profession: 'geochemist',
            awards: [
                'Miyake Prize for geochemistry',
                'Tanaka Prize'
            ],
            discovered: 'a method for measuring carbon dioxide in seawater'
            }}
      />
    </div>
  );
}

export function ProfileCard({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

