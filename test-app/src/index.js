import './index.css';
import { Mount } from "brace-js";
import { createRouter, ErrorBoundary, RouteOutlet } from "brace-js/router";

createRouter([
  {
    path: "/",
    component: () => import("./app")
  }
])

Mount(() => <RouteOutlet />, document.querySelector("#root"));

