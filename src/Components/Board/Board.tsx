import './Board.css'

import Square from '../Square/Square';

function Board({ xIsNext, squares, onPlay }: {xIsNext: boolean, squares: string[], onPlay: (nextSquares: string[]) => void}){

  const winner = calculateWinner(squares);

  function getStatus() {
    if(winner) {
      winner.map(btn => {
        let buttonWinner = document.querySelectorAll<HTMLElement>(`#btn-${btn.toString()}`)[0];
        buttonWinner.style.backgroundColor = "#31d431";
      });
      return "Vencedor: " + squares[winner[0]];
    }else {
      if(!squares.includes("")) {
        Array.from({length: 9}, (_, index) => {
          let buttonWinner = document.querySelectorAll<HTMLElement>(`#btn-${index.toString()}`)[0];
          buttonWinner.style.backgroundColor = "red";
        });
        return "Deu velha!"
      }
      return "Próximo jogador: "+ (xIsNext ? "X" : "O");
    }
  }

  function handleClick(i: number) {
    
    if(calculateWinner(squares) || squares[i]) {
      return;
    }

    const nextSquares = squares.slice();
    if(xIsNext) {
      nextSquares[i] = "X";
    }else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  return(
    <div id='container'>
      <div className='status'>{ getStatus() }</div>
      <div className='board-row'>
      <Square value={{id: "btn-0", value:squares[0]}} onSquareClick={() => handleClick(0)}/>
      <Square value={{id: "btn-1", value:squares[1]}} onSquareClick={() => handleClick(1)}/>
      <Square value={{id: "btn-2", value:squares[2]}} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className='board-row'>
      <Square value={{id: "btn-3", value:squares[3]}} onSquareClick={() => handleClick(3)}/>
      <Square value={{id: "btn-4", value:squares[4]}} onSquareClick={() => handleClick(4)}/>
      <Square value={{id: "btn-5", value:squares[5]}} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className='board-row'>
      <Square value={{id: "btn-6", value:squares[6]}} onSquareClick={() => handleClick(6)}/>
      <Square value={{id: "btn-7", value:squares[7]}} onSquareClick={() => handleClick(7)}/>
      <Square value={{id: "btn-8", value:squares[8]}} onSquareClick={() => handleClick(8)}/>
      </div>
    </div>
  );
}

export default Board;

function calculateWinner(squares: string[]) {
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
      return [a, b, c];
    }
  }
  return null;
}
