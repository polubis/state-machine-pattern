import { useState } from "react";
import { usersService } from "../services";
import { usersVO } from "../value-objects";

export const useUsersFacade = () => {
  const [users, setUsers] = useState(usersVO());

  const load = () => {
    (async () => {
      setUsers(users.loading());
      try {
        setUsers(users.loaded(await usersService.get.users()));
      } catch {
        setUsers(users.error());
      }
    })();
  };

  return {
    users: users.valueOf(),
    load
  };
};
