import React, {FC, useEffect, useState} from 'react';
import {Board} from '../models/Board';
import CellComponent from './CellComponent';
import {Cell} from '../models/Cell';

interface BoardProps {
    board: Board,
    setBoard: (board: Board) => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell);
            setSelectedCell(null);
        } else {
            setSelectedCell(cell);
        }
        if (cell.figure) {
            setSelectedCell(cell);
        }
    }

    useEffect(() => {
        highlightCells();
        updateBoard();
    }, [selectedCell]);

    function highlightCells() {
        board.highlightCells(selectedCell);
    }

    // react don't see changes in board's values
    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
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
    );
};

export default BoardComponent;