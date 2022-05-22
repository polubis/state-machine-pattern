/* eslint-disable @typescript-eslint/no-use-before-define */
// Function declarations are hoisted so it's safe

type Temperature = number;

function Idle() {
  return {
    key: "idle" as const,
    progress: 0,
    PowerOn
  };
}

function PowerOn() {
  return {
    key: "powerOn" as const,
    progress: 0,
    Graining
  };
}

function Graining() {
  return {
    key: "graining" as const,
    progress: 20,
    Warming
  };
}

function Warming(data: Temperature) {
  return {
    key: "warming" as const,
    data,
    progress: 40,
    Making
  };
}

function Making() {
  return {
    key: "making" as const,
    progress: 75,
    Done
  };
}

function Done() {
  return {
    key: "done" as const,
    progress: 100,
    Idle
  };
}

// Creating union type for 100% typesafety.
const STATES = [Idle, PowerOn, Graining, Warming, Making, Done] as const;
export type CoffeeExpressState = ReturnType<typeof STATES[number]>;

// Less code, easier to implement next state.
Idle().PowerOn().Graining().Warming(100).Making().Done();
