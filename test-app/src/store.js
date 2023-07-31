import { reactive } from "@mejor";
import { Store } from "utiliti-js";

export const store = new Store((state, action) => {
  if (action.type == 'SET') {
    state.value = Object.assign(state.value, action.value);
  }
  
  return state;
}, reactive({}));