import React from "react";
import ReactDOM from "react-dom";
import { CovidMoratoriumBanner } from "../src";
import { getHTMLElement } from "@justfixnyc/util";

const container = getHTMLElement("div", "#root");
const el = ReactDOM.render(
  <div>
    <h1>English Version (Default):</h1>
    <CovidMoratoriumBanner />
    <h1>Spanish Version:</h1>
    <CovidMoratoriumBanner locale="es" />
  </div>,
  container,
);
