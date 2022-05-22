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

// Now it looks like that
function Idle() {
  return State("idle", { progress: 0 }, { PowerOn });
}

// Before
function PowerOn() {
  return {
    key: "powerOn" as const,
    progress: 0
  };
}

// Also instead of exporting all states
// you can create facade to hide implementation details
export function Start() {
  return Idle();
}
