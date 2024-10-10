import React, { useState } from "react";
import './index.css';

function Square({ value, onSquareClick }) {
  return (
    <button
      className="border-2 border-regal-blue w-full aspect-square md:text-5xl lg:text-8xl flex items-center justify-center"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}


const Board = ({ moves, setMoves, xIsNext, setXIsNext }) => {
  const [winner, setWinner] = useState(null);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (winner != null) {
      return;
    }
    if (calculateWinner(squares) || squares[i] != null) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        setWinner(squares[a]);
        return squares[a];
      }
    }
    return null;
  }

  function resetBoard() {
    setSquares(Array(9).fill(null));
    setWinner(null);
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-0 w-full sm:w-2/3 lg:w-1/3">
        {squares.map((square, index) => (
          <Square key={index} value={square} onSquareClick={() => handleClick(index)} />
        ))}
      </div>
      <br />
      <button className="border-2 p-3 border-regal-blue" onClick={resetBoard}>
        Reset the board
      </button>
      <br />
      {winner && <h2 className="sm:text-2xl md:text-3xl lg:text-6xl font-bold">{`Winner: ${winner}`}</h2>}
    </>
  );
};

const App = () => {
  const [xIsNext, setXIsNext] = useState(true);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-center w-full">
          <h1 className="sm:text-2xl md:text-3xl lg:text-6xl font-bold my-5">Tic Tac Toe</h1>
        </div>
        <br />
        <div className="flex flex-col w-full justify-items-start items-center">
          <Board xIsNext={xIsNext} setXIsNext={setXIsNext} />
        </div>
      </div>
    </>
  );
};

export default App;
