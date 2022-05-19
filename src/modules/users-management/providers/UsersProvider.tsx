import React from "react";
import { ReactNode, useMemo } from "react";
import { createContext, useContext } from "react";
import { useUserFacade, useUsersFacade } from "../facades";

interface UsersFeatureContext {
  userFacade: ReturnType<typeof useUserFacade>;
  usersFacade: ReturnType<typeof useUsersFacade>;
}

const Context = createContext<UsersFeatureContext | null>(null);

interface UsersProviderProps {
  children: ReactNode;
}

export const UsersProvider = ({ children }: UsersProviderProps) => {
  const userFacade = useUserFacade();
  const usersFacade = useUsersFacade();

  const value = useMemo(
    () => ({
      userFacade,
      usersFacade
    }),
    [userFacade, usersFacade]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useUsersProvider = () => {
  const ctx = useContext(Context);

  if (!ctx) throw new Error("Lack of provider");

  return ctx;
};
