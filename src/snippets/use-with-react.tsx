import { useState } from "react";
import { Start } from "../final/coffee-express-state-machine";

const useExpress = () => {
  const [state, setState] = useState(Start());

  const turnOn = () => {
    setState((prevState) =>
      prevState.key === "idle" ? prevState.PowerOn() : state
    );
  };

  return {
    state,
    turnOn
  };
};
