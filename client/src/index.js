import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
