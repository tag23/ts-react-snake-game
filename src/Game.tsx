import React, {useRef, useState, useEffect} from 'react';
import { GameState, GameConfiguration, Point } from "./types";
import { LinkedList, LinkedNode, generateRandomPoint } from "./utils";
import Grid from './Grid/Grid';


export const Game = ({config}: {config: GameConfiguration}) => {
    const defaultHead = {x: config.defaultSnakeX, y: config.defaultSnakeY};

    // const snakeList = useRef<LinkedList<Point>>(new LinkedList(new LinkedNode(defaultHead)));
  
    const [token, setToken] = useState({});
    const [snakeVector, setSnakeVector] = useState<Array<number>>([0, 1]);
    const [keyPressedState, setKeyPressedState] = useState<boolean>(false);
    const gameState = useRef<GameState>({
        snakeList: new LinkedList(new LinkedNode(defaultHead)),
        wallList: [],
        foodPoint: generateRandomPoint(config.gridWidth, config.gridHeight)
    });
  
    useEffect(() => {
      const interval = setInterval(() => {
        const head = gameState.current.snakeList.getByIndex(0);

        gameState.current.snakeList.insertByIndex(0, {
          x: head!.data.x + snakeVector[0],
          y: head!.data.y + snakeVector[1]
        });

        if (gameState.current.foodPoint && 
            gameState.current.foodPoint.x === head!.data.x && 
            gameState.current.foodPoint.y === head!.data.y
        ) {
            gameState.current.snakeList.push({
              x: head!.data.x, 
              y: head!.data.y
            });

            let newFoodPoint: Point;

            if (gameState.current.snakeList.length() <= config.gridWidth * config.gridHeight) {
                do {  
                    newFoodPoint = generateRandomPoint(config.gridWidth, config.gridHeight);
                } while (
                    gameState.current.snakeList.some((item) => item.x === newFoodPoint.x && item.y === newFoodPoint.y)
                );

                gameState.current.foodPoint = newFoodPoint;
            } else {
                gameState.current.foodPoint = null;
            }
        }
  
        gameState.current.snakeList.removeByIndex(gameState.current.snakeList.length()-1);
  
        setToken({});
        setKeyPressedState(false);
      }, 750);
  
      return () => {
        clearInterval(interval);
      };
    }, [snakeVector]);
  
    useEffect(() => {
      const keypressFunction = (event: KeyboardEvent) => {
        if (!keyPressedState) {
          if (event.key === "w" && snakeVector !== config.vector.up) {
            setSnakeVector(config.vector.up);
          } else if (event.key === "s" && snakeVector !== config.vector.down) {
            setSnakeVector(config.vector.down);
          } else if (event.key === "a" && snakeVector !== config.vector.left) {
            setSnakeVector(config.vector.left);
          } else if (event.key === "d" && snakeVector !== config.vector.right) {
            setSnakeVector(config.vector.right);
          }
        }
  
        setKeyPressedState(true);
      };
  
      document.addEventListener('keypress', keypressFunction);
  
      return () => {
        document.removeEventListener("keypress", keypressFunction);
      }
    }, [keyPressedState]);

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
        </div>
    );
};

export default Game;