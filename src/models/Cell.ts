import {Colors} from './Colors';
import {Figure} from './figures/Figure';
import {Board} from './Board';

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    // cycle dependency - Cell know about Board and Board know about Cell
    board: Board;
    available: boolean; // can move
    id: number; // for react keys

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        this.id = Math.random();
    }

    moveFigure(target: Cell) {
        if (this.figure?.canMove(target)) {
            this.figure.moveFigure(target);
            target.figure = this.figure;
            this.figure = null;
        }
    }

}