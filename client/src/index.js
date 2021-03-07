import React from "react";
import ReactDOM from "react-dom";
import "./components/index.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import App from "./components/App";
import reducers from "./reducers";

//createStore(reducers, initialState, applyMiddleware)
const store = createStore(reducers, {}, applyMiddleware());

//'Provider' makes store accesible to all other components in app
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
