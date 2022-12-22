import React, {useMemo} from 'react';
import './Grid.css';

type GridProps<T> = {
  width: number;
  height: number;
  isFilled: (x: number, y: number) => string;
};


const Grid = <T extends unknown>({width, height, isFilled}: GridProps<T>) => {
  const rows = useMemo(() => new Array(height).fill(null), [height]);
  const cells = useMemo(() => new Array(width).fill(null), [width]);


  return (
    <div className="grid">
        {rows.map((_, y) => {
          return <div key={y} className="grid-row">
            {cells.map((_, x) => {
              return <div key={`${x}-${y}`} className={`grid-cell ${isFilled(x, y)}`}></div>
            })}
          </div>
        })}
    </div>
  );
}

export default Grid;
