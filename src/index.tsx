import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// import ReactDOM from "react-dom";
// import "./index.scss";
// import App from "./App";
// import { Provider } from "react-redux";
// import store from "./store/counterReducer";

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById("root")
// );
