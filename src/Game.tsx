import React, { useRef, useState, useEffect } from 'react';
import { GameState, GameConfiguration, Point, GameStatuses } from "./types";
import { LinkedList, LinkedNode, generateRandomPoint } from "./utils";
import Grid from './Grid/Grid';
import ScreenMessage from './ScreenMessage/ScreenMessage';
import { GameState as GameStateClass } from './GameState';


export const Game = ({ config }: { config: GameConfiguration }) => {
    const defaultHead = { x: config.defaultSnakeX, y: config.defaultSnakeY };
    const gridCellCount = config.gridWidth * config.gridHeight;
    // const gameStateClass = new GameStateClass();

    // const snakeList = useRef<LinkedList<Point>>(new LinkedList(new LinkedNode(defaultHead)));

    const [token, setToken] = useState({});
    const [snakeVector, setSnakeVector] = useState<Array<number>>([0, 1]);
    const [keyPressedState, setKeyPressedState] = useState<boolean>(false);

    const gameState = useRef<GameState>({
        snakeList: new LinkedList(new LinkedNode(defaultHead)),
        wallList: [],
        foodPoint: null,
        gameStatus: GameStatuses.PLAY
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const head = gameState.current.snakeList.getByIndex(0);

            let nextX = head!.data.x + snakeVector[0];
            let nextY = head!.data.y + snakeVector[1];

            if (nextX >= config.gridWidth) {
                nextX = 0;
            } else if (nextX < 0) {
                nextX = config.gridWidth - 1;
            } else if (nextY >= config.gridHeight) {
                nextY = 0;
            } else if (nextY < 0) {
                nextY = config.gridHeight - 1;
            }

            gameState.current.snakeList.insertByIndex(0, {
                x: nextX,
                y: nextY
            });

            if (gameState.current.foodPoint &&
                gameState.current.foodPoint.x === head!.data.x &&
                gameState.current.foodPoint.y === head!.data.y
            ) {
                gameState.current.snakeList.push({
                    x: head!.data.x,
                    y: head!.data.y
                });
            }

            gameState.current.snakeList.removeByIndex(gameState.current.snakeList.length() - 1);

            if (gameState.current.snakeList.someExceptHead((item) => item.x === nextX && item.y === nextY)) {
                gameState.current.gameStatus = GameStatuses.LOSE;
            }

            if (gameState.current.snakeList.length() === gridCellCount) {
                gameState.current.gameStatus = GameStatuses.WIN;
            }

            if (gameState.current.gameStatus === GameStatuses.PLAY) {
                setToken({});
            }
            // gameStateClass.Tick()
            setKeyPressedState(false);
        }, 450);

        return () => {
            clearInterval(interval);
        };
    }, [snakeVector]);

    useEffect(() => {

        if (gameState.current.gameStatus === GameStatuses.PLAY) {
            const snakeLength = gameState.current.snakeList.length();

            let newFoodPoint: Point;

            if (snakeLength < gridCellCount) {
                do {
                    newFoodPoint = generateRandomPoint(config.gridWidth, config.gridHeight);
                } while (
                    gameState.current.snakeList.some((item) => item.x === newFoodPoint.x && item.y === newFoodPoint.y)
                );

                gameState.current.foodPoint = newFoodPoint;
            } else {
                gameState.current.foodPoint = null;
            }

            if (snakeLength === gridCellCount) {
                gameState.current.gameStatus = GameStatuses.WIN;
            }
        }
    }, [gameState.current.snakeList.count])

    useEffect(() => {
        const keypressFunction = (event: KeyboardEvent) => {
            if (!keyPressedState) {
                if (event.key === "w" && snakeVector !== config.vector.up) {
                    setSnakeVector(config.vector.up);
                    // gameStateClass.up();
                } else if (event.key === "s" && snakeVector !== config.vector.down) {
                    setSnakeVector(config.vector.down);
                    // gameStateClass.down();
                } else if (event.key === "a" && snakeVector !== config.vector.left) {
                    setSnakeVector(config.vector.left);
                    // gameStateClass.left();
                } else if (event.key === "d" && snakeVector !== config.vector.right) {
                    setSnakeVector(config.vector.right);
                    // gameStateClass.right();
                }
            }

            setKeyPressedState(true);
        };

        document.addEventListener('keypress', keypressFunction);

        return () => {
            document.removeEventListener("keypress", keypressFunction);
        }
    }, [keyPressedState]);

    const screenMessages = {
        [GameStatuses.LOSE]: <div className="screen-message-text lose">YOU LOSE</div>,
        [GameStatuses.PAUSE]: <div className="screen-message-text pause">PAUSE</div>,
        [GameStatuses.WIN]: <div className="screen-message-text win">YOU WIN</div>,
        [GameStatuses.PLAY]: <></>,
    };

    return (
        <div className="app">
            <Grid
                width={config.gridWidth}
                height={config.gridHeight}
                isFilled={(x: number, y: number) => {
                    const snakeHead = gameState.current.snakeList.head;
                    const isSnakeHead = snakeHead ? snakeHead.data.x === x && snakeHead.data.y === y : false;
                    const snakePartExist = gameState.current.snakeList.some((item) => item.x === x && item.y === y);
                    const foodExist = gameState.current.foodPoint ? gameState.current.foodPoint.x === x && gameState.current.foodPoint.y === y : false;
                    const wallExist = false;

                    if (isSnakeHead) {
                        return "snake-head-filled";
                    } else if (snakePartExist) {
                        return "snake-filled";
                    } else if (foodExist) {
                        return "food-filled";
                    } else if (wallExist) {
                        return "wall-filled";
                    }

                    return "";
                }}
            />
            <ScreenMessage>
                {screenMessages[gameState.current.gameStatus]}
            </ScreenMessage>
        </div>
    );
};

export default Game;