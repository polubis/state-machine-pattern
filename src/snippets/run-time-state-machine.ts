import { CoffeExpressState } from "./compile-time-state-machine";

export const StateChange = (state: CoffeExpressState) => {
  return {
    try: (key: CoffeExpressState["key"]) => {
      if (key !== state.key) {
        throw new Error(
          `Invalid state change detected: from: ${state.key}, to: ${key}`
        );
      }

      return;
    }
  };
};

export const CoffeExpressStateMachine = (
  state: CoffeExpressState = { key: "idle" }
) => {
  return {
    powerOn: () => {
      if (state.key !== "idle") {
        throw new Error("Invalid state change detected");
      }

      return CoffeExpressStateMachine({ key: "power_on" });
    },
    graining: () => {
      if (state.key !== "power_on") {
        throw new Error("Invalid state change detected");
      }

      return CoffeExpressStateMachine({ key: "graining" });
    },
    valueOf: () => state
    // ...etc
  };
};

CoffeExpressStateMachine().graining(); // throws and error
CoffeExpressStateMachine().powerOn().graining(); // OK

// On UI

const state = CoffeExpressStateMachine().valueOf();

if (state.key === "graining") {
  // Show spinner
}

if (state.key === "done") {
  // Show success alert
}
