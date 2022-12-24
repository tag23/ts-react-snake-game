import { LinkedList } from "./utils";

export interface Point {
    x: number;
    y: number;
};

export enum GameStatuses {
    PLAY,
    PAUSE,
    LOSE,
    WIN
};

export type VectorDirection = -1|0|1;

export type GameConfiguration = {
    gridWidth: number;
    gridHeight: number;

    defaultSnakeX: number;
    defaultSnakeY: number; 

    vector: Record<"up"|"down"|"left"|"right", [VectorDirection, VectorDirection]>;
};

export type GameState = {
    snakeList: LinkedList<Point>,
    wallList: Array<Point>,
    foodPoint: Point | null,
    gameStatus: GameStatuses
};