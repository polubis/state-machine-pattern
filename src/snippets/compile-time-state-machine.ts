export type State<K extends string, D = undefined> = D extends undefined
  ? { key: K }
  : { key: K } & D;

export class Coffe {
  constructor(public temperature: number) {}
}

export type Idle = State<"idle">;
export type PowerOn = State<"power_on">;
export type Graining = State<"graining">;
export type Warming = State<"warming">;
export type Making = State<"making">;
export type Done = State<"done", { coffe: Coffe }>;

export type CoffeExpressState =
  | Idle
  | PowerOn
  | Graining
  | Warming
  | Making
  | Done;
