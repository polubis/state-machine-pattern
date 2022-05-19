import React from "react";

import { User } from "../../services";

import "./UserDetailsComponent.css";

interface UserDetailsComponentProps {
  data: User;
  onClick: () => void;
}

export function UserDetailsComponent({
  data,
  onClick
}: UserDetailsComponentProps) {
  return (
    <div className="user-details" onClick={onClick}>
      {data && <h1>{data.username}</h1>}
    </div>
  );
}
