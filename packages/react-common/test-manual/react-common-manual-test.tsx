import React from "react";
import ReactDOM from "react-dom";
import { SampleComponent } from "../src";
import { getHTMLElement } from "@justfixnyc/util";

const container = getHTMLElement("div", "#root");
const el = ReactDOM.render(<SampleComponent />, container);
