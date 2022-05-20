/* eslint-disable @typescript-eslint/no-use-before-define */

interface Stateable {
  key: string;
}

type Data<D> = {
  [K in keyof D]: D[K];
};

type Fn = (...args: any[]) => Stateable;

type Fns<F> = {
  [K in keyof F]: Fn;
};

export type Temperature = number;

function State<K extends string, D extends Data<D>, F extends Fns<F>>(
  key: K,
  data: D,
  fns: F
) {
  return {
    ...fns,
    ...data,
    key
  };
}

function Idle() {
  return State("idle", { progress: 0 }, { PowerOn });
}

function PowerOn() {
  return State("powerOn", { progress: 0 }, { Graining });
}

function Graining() {
  return State("graining", { progress: 20 }, { Warming });
}

function Warming(data: Temperature) {
  return State("warming", { progress: 40, data }, { Making });
}

function Making() {
  return State("making", { progress: 75 }, { Done });
}

function Done() {
  return State("done", { progress: 100 }, { Idle });
}

const STATES = [Idle, PowerOn, Graining, Warming, Making, Done] as const;
export type CoffeeExpressState = ReturnType<typeof STATES[number]>;

export function Start(): CoffeeExpressState {
  return Idle();
}
