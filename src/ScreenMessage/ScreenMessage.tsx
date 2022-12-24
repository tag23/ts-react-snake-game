import React, {useMemo} from 'react';
import "./ScreenMessage.css";

type ScreenMessageProps<T> = {
  children: JSX.Element;
};


const ScreenMessage = <T extends unknown>({children}: ScreenMessageProps<T>) => {
  return (
    <div className="screen-message">
        {children}
    </div>
  );
}

export default ScreenMessage;
