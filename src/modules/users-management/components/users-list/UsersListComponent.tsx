import React from "react";
import { User } from "../../services/models";
import { useUsersFilter } from "../../utils/useUsersFilter";

import "./UsersListComponent.css";

interface UsersListComponentProps {
  className?: string;
  loading: boolean;
  data: User[];
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void;
}

export function UsersListComponent({
  className,
  loading,
  data,
  onClick
}: UsersListComponentProps) {
  const [query, filteredData, filterData] = useUsersFilter(data);

  if (loading) {
    return <div>Loading users...</div>;
  }

  return (
    <ul className={`users-list ${className}`}>
      <input
        value={query}
        placeholder="Type phrase to search..."
        onChange={filterData}
      />
      {filteredData.length === 0 && (
        <div>No results for given phrase {query}</div>
      )}

      {filteredData.map((item, idx) => (
        <li
          key={item.id}
          data-id={item.id}
          style={{
            animationDelay: `${idx * 0.1}s`
          }}
          className="user-list-item"
          onClick={onClick}
        >
          <figure className="user-avatar">
            <img src="https://i.pinimg.com/564x/07/1b/97/071b976984be61fa44c2e9a8d99238ad.jpg" />
          </figure>
          <div className="user-list-item-container">
            <header>
              <span className="username">{item.username}</span>
              <span className="date">{new Date().toDateString()}</span>
            </header>
            <span className="message">{item.address.street}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
