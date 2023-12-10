import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { SearchContextProvider } from "./context/SearchContext";
import { thunk } from 'redux-thunk';  // Corrected import
import { reducers } from './redux/reducers/index';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
      <DarkModeContextProvider>
        <SearchContextProvider>
          <Provider store={store}>
            <App />
          </Provider>
        </SearchContextProvider>
      </DarkModeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);