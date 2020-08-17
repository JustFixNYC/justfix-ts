import React from "react";
import ReactDOM from "react-dom";
import { CovidMoratoriumBanner } from "../src";

test("Moratorium Banner renders English text by default", () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  try {
    ReactDOM.render(<CovidMoratoriumBanner />, container);
    expect(container.innerHTML).toContain("COVID-19 Update:");
  } finally {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  }
});

test("Moratorium Banner renders Spanish for 'es' locale specified", () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  try {
    ReactDOM.render(<CovidMoratoriumBanner locale="es" />, container);
    expect(container.innerHTML).toContain("Actualización COVID-19:");
  } finally {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  }
});

test("Moratorium Banner falls back on English for unknown locales", () => {
  const container = document.createElement("div");
  document.body.appendChild(container);
  try {
    ReactDOM.render(<CovidMoratoriumBanner locale="tr" />, container);
    expect(container.innerHTML).toContain("COVID-19 Update:");
  } finally {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  }
});
