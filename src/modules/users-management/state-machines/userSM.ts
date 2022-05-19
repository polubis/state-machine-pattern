// export type UserVOValues =
//   | { key: "idle" }
//   | { key: "loading" }
//   | { key: "loaded"; data: UserVO }
//   | { key: "error" };

// const DEFAULT_VALUE = { key: "idle" } as UserVOValues;

// export const userVO = (value = DEFAULT_VALUE) => {
//   return {
//     idle: () => userVO(DEFAULT_VALUE),
//     loading: () => userVO({ key: "loading" }),
//     loaded: (data: User) => userVO({ key: "loaded", data }),
//     error: () => userVO({ key: "error" }),
//     valueOf: () => value
//   };
// };

// export interface State {
//   key: string;
// }

// interface IdleState {
//   key: "idle";
// }

// export type StateMachineConfig<S extends State> = {
//   [K in keyof S]: void;
// }

// const createSM = <C extends StateMachineConfig>(config: StateMachineConfig<S>) => {};

import { User } from "../services";

type Obj = {
  [key: string]: (() => void) | ((data: any) => any);
};

type GetFirstArgumentOfAnyFunction<T> = T extends (
  first: infer FirstArgument,
  ...args: any[]
) => any
  ? FirstArgument
  : never;

type Predicate<C extends Obj> = {
  [K in keyof C]?: keyof C | (keyof C)[];
};

type State<C extends Obj> = {
  [K in keyof C]: C[K] extends () => void
    ? { key: K }
    : {
        key: K;
        data: GetFirstArgumentOfAnyFunction<C[K]>;
      };
};

export const SM = <C extends Obj, K extends { key: keyof C; data?: any }>(
  config: C,
  initState: State<C>[K["key"]]
) => {
  return (...predicates: Predicate<C>[]) => {
    const next = (currentState: State<C>[K["key"]]) => {
      const enhancedConfig = Object.entries(
        config
      ).reduce((acc, [key, fn]) => {}, {});

      return {
        ...config,
        get: <CK extends keyof C>(key: CK) => initState as State<C>[CK],
        is: <CK extends keyof C>(key: CK) => key === initState.key
      };
    };

    return next(initState);
  };
};

const test = {
  idle: () => {},
  loading: () => {},
  loaded: (data: User) => data,
  loaded2: (data: { id: number }) => data,
  error: () => {}
};

const userSM = SM(test, { key: "idle" })(
  { idle: "loading" },
  { loading: ["loaded", "error"] },
  { loaded: "idle" },
  { error: "idle" }
);

type s = GetFirstArgumentOfAnyFunction<typeof test["loaded"]>;

userSM.is("loading");
userSM.get("loaded");
