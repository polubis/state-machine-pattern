import React from "react";
import { UsersManagementContainer } from "./containers";
import { UsersProvider } from "./providers";

export function UsersManagementModule() {
  return (
    <UsersProvider>
      <UsersManagementContainer />
    </UsersProvider>
  );
}
