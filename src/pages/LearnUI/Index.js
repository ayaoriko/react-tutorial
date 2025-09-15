// デフォルトエクスポートは中括弧なし
import Gallery from './Gallery.js';

// 名前付きエクスポートは中括弧あり
import {Profile} from './Profile.js';

import Avatar from './Avatar.js';
import {Avatar2} from './Avatar.js';
import {AvatarSend} from './Avatar.js';
import {Card} from './Avatar.js';
import {GalleryChallenge} from './Gallery.js';
import PackageList from './PackageList.js';
import {ListChallenge }from './PackageList.js';
import {RecipeChallenge }from './PackageList.js';
import {PoemChallenge }from './PackageList.js';

export default function LearnReact() {
  return (
    <>
<section>
        <h1><a href="https://ja.react.dev/learn/your-first-component">初めてのコンポーネント</a></h1>
        <Profile />
        <Profile />
        <Profile />
        <Gallery  Profile={Profile}/>
    </section>
    <section>
        <h1>JSX に波括弧で JavaScript を含める</h1>
           <Avatar />
           <Card>
            <Avatar2
              person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }}
              size={300}
            />
          </Card>
          <AvatarSend person={{ name: 'Lin Lanying', imageId: '1bX5QH6' }} size={100} />
          <GalleryChallenge></GalleryChallenge>
    </section>
    <section>
      <h1>レンダー</h1>
      <PackageList />
      <h1>チャレンジ問題</h1>
      <ListChallenge />
      <h1>レシピチャレンジ</h1>
      <RecipeChallenge />
      <h1>ポエムチャレンジ</h1>
      <PoemChallenge />
    </section>
    </>
  );
}

