export interface VO<T> {
  valueOf: () => T;
}

export type VOValidator<T> = (
  value: T,
  add: (error: string) => void
) => string[];

export const createVO = <T>(validator?: VOValidator<T>) => (
  value: T
): VO<T> => {
  const errors: string[] = [];

  validator && validator(value, (error: string) => errors.push(error));

  if (errors.length > 0) {
    throw new Error(errors.join(","));
  }

  return {
    valueOf: () => value
  };
};
