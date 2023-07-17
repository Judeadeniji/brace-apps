import { reactive } from "brace-js";
import { Store } from "utiliti-js";

const SHOW_LOADER = "SHOW_LOADER";
const HIDE_LOADER = "HIDE_LOADER";

function app_reducer(state, action) {
  if (action === SHOW_LOADER) {
    state.value = {...state.value, loading: true}
  }
  if (action === HIDE_LOADER) {
    state.value = {...state.value, loading: false}
  }
  
  return state;
}

const app_store = new Store(app_reducer, reactive({
  loading: true,
}));

export {
  app_store
};