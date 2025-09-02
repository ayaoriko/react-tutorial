import { useState } from 'react';

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  
  // 現在の状態の値 → この場合 squares
  // 状態を更新する関数 → この場合 setSquares
  //   useState(Array(9).fill(null))で、squares の中身を [null, null, null, null, null, null, null, null, null] にする
  const [squares, setSquares] = useState(Array(9).fill(null));

  const size = 3;
  
  function handleClick(i) {
    // すでにチェック済みのマスだった場合は何もしない
  if (squares[i] || calculateWinner(squares, size)) {
    return;
  }
  
  // 現在の配列をコピー
   const nextSquares = squares.slice();
    //  nextSquares[i] にXかOを入れる
    nextSquares[i] = xIsNext ? "X" : "O";
    // 画面に反映
    setSquares(nextSquares);
    // 次のプレーヤーを設定
    setXIsNext(!xIsNext);
  }
  
  const winner = calculateWinner(squares, size);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else if (!squares.includes(null)) {
    status = "Draw!";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    <>
      <div className={`status ${winner ? "winner" : ""}`}>{status}</div>
      {/* JSXの場合、for文が使えないので、map関数を使う */}
      {/* 例：squares.map((value, i) => <Square key={i} value={value} />) */}
      {/* インデックス（row / col）だけを使うため _ で無視しています。 */}
      {Array.from({ length: size }).map((_, row) => (
        <div key={row} className="board-row">
          {Array.from({ length: size }).map((_, col) => {
            const index = row * size + col;
            // () => handleClick(0) アロー関数を使うことで、クリック後に動くようにしている。
            return (
              <Square
                key={index}
                value={squares[index]}
                onSquareClick={() => handleClick(index)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
  
  function Square({ value, onSquareClick }) {
    return (
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    );
  }
  
  /*** 勝った方の X or O を返す ***/
function calculateWinner(squares, size) {
  
  // row
  for (let r = 0; r < size; r++) {
    // squares[r * size] でその行の最初のマスの値（"X" か "O" か null）を取得して first に代入
    const first = squares[r * size];
    let allSame = true;
     // 行の全マスを first と比較して、同じかどうかをチェック
    for (let i = 0; i < size; i++) {
      // もし全て同じなら allSame は true のまま
      // そして first が null でなければ、勝者として返します
      if (squares[r * size + i] !== first) {
        allSame = false;
        break;
      }
    }// i終了
    if (first !== null && allSame === true) return first;
  }// r終了

  // columns
  for (let c = 0; c < size; c++) {
    const first = squares[c];
    let allSame = true;
    for (let i = 0; i < size; i++) {
      if (squares[i * size + c] !== first) { // ここがrowと異なる
        allSame = false;
        break;
      }
    }
    if (first && allSame) return first;
  }

// top-left → bottom-right
let firstDiag = squares[0];
if (firstDiag !== null) {
  let allSame = true;
  for (let i = 0; i < size; i++) {
    if (!squares[i * size + i] || squares[i * size + i] !== firstDiag) {
      allSame = false;
      break;
    }
  }
  if (allSame) return firstDiag;
}

// top-right → bottom-left
firstDiag = squares[size - 1];
if (firstDiag !== null) {
  let allSame = true;
  for (let i = 0; i < size; i++) {
    const cell = squares[i * size + (size - 1 - i)];
    if (!cell || cell !== firstDiag) {
      allSame = false;
      break;
    }
  }
  if (allSame) return firstDiag;
}


  return null; // 勝者なし
}

}// function Board()終了