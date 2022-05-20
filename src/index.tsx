import * as React from "react";
import { useState } from "react";
import { render } from "react-dom";
import { mergeMap, Subject } from "rxjs";
import { ExpressComponent } from "./final/express-component";

import { Start } from "./final/coffee-express-state-machine";

import "./index.css";

const useExpress = () => {
  const start = React.useMemo(() => new Subject<void>(), []);
  const start$ = React.useMemo(() => start.asObservable(), []);

  const [state, setState] = useState(Start());

  const turnOn = () => {
    setState((state) => {
      return state.key === "idle" ? state.PowerOn() : state;
    });
  };

  // Klikam po 3 sekundach sie wlaczy

  React.useEffect(() => {
    const sub = start$.pipe().subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return {
    state,
    turnOn
  };
};

function App() {
  const { state, turnOn } = useExpress();

  return (
    <div className="container" onClick={() => turnOn()}>
      <ExpressComponent />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
