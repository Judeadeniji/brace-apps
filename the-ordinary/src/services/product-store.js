import { reactive, env } from "@mejor";
import { beforeLayoutPaint, Status } from "@mejor/router";
import { Store, array, object } from "utiliti-js";
import { app_store } from "./app-store";
import http from "./http-client";

const host = env() === "development" ? "http://localhost:8123/api" : "/api";
const { forEach } = array;
const { extendObject: _extend } = object;

// Action types
const SET_FAVORITE = "SET_FAVORITE";
const SET_VIEWED = "SET_VIEWED";
const ADD_PRODUCT = "ADD_PRODUCT";
const REMOVE_PRODUCT = "REMOVE_PRODUCT";

function products_reducer(state, action) {
  if (action.type === SET_FAVORITE) {
    const favoriteId = action.payload;
    const newProducts = state.value.map(product => {
      if (product.id === favoriteId) {
        product.isFavorite = !product.isFavorite;
      }
      return product;
    });
    state.value = [...newProducts];
  }
  
  if (action.type === SET_VIEWED) {
    const id = action.payload;
    const newProducts = state.value.map(product => {
      if (product.id === id) {
        product.viewed = true;
      }
      return product;
    });
    state.value = [...newProducts];
  }

  if (action.type === ADD_PRODUCT) {
    const newProducts = [...state.value, action.payload];
    state.value = newProducts;
  }

  if (action.type === REMOVE_PRODUCT) {
    const productId = action.payload;
    const newProducts = state.value.filter(product => product.id !== productId);
    state.value = newProducts;
  }

  return state;
}

const prods = reactive([]);

const products_store = new Store(products_reducer, prods);

beforeLayoutPaint(async () => {
  app_store.dispatch("SHOW_LOADER");
  try {
    const response = await http.get(`${host}/products`);
    const products = await response.json();
    forEach(products, async (item) => {
      const imgPromise = await
      http.get(`${host}/image?q=${item.product_title}`);
      const images = await imgPromise.json();
        
      _extend(item, {
        variant: item.variant || [],
        isFavorite: false,
        viewed: false,
        image: !images.error ? images.response[5] : item.image
      });
    });
    
    prods.value = products;
  } catch (e) {
    app_store.dispatch("HIDE_LOADER");
  }
});

Status.subscribe(({ statusCode }) => {
  const isLoading = app_store.getState().value.loading;
  
  if (isLoading && (statusCode === 404 || statusCode === 201)) {
    setTimeout(function() {
      app_store.dispatch("HIDE_LOADER");
    }, 300);
  };
});

const set_favorite = (favoriteId) => products_store.dispatch({ type: SET_FAVORITE, payload: favoriteId });

const get_favorites = () => products_store.getState().value.filter(product => product.isFavorite);

const get_recently_viewed = () => {
  const unique = [];
  
  const recents = products_store.getState().value.filter((product => product.viewed)).reverse().slice(0, 10);
  
  forEach(recents, (r) => {
    const exists = unique.find(i => i.id === r.id);
    
    if (!exists) unique.push(r);
  });
  
  return Array.from(unique);
};


const set_recently_viewed = (id) => products_store.dispatch({ type:SET_VIEWED, payload: id });

const get_products = () => products_store.getState().value;

const add_product = (product) => products_store.dispatch({ type: ADD_PRODUCT, payload: product });

const remove_product = (productId) => products_store.dispatch({ type: REMOVE_PRODUCT, payload: productId });


export {
  set_favorite,
  get_favorites,
  get_recently_viewed,
  set_recently_viewed,
  add_product,
  remove_product,
  get_products,
};
