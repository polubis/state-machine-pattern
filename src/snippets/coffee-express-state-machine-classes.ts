/* eslint-disable @typescript-eslint/no-use-before-define */
// Class declarations in JS are not hoisted it's danger

type Temperature = number;
type Progress = number;

class State<K extends string> {
  constructor(public key: K, public progress: Progress) {}
}

export class Idle extends State<"idle"> {
  constructor() {
    super("idle", 0);
  }

  asPowerOn = () => new PowerOn();
}

export class PowerOn extends State<"powerOn"> {
  constructor() {
    super("powerOn", 0);
  }

  asGraining = () => new Graining();
}

export class Graining extends State<"graining"> {
  constructor() {
    super("graining", 20);
  }

  asWarming = (data: Temperature) => new Warming(data);
}

export class Warming extends State<"warming"> {
  constructor(public data: Temperature) {
    super("warming", 40);
  }

  asMaking = () => new Making();
}

export class Making extends State<"making"> {
  constructor() {
    super("making", 75);
  }

  asMaking = () => new Making();
}

export class Done extends State<"done"> {
  constructor() {
    super("done", 100);
  }

  asIdle = () => new Idle();
}

const state = new Idle(); // { key: 'idle', progress: 0 }
const powerOn = state.asPowerOn(); // { key: 'powerOn', progress: 0 }
const graining = powerOn.asGraining(); // { key: 'graining', progress: 20 }
const warming = graining.asWarming(100); // { key: 'warming, data: 100, progress: 40 }
