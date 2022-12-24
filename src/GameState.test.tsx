import {act} from 'react-dom/test-utils';
import { GameState } from "./GameState";
import { LinkedNode } from './utils';


const GameStateClass = new GameState();

describe('GameState', function () {
    it('snake did 3 steps down', function () {
        GameStateClass.Tick();
        GameStateClass.Tick();

        expect(JSON.stringify(GameStateClass.gameState.current.snakeList.head!.data)).toBe(JSON.stringify({ x: 0, y: 2 }));
    });
});