import { ChangeEvent, useMemo, useState } from "react";
import { User } from "../services/models";

const filterUsers = (users: User[], query: string): User[] => {
  if (query === "") {
    return users;
  }

  const regExp = new RegExp(query);

  return users.filter((user) => regExp.test(user.username.toLowerCase()));
};

export const useUsersFilter = (users: User[]) => {
  const [query, setQuery] = useState("");

  const triggerUsersFilter = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const filteredUsers = useMemo(() => filterUsers(users, query), [
    users,
    query
  ]);

  return [query, filteredUsers, triggerUsersFilter] as const;
};
