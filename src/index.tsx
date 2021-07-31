import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./AppRedux";
import { Provider } from "react-redux";
import store from "./store/store";
import AppRedux from "./AppRedux";
// import AppRedux from "./AppRedux";

ReactDOM.render(
  <Provider store={store}>
    <AppRedux />
  </Provider>,
  document.getElementById("root")
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );
