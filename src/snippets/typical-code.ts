class CoffeExpress {
  making = false;
  done = false;
  graining = false;
  on = false;

  turnOn = (): void => {
    if (!this.making && !this.graining && !this.done) {
      this.on = true;
      return;
    }

    throw new Error("Cannot turn on");
  };

  startMaking = (): void => {
    if (this.on && !this.making && !this.graining && !this.done) {
      this.making = true;
      return;
    }

    throw new Error("Unable to make coffe");
  };
}

const express1 = new CoffeExpress();

express1.turnOn();
express1.startMaking(); // OK

const express2 = new CoffeExpress();

express2.startMaking(); // Error
