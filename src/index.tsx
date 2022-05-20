import * as React from "react";
import { useState } from "react";
import { render } from "react-dom";
import { delay, EMPTY, of, Subject, switchMap, tap } from "rxjs";
import { ExpressComponent } from "./final/express-component";

import { Start } from "./final/coffee-express-state-machine";

import "./index.css";

const useExpress = () => {
  const start = React.useMemo(() => new Subject<void>(), []);
  const start$ = React.useMemo(() => start.asObservable(), []);

  const [state, setState] = useState(Start());

  const turnOn = () => {
    start.next();
  };

  React.useEffect(() => {
    const sub = start$
      .pipe(
        switchMap(() =>
          of(EMPTY).pipe(
            tap(() => {
              setState((state) =>
                state.key === "idle" ? state.PowerOn() : state
              );
            }),
            delay(1000),
            tap(() => {
              setState((state) =>
                state.key === "powerOn" ? state.Graining() : state
              );
            }),
            delay(2000),
            tap(() => {
              setState((state) =>
                state.key === "graining" ? state.Warming(80) : state
              );
            }),
            delay(2000),
            tap(() => {
              setState((state) =>
                state.key === "warming" ? state.Making() : state
              );
            }),
            delay(4000),
            tap(() => {
              setState((state) =>
                state.key === "warming" ? state.Making() : state
              );
            }),
            delay(1000),
            tap(() => {
              setState((state) =>
                state.key === "making" ? state.Done() : state
              );
            }),
            delay(1000),
            tap(() => {
              setState((state) =>
                state.key === "done" ? state.Idle() : state
              );
            })
          )
        )
      )
      .subscribe();

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
    <div className="container">
      <ExpressComponent
        arrowRotates={state.key !== "idle" && state.key !== "done"}
        redDot={state.key === "graining"}
        yellowDot={state.key === "warming"}
        greenDot={state.key === "making"}
        animateCoffee={state.key === "making"}
      />

      <button
        className="make-coffee-btn"
        disabled={state.key !== "idle"}
        onClick={turnOn}
      >
        START
      </button>
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
