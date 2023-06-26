import './index.css';
import 'boxicons/css/boxicons.min.css';
import App from './app';
import { Mount } from "brace-js";

Mount(() => <App />, document.querySelector("#root"));

