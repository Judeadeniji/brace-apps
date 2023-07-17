import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import { start, RouteOutlet } from './routes';
import App from './app'
import { Mount } from "@mejor";

const root = document.querySelector("#root")
//Start the Router;
start(root, []);

Mount(() => <App Outlet={RouteOutlet} />,  root);