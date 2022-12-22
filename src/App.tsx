import React, {useRef, useState, useEffect} from 'react';
import './App.css';
import Game from './Game';


const App = () => {
  return <Game
    config={{
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
    }}
  />
};

export default App;
