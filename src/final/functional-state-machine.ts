/* eslint-disable @typescript-eslint/no-use-before-define */
// Function declaratins are hoisted so it's safe
function Idle() {
  return {
    key: "idle" as const,
    Loading
  };
}

function Loading() {
  return {
    key: "loading" as const,
    Loaded,
    LoadFail
  };
}

function Loaded<D>(data: D) {
  return {
    key: "loaded" as const,
    data,
    Idle
  };
}

function LoadFail() {
  return {
    Idle,
    key: "loadFail" as const
  };
}

// Idle().Loading().LoadFail().Idle().Loading();
