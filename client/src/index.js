// Data Layer Control (Redux) (data layer)
import "materialize-css/dist/css/materialize.min.css";

import React from "react";
import ReactDOM from "react-dom";
//import { Provider } from "react-redux";
//import { createStore, applyMiddleware } from "redux";
//import reduxThunk from "redux-thunk";

import App from "./components/App";
import Sat from "./components/Sat";
//import reducers from "./reducers";

//const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  //<Provider store={store}>
  //{" "}
  <App />,
  //</Provider>,
  //document.querySelector("#root")

  //<Sat />,
  document.getElementById("root")
);
