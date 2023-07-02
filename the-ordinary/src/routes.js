import { Component } from "@mejor";
import { createRouter, RouteOutlet, beforeRoute, use404Component,
useErrorComponent, onRoute, History } from "@mejor/router";
import { useTitle } from "@mejor/browser";
import { strings } from "utiliti-js";

const Routes = [
  {
    path: "/",
    component: () => import("@pages/main-page"),
  },
  {
    path: "/catalog/[name]",
    component: () => import("@pages/catalog"),
    children: [
      {
        path: "[id]",
        component: () => import("@pages/product-single"),
      },
    ]
  },
  {
    path: "/blog",
    component: () => import("@pages/blog"),
  },
  {
    path: "/cart",
    component: () => import("@pages/cart"),
    children: [
      {
        path: "[order-number]",
        component: () => import("@pages/checkout"),
      },
    ]
  },
  {
    path: "orders/[order-number]",
    component: () => import('@pages/order-detail'),
   },
];

const { goBack } = History()

use404Component(Component(() => (
  <section class="bg-background w-screen h-screen flex items-center justify-center" key="error-route">
    <div class="text-center px-4 md:px-0">
      <h1 class="mb-2 text-4xl md:text-6x lg:text-8xl font-extrabold text-accent">404 PAGE NOT FOUND</h1>
      <p class="text-gray-500 text-lg">Seems Like You've Clicked on a Broken Link</p>
      <button click$={goBack} class="mx-auto px-4 py-2 mt-6 mx-auto bg-accent
      uppercase text-white text-lg w-full md:w-auto rounded-2xl
      hover:bg-basic transition-colors duration-200 hover:text-accent">go back</button>
    </div>
  </section>
)))

useErrorComponent(Component(() => (
  <section class="bg-background w-screen h-screen flex items-center justify-center" key="error-route">
    <div class="text-center px-4 md:px-0">
      <h1 class="mb-2 text-4xl md:text-6x lg:text-8xl font-extrabold
      text-accent">Oops! Something went wrong.</h1>
      <p class="text-gray-500 text-lg">
        We apologize for the inconvenience. Please try again later.
      </p>
      <button click$={"/"} class="mx-auto px-4 py-2 mt-6 mx-auto bg-accent
      uppercase text-white text-lg w-full md:w-auto sm:rounded-2xl rounded-none
      hover:bg-basic transition-colors duration-200 hover:text-accent">Go Home</button>
    </div>
  </section>
)))

beforeRoute(({ resolve }) => {
  resolve()
});

const { capitalize } = strings;

onRoute(({ pathname, params }) => {
  if (pathname === "/") useTitle("The Ordinary | An E-commerce web app");
  
  if (pathname === "/cart") useTitle("Cart | The Ordinary - An E-commerce web app");
 
  if (pathname.includes("catalog") && !params.id) useTitle(`${capitalize(params?.name)} | The Ordinary - An E-commerce web app `);
  
  if (pathname.includes("catalog") && params.id) useTitle(`${capitalize(params.id)} | The Ordinary - An E-commerce web app `);

})

const start = (additionalRoutes = []) =>
  createRouter([...Routes, ...additionalRoutes]);

export { start, RouteOutlet };
