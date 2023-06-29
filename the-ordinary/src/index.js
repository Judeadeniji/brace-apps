import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import { start, RouteOutlet } from './routes';
import App from './app'
import { Mount } from "@mejor";

//Start the Router;
start();

Mount(() => <App Outlet={RouteOutlet} />, document.querySelector("#root"));