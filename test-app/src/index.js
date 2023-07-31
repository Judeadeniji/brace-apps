import './index.css';
import { Mount } from "brace-js";
import { createRouter, beforeRoute, RouteOutlet, taskToProps, useLoader } from "brace-js/router";

function delay() {
  return new Promise(r => {
    setTimeout(function() {
      r({})
    }, 5000);
  })
}

const signalPage = taskToProps(delay)(async () => {
  return await import("@pages/paginateWithSignals");
});

createRouter([
  {
    path: "/",
    component: () => import("./app")
  },
  {
    path: "/client-actions",
    component: () => import("@pages/clientActions")
  },
  {
    path: "/page-without-signal",
    component: () => import("@pages/paginateWithoutSignals")
  },
  {
    path: "/page-with-reactive",
    component: () => import("@pages/paginateWithReactive")
  },
  {
    path: "/page-with-signal",
    component: () => signalPage,
  },
]);

beforeRoute(({ resolve, reject }) => {
  resolve();
});

/*
useLoader(() => (
  <div class="bg-white left-0 right-0 top-0 fixed h-screen w-screen m-0 mx-auto z-50 flex items-center justify-center text-[#3b3b3b]">
    <loader class="touch-none">
      <p class="text-xl md:text-2xl font-bold animate-pulse">The</p>
      <h1 class="leading-[1.75rem] md: leading-[2rem] md:8xl animate-pulse text-4xl font-extrabold">Test.</h1>
    </loader>
  </div>
))
*/

Mount(() => <RouteOutlet />, document.querySelector("#root"));

