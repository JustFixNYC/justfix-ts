import React from "react";
import ReactDOM from "react-dom";
import { CovidMoratoriumBanner } from "../src";

describe("Moratorium Banner ", () => {
  let container: any;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);
  });

  test("renders English text by default", () => {
    ReactDOM.render(<CovidMoratoriumBanner />, container);
    expect(container.innerHTML).toContain("Eviction protections");
  });

  test("renders Spanish for 'es' locale specified", () => {
    ReactDOM.render(<CovidMoratoriumBanner locale="es" />, container);
    expect(container.innerHTML).toContain("Protecciones de desalojo");
  });

  test("falls back on English for unknown locales", () => {
    ReactDOM.render(<CovidMoratoriumBanner locale="tr" />, container);
    expect(container.innerHTML).toContain("Eviction protections");
  });
});
