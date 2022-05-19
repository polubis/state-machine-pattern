import * as React from "react";
import { render } from "react-dom";

import { UsersManagementModule } from "./modules/users-management";

function App() {
  return <UsersManagementModule />;
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
