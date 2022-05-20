/* eslint-disable @typescript-eslint/no-use-before-define */

export type Temperature = number;

export type CoffeeExpressState =
  | ReturnType<typeof Idle>
  | ReturnType<typeof PowerOn>
  | ReturnType<typeof Graining>
  | ReturnType<typeof Warming>
  | ReturnType<typeof Making>
  | ReturnType<typeof Done>;

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

export function Start(): CoffeeExpressState {
  return Idle();
}
