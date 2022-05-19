import { User } from "../services/models";
import { createVO } from "./createVO";

// export type UsersVOValues =
//   | { key: "idle" }
//   | { key: "loading" }
//   | { key: "loaded"; data: User[] }
//   | { key: "error" };

// const DEFAULT_VALUE = { key: "idle" } as UsersVOValues;

// export const usersVO = (value = DEFAULT_VALUE) => {
//   return {
//     idle: () => usersVO(DEFAULT_VALUE),
//     loaded: (data: User[]) => usersVO({ key: "loaded", data }),
//     loading: () => usersVO({ key: "loading" }),
//     error: () => usersVO({ key: "error" }),
//     valueOf: () => value
//   };
// };

export const usersVo = createVO<User[]>();
