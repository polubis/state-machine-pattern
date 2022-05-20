import * as React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useMemo } from "react";
import { render } from "react-dom";

import {
  Start,
  CoffeeExpressState
} from "./final/coffee-express-state-machine";

const delay = (time: number, cb: () => void) => {
  setTimeout(cb, time);
};

const useExpress = () => {
  const [counter, setCounter] = useState(0);
  const state = useRef(Start());

  const turnOnExpress = () => {
    state.current = state.current.PowerOn();
    setCounter((prevCounter) => prevCounter + 1);
  };

  return {
    key: state.current.key,
    progress: state.current.progress,
    turnOnExpress
  };
};

function App() {
  const { key, progress, turnOnExpress } = useExpress();

  return (
    <div onClick={() => turnOnExpress()}>
      {key}: {progress}
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
