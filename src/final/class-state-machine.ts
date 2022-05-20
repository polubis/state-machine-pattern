class State<K extends string> {
  constructor(public key: K) {}
}

export class Loaded<D> extends State<"loaded"> {
  constructor(public data: D) {
    super("loaded");
  }

  // Class declarations in JS are not hoisted it's danger
  asIdle = () => new Idle();
}

export class LoadFail extends State<"loadFail"> {
  constructor() {
    super("loadFail");
  }

  // Class declarations in JS are not hoisted it's danger
  asIdle = () => new Idle();
}

export class Loading extends State<"loading"> {
  constructor() {
    super("loading");
  }

  asLoaded = <D>(data: D) => new Loaded(data);
  asLoadFail = () => new LoadFail();
}

export class Idle extends State<"idle"> {
  constructor() {
    super("idle");
  }

  asLoading = () => new Loading();
}
