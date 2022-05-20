/* eslint-disable @typescript-eslint/no-use-before-define */
// Function declaratins are hoisted so it's safe

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

// Same effect as in class based approach.

// Less code, easier to implement next state,
// as benefit state tree on last function hover.
Idle().PowerOn().Graining().Warming(100).Making().Done();
