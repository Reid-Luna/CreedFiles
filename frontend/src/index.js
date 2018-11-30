import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./reducers";
import { getRandom, setCurrentUser, setAuthToken } from "./actions";
import jwt_decode from "jwt-decode";

import { BrowserRouter } from "react-router-dom";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

store.dispatch(getRandom());

if (localStorage.creedfiles_jwt) {
  setAuthToken(localStorage.creedfiles_jwt);
  const decoded = jwt_decode(localStorage.creedfiles_jwt);
  store.dispatch(setCurrentUser(decoded));
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
