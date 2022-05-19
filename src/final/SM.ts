type GetFirstArgumentOfAnyFunction<T> = T extends (
  first: infer FirstArgument,
  ...args: any[]
) => any
  ? FirstArgument
  : never;

type Obj = {
  [key: string]: (() => void) | ((data: unknown) => void);
};

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

interface StateMachine<
  C extends Obj,
  K extends { key: keyof C; data?: unknown }
> {
  get: () => State<C>[K["key"]];
  is: <CK extends keyof C>(key: CK) => boolean;
}

type PickNextFunctionSignature<S, R> = S extends { key: string; data: infer D }
  ? (data: D) => R
  : () => R;

type NextReturn<C extends Obj, K extends { key: keyof C; data?: unknown }> = {
  [Key in keyof C]: PickNextFunctionSignature<
    State<C>[Key],
    NextReturn<C, K> & StateMachine<C, K>
  >;
};

// State machine factory
export const SM = <C extends Obj, K extends { key: keyof C; data?: unknown }>(
  config: C,
  initState: State<C>[K["key"]]
) => {
  return (...predicates: Predicate<C>[]) => {
    let currentState = initState;

    const next = () => {
      const entries = Object.keys(config) as (keyof C)[];
      const enhancedConfig = {} as NextReturn<C, K>;

      entries.forEach((key) => {
        enhancedConfig[key] = (data?: unknown) => {
          const newState = { key } as State<C>[K["key"]];

          if (data !== undefined) {
            (newState as any).data = data;
          }

          currentState = newState;

          return next();
        };
      });

      return {
        ...enhancedConfig,
        get: () => currentState,
        is: <CK extends keyof C>(key: CK) => key === initState.key
      };
    };

    return next();
  };
};
