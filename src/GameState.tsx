import React, { useRef, useState, useEffect } from 'react';
import { act } from 'react-dom/test-utils';
import { GameState as _GameState, GameConfiguration, Point, GameStatuses } from "./types";
import { LinkedList, LinkedNode, generateRandomPoint } from "./utils";
import Grid from './Grid/Grid';
import ScreenMessage from './ScreenMessage/ScreenMessage';

interface ObjectGameState {
    current: _GameState
};

export class GameState {
    gameState: ObjectGameState;
    snakeVector: Array<number>;
    config: GameConfiguration;
    gridCellCount: number;

    constructor() {
        this.gameState = {
            current: {
                snakeList: new LinkedList(new LinkedNode({ x: 0, y: 0 })),
                wallList: [],
                foodPoint: null,
                gameStatus: GameStatuses.PLAY,
            }
        }
        this.snakeVector = [0, 1];
        this.config = {
            gridWidth: 3,
            gridHeight: 3,

            defaultSnakeX: 1,
            defaultSnakeY: 0,

            vector: {
                up: [0, -1],
                down: [0, 1],
                left: [-1, 0],
                right: [1, 0]
            }
        };
        this.gridCellCount = this.config.gridWidth * this.config.gridHeight;
    }

    Tick() {
        const head = this.gameState.current.snakeList.getByIndex(0);

        let nextX = head!.data.x + this.snakeVector[0];
        let nextY = head!.data.y + this.snakeVector[1];

        if (nextX >= this.config.gridWidth) {
            nextX = 0;
        } else if (nextX < 0) {
            nextX = this.config.gridWidth - 1;
        }

        if (nextY >= this.config.gridHeight) {
            nextY = 0;
        } else if (nextY < 0) {
            nextY = this.config.gridHeight - 1;
        }

        this.gameState.current.snakeList.insertByIndex(0, {
            x: nextX,
            y: nextY
        });

        if (this.gameState.current.foodPoint &&
            this.gameState.current.foodPoint.x === head!.data.x &&
            this.gameState.current.foodPoint.y === head!.data.y
        ) {
            this.gameState.current.snakeList.push({
                x: head!.data.x,
                y: head!.data.y
            });
        }

        this.gameState.current.snakeList.removeByIndex(this.gameState.current.snakeList.length() - 1);

        if (this.gameState.current.snakeList.someExceptHead((item) => item.x === nextX && item.y === nextY)) {
            this.gameState.current.gameStatus = GameStatuses.LOSE;
        }

        if (this.gameState.current.snakeList.length() === this.gridCellCount) {
            this.gameState.current.gameStatus = GameStatuses.WIN;
        }
    }

    left() {
        this.snakeVector = this.config.vector.left;
    }

    right() {
        this.snakeVector = this.config.vector.right;
    }

    up() {
        this.snakeVector = this.config.vector.up;
    }

    down() {
        this.snakeVector = this.config.vector.down;
    }

}
