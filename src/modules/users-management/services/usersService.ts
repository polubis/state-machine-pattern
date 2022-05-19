import { User, UserId } from "./models";

const PATH = "https://jsonplaceholder.typicode.com/users";

export const usersService = {
  get: {
    users: (): Promise<User[]> => {
      return fetch(PATH).then((response) => response.json());
    },
    user: (id: UserId): Promise<User> => {
      return fetch(PATH + "/" + id).then((response) => response.json());
    }
  }
};
