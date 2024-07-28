import React from "react";
import { createRoot } from "react-dom/client";
import Installed from "./Installed";


const root = createRoot(document.getElementById("root") as HTMLElement)
root.render(<Installed />);