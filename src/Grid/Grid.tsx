import React, {useMemo} from 'react';
import './Grid.css';

type GridProps<T> = {
  width: number;
  height: number;
  isFilled: (x: number, y: number) => boolean;
};


const Grid = <T extends unknown>({width, height, isFilled}: GridProps<T>) => {
  const rows = useMemo(() => new Array(height).fill(null), [height]);
  const cells = useMemo(() => new Array(width).fill(null), [width]);

  return (
    <div className="grid">
        {rows.map((_, y) => {
          return <div key={y} className="grid-row">
            {cells.map((_, x) => {
              return <div key={`${x}-${y}`} className={`grid-cell ${isFilled(x, y) ? "filled" : ""}`}></div>
            })}
          </div>
        })}

        {/* <div className="grid-container"> */}
            {/* {gridMatrix.map((row: Array<T>, rowIdx: number) => {
                return <div key={`${rowIdx}`} className="grid-container-item">
                  {row.map((item: T) => {
                    const key = keyFunction(item);
                    const snakePart = snakeHere(x, y);

                    // console.log('GRID-ITEM:', key, snakePart, item)

                    return <div key={key} className={`grid-item ${snakePart ? 'snake-spot' : ''}`}></div>
                  })}
                </div>
            })} */}
        {/* </div> */}
    </div>
  );
}

export default Grid;
