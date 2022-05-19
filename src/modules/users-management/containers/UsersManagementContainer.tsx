import React, { useEffect } from "react";
import { UsersListComponent, UserDetailsComponent } from "../components";
import { useUsersProvider } from "../providers";

export function UsersManagementContainer() {
  const { usersFacade, userFacade } = useUsersProvider();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(usersFacade.load, []);

  const handleUserClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const { id } = e.currentTarget.dataset;

    if (id !== undefined) {
      userFacade.load(+id);
    }
  };

  return (
    <>
      <UsersListComponent
        loading={usersFacade.users.key === "loading"}
        data={usersFacade.users.key === "loaded" ? usersFacade.users.data : []}
        onClick={handleUserClick}
      />
      {userFacade.user.key === "loaded" && (
        <UserDetailsComponent
          data={userFacade.user.data}
          onClick={userFacade.reset}
        />
      )}
    </>
  );
}
