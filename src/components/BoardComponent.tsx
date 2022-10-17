import React, {FC, useEffect, useMemo, useState} from 'react';
import {Board} from '../models/Board';
import CellComponent from './CellComponent';
import {Cell} from '../models/Cell';
import {Player} from '../models/Player';
import {King} from '../models/figures/King';
import {Colors} from '../models/Colors';

interface BoardProps {
    board: Board,
    setBoard: (board: Board) => void;
    currentPlayer: Player | null,
    swapPlayer: () => void;
    whiteKing: King | null,
    blackKing: King | null,
}

enum GameStates {MATE, CHECKMATE, PLAY}

const BoardComponent: FC<BoardProps> = ({
                                            board,
                                            setBoard,
                                            currentPlayer,
                                            swapPlayer,
                                            blackKing,
                                            whiteKing,
                                        }) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);
    const [currentState, setCurrentState] = useState<GameStates>(GameStates.PLAY);

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            setCurrentState(GameStates.PLAY);
            if (rivalKing && cell.figure?.isCheckmateDone(rivalKing.cell)) {
                setCurrentState(GameStates.CHECKMATE);
            }
            swapPlayer();
            setSelectedCell(null);
        } else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    const rivalKing = useMemo((): King | null => {
        return currentPlayer?.color === Colors.WHITE ? blackKing : whiteKing;
    }, [currentPlayer]);

    useEffect(() => {
        highlightCells();
    }, [selectedCell]);

    function highlightCells() {
        board.highlightCells(selectedCell);
        updateBoard();
    }

    // react don't see changes in board's values
    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div>
            <h3>Current Player {currentPlayer?.color}</h3>
            {currentState === GameStates.CHECKMATE &&
                <h4>Checkmate to {currentPlayer?.color}</h4>
            }

            <div className="board">
                {board.cells.map((row, index) =>
                    <React.Fragment key={index}>
                        {row.map((cell) =>
                            <CellComponent key={cell.id} cell={cell}
                                           click={click}
                                           selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}/>
                        )}
                    </React.Fragment>
                )}
            </div>
        </div>
    );
};

export default BoardComponent;