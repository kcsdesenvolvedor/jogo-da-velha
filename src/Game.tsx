import { useState } from "react";
import Board from "./Components/Board/Board";

export default function Game() {

    const [history, setHistory] = useState([Array(9).fill("")]);
    const [currentMove, setCurrentMove] = useState(0);
    const currentSquares = history[currentMove];
    const xIsNext = currentMove % 2 === 0;

    function handlePlay(nextSquares: string[]) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        console.log(nextHistory);
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length -1);
    }

    function jumpTo(move: number) {
        setCurrentMove(move);
    }

    const moves = history.map((square, move) => {
        let description = "";

        if(move > 0) {
            description = "Voltar para o movimento #"+move;
        }else {
            description = "Iniciando o jogo!"
        }

        return(
            <li className="move-info" key={move}>
                <button onClick={() => jumpTo(move)}>{ description }</button>
            </li>
        );
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ol>{ moves }</ol>
            </div>
        </div>
    )
}
