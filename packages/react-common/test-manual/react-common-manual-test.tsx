import React from "react";
import ReactDOM from "react-dom";
import { CovidMoratoriumBanner } from "../src";
import { getHTMLElement } from "@justfixnyc/util";

const container = getHTMLElement("div", "#root");
const el = ReactDOM.render(
  <div>
    <h1>Components</h1>
    <h2>COVID Moratorium Banner</h2>
    <h3>English Version (Default):</h3>
    <CovidMoratoriumBanner />
    <h3>Spanish Version:</h3>
    <CovidMoratoriumBanner locale="es" />
  </div>,
  container,
);
