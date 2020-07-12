import React, { useCallback } from "react";

// hooks
import { useLocalStorage } from "../hooks";

// types
interface ICountContext {
  count?: number;
  increment: () => void;
}

// helpers
const defaultContext: ICountContext = {
  count: 0,
  increment: () => {},
};

export const CountContext = React.createContext(defaultContext);

// primary component
export const CountContextProvider: React.FC = ({ children }) => {
  const [count, setCount] = useLocalStorage("count", 0);
  const increment = useCallback(
    () => setCount(count === undefined ? 0 : count + 1),
    [count]
  );

  return (
    <CountContext.Provider
      value={{
        count,
        increment,
      }}
    >
      {children}
    </CountContext.Provider>
  );
};
