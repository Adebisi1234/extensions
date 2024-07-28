import React from "react";
import { createRoot } from "react-dom/client";
import Widget from "./Widget";
import './styles.css';


console.log("first")
setTimeout(() => renderWidget())


function renderWidget() {
    const rootEl = document.createElement("div");
    rootEl.id = "widget_root";
    document.body.append(rootEl);
    console.log(document.getElementById("widget_root"))
    const root = createRoot(document.getElementById("widget_root")!);
    root.render(<Widget />);

}
