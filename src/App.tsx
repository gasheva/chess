import React, {useEffect, useState} from 'react';
import './App.css';
import {Board} from './models/Board';
import BoardComponent from './components/BoardComponent';
import {Player} from './models/Player';
import {Colors} from './models/Colors';
import LostFigures from './components/LostFigures';
import Timer from './components/Timer';
import {King} from './models/figures/King';

const App = () => {
    const [board, setBoard] = useState(new Board());
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
    const [isTimeout, setIsTimeout] = useState<boolean>(false);

    const [whiteKing, setWhiteKing] = useState<King | null>(null);
    const [blackKing, setBlackKing] = useState<King | null>(null);

    useEffect(() => {
        restart();
    }, []);

    function restart() {
        const newBoard = new Board();
        newBoard.initCells();
        newBoard.addFigures();
        setWhiteKing(newBoard.whiteKing);
        setBlackKing(newBoard.blackKing);
        setBoard(newBoard);
        setCurrentPlayer(whitePlayer);
        setIsTimeout(false);
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
    }

    const timeout = () => {
        setIsTimeout(true);
    };

    return (
        <div className="app">
            <Timer currentPlayer={currentPlayer}
                   timeout={timeout}
                   restart={restart}/>
            {isTimeout
                ?
                <h2>Timeout: No one won. No one failed</h2>
                : <>
                    <BoardComponent board={board}
                                    setBoard={setBoard}
                                    currentPlayer={currentPlayer}
                                    swapPlayer={swapPlayer}
                                    whiteKing={whiteKing}
                                    blackKing={blackKing}
                    />
                </>
            }
            <div>
                <LostFigures title="Black figures" figures={board.lostBlackFigures}/>
                <LostFigures title="White figures" figures={board.lostWhiteFigures}/>
            </div>
        </div>
    );
};

export default App;
