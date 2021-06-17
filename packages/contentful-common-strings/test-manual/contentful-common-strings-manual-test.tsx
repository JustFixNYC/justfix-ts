import React from "react";
import ReactDOM from "react-dom";
import { getHTMLElement } from "@justfixnyc/util";

const container = getHTMLElement("div", "#root");
const el = ReactDOM.render(
  <div>
    <h1>Components</h1>
    <p>TODO: Put stuff here!</p>
  </div>,
  container
);
