import { Component } from "@mejor";
import { createRouter, RouteOutlet, beforeRoute, use404Component, History } from "@mejor/router";

const Routes = [
  {
    path: "/",
    component: () => import("@pages/main-page"),
  },
  {
    path: "/catalog",
    component: () => import("@pages/catalog"),
    children: [
      {
        path: "[name]",
        component: () => <h1>Hello </h1>
      }
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
        path: "/checkout",
        component: () => import("@pages/checkout"),
      },
    ]
  },
  {
    path: "/catalog/[name]/[id]",
    component: () => import("@pages/product-single"),
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

beforeRoute(({ resolve }) => {
  resolve()
})

const start = (additionalRoutes = []) =>
  createRouter([...Routes, ...additionalRoutes]);

export { start, RouteOutlet };
