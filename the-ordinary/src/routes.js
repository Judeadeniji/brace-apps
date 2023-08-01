import { Component } from "@mejor";
import { createRouter, RouteOutlet, beforeRoute, use404Component, useErrorComponent, onRoute, Status, History } from "@mejor/router";
import { useTitle } from "@mejor/browser";
import { strings } from "utiliti-js";
import { get_order } from "@app/services/cart-store";
import { getUniqueCategories, findBySlug } from "@app/services/methods";

let container;

const Routes = [
  {
    path: "/",
    component: () => import("@pages/main-page"),
  },
  {
    path: "/search",
    component: () => import("@pages/search"),
  },
  {
    path: "/catalog",
    component: () => import("@pages/catalog-general"),
    children: [
      {
        path: "[category_name]",
        component: () => import("@pages/catalog"),
        children: [
          {
            path: "[slug]",
            component: () => import("@pages/product-single"),
            guard: ({ params }) => {
              return Boolean(findBySlug(params?.slug))
            }
          },
        ],
        guard: ({ params }) => {
          const hasCategory = [...getUniqueCategories()].map((i) => i.toLowerCase()).includes(params['category_name'].toLowerCase());
          const hasFavorite = params['category_name'].toLowerCase().includes("favorite");
          return Boolean(hasCategory || hasFavorite);
        }
      },
    ]
  },
  {
    path: "/about",
    component: () => import("@pages/about"),
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
    guard: ({ params }) => {
      return Boolean(get_order(`order-${params['order-number']}`))
    }
   },
];

const { goBack } = History();

export const NotFound = Component(() => (
  <section class="bg-background w-screen h-screen flex items-center justify-center" key="error-route">
    <div class="text-center px-4 md:px-0">
      <h1 class="mb-2 text-4xl md:text-6x lg:text-8xl font-extrabold text-accent">404 PAGE NOT FOUND</h1>
      <p class="text-gray-500 text-lg">Seems Like You've Clicked on a Broken Link</p>
      <button click$={goBack} class="mx-auto px-4 py-2 mt-6 mx-auto bg-accent 
      uppercase text-white text-lg w-full md:w-auto rounded-sm
      hover:bg-basic hover:shadow-md transition-colors duration-200 hover:text-accent">go back</button>
    </div>
  </section>
))

use404Component(NotFound)

useErrorComponent(Component(() => (
  <section class="bg-background w-screen h-screen flex items-center justify-center" key="error-route">
    <div class="text-center px-4 md:px-0">
      <h1 class="mb-2 text-4xl md:text-6x lg:text-8xl font-extrabold
      text-accent">Oops! Something went wrong.</h1>
      <p class="text-gray-500 text-lg">
        We apologize for the inconvenience. Please try again later.
      </p>
      <button click$={"/"} class="mx-auto px-4 py-2 mt-6 mx-auto bg-accent
      uppercase text-white text-lg w-full md:w-auto rounded-sm
      hover:bg-basic hover:shadow-md transition-colors duration-200 hover:text-accent">Go Home</button>
    </div>
  </section>
)))

beforeRoute(({ resolve, reject }) => {
  resolve()
});

const { capitalize } = strings;

onRoute(({ pathname, params }) => {
  if (pathname === "/") useTitle("The Ordinary | An E-commerce web app");
  
  if (pathname === "/cart") useTitle("Cart | The Ordinary - An E-commerce web app");
 
  if (pathname.includes("catalog") && !params.slug)
  useTitle(`${capitalize(params?.category_name || 'Catalog')} | The Ordinary - An E-commerce web app `);
  
  if (pathname.includes("catalog") && params.slug)
  useTitle(`${capitalize(params.slug)} | The Ordinary - An E-commerce web app `);

});

const start = (root, additionalRoutes = []) => {
  container = root;
  createRouter([...Routes, ...additionalRoutes]);
}
  
export { start, RouteOutlet };
