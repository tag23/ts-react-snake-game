import React, {useRef, useState, useEffect} from 'react';
import './App.css';
import Grid from './Grid/Grid';
import {Point, MatrixType} from './types';
import { LinkedList, LinkedNode } from './utils';

const GRID_WIDTH = 20;
const GRID_HEIGHT = 14;

const DEFAULT_SNAKE_X = 10;
const DEFAULT_SNAKE_Y = 7; 

const VECTOR_UP = [0, -1];
const VECTOR_DOWN = [0, 1];
const VECTOR_LEFT = [-1, 0];
const VECTOR_RIGHT = [1, 0];


const App = () => {
  const defaultHead = {x: DEFAULT_SNAKE_X, y: DEFAULT_SNAKE_Y};

  const snakeList = useRef<LinkedList<Point>>(new LinkedList(new LinkedNode(defaultHead)));

  const [token, setToken] = useState({});
  const [snakeVector, setSnakeVector] = useState<Array<number>>([0, 1]);
  const [keyPressedState, setKeyPressedState] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const head = snakeList.current.getByIndex(0);

      snakeList.current.insertByIndex(0, {
        x: head!.data.x + snakeVector[0],
        y: head!.data.y + snakeVector[1]
      });

      snakeList.current.push({
        x: head!.data.x, 
        y: head!.data.y
      });

      snakeList.current.removeByIndex(snakeList.current.length()-1);

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
        if (event.key === "w" && snakeVector !== VECTOR_UP) {
          setSnakeVector(VECTOR_UP);
        } else if (event.key === "s" && snakeVector !== VECTOR_DOWN) {
          setSnakeVector(VECTOR_DOWN);
        } else if (event.key === "a" && snakeVector !== VECTOR_LEFT) {
          setSnakeVector(VECTOR_LEFT);
        } else if (event.key === "d" && snakeVector !== VECTOR_RIGHT) {
          setSnakeVector(VECTOR_RIGHT);
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
        width={GRID_WIDTH}
        height={GRID_HEIGHT}
        isFilled={(x, y) => {
          const snakePartExist = snakeList.current.some((item) => item.x === x && item.y === y);

          return snakePartExist;
        }}
      />
    </div>
  );
}

export default App;
