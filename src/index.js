import React from "react";
import ReactDOM from "react-dom";
import Header from "./navbar.js";
import "./index.css";
import Form from "./form.js";

ReactDOM.render(
  <div>
    <Header />
    <Form />
  </div>,
  document.querySelector("#root")
);
