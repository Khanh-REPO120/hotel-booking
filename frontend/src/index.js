import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { SearchContextProvider } from "./context/SearchContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DarkModeContextProvider>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </DarkModeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
