import { reactive, createData } from "@mejor";
import { getSessionStorage, setSessionStorage } from "@mejor/browser";
import { Store, typeCheck } from "utiliti-js";

// action.type
const CLEAR = "CLEAR";
const ADD = "ADD";
const REMOVE = "REMOVE";
const UPDATE = "UPDATE";
const INCREASE_QUANTITY = "INCREASE_QUANTITY";
const DECREASE_QUANTITY = "DECREASE_QUANTITY";

function cart_reducer(items, action) {
  if (action.type === CLEAR) {
    items.value = [];
    setSessionStorage("cartItems", []);
  }

  if (action.type === ADD) {
    const existingItem = items.value.find(
      (item) => item.id === action.payload.id
    );
    if (existingItem) {
      existingItem.quantity += typeCheck.parseInt(action.payload.quantity);
    } else {
      items.value = [...items.value, action.payload];
    }
    setSessionStorage("cartItems", items.value);
  }

  if (action.type === REMOVE) {
    items.value = items.value.filter((item) => item.id !== action.payload);
    setSessionStorage("cartItems", items.value);
  }

  if (action.type === UPDATE) {
    const { id, updatedData } = action.payload;
    const itemIndex = items.value.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      const updatedItem = {
        ...items.value[itemIndex],
        ...updatedData,
      };

      const updatedItems = [
        ...items.value.slice(0, itemIndex),
        updatedItem,
        ...items.value.slice(itemIndex + 1),
      ];

      items.value = updatedItems;
      setSessionStorage("cartItems", items.value);
    }
  }

  if (action.type === INCREASE_QUANTITY) {
    const { id } = action.payload;
    const itemIndex = items.value.findIndex((item) => item.id === id);

    if (itemIndex !== -1) {
      items.value[itemIndex].quantity++;
    }
    
    items.value = [...items.value];
    setSessionStorage("cartItems", items.value);
  }

  if (action.type === DECREASE_QUANTITY) {
    const { id } = action.payload;
    const itemIndex = items.value.findIndex((item) => item.id === id);

    if (itemIndex !== -1 && items.value[itemIndex].quantity > 1) {
      items.value[itemIndex].quantity--;
    }
    
    items.value = [...items.value];
    setSessionStorage("cartItems", items.value);
  }

  return items;
}

const cartItemsFromStorage = getSessionStorage("cartItems") || [];
const cart = new Store(cart_reducer, reactive(cartItemsFromStorage));

const generateOrderNumber = () => {
  const uniqueId = Math.floor(Math.random() * 1000000000000).toString().padStart(12, '0');
  return "" + uniqueId; // to make sure it's a string, I don't trust JavaScript 😂
};

const get_all_orders = () => getSessionStorage("all-orders") || [];

const create_order = () => {
  const allOrders = new Set(get_all_orders());
  const cartItems = get_cart_items();
  
  // Check if an identical order already exists
  const existingOrderNumber = Array.from(allOrders).find((orderNumber) => {
    const order = get_order(orderNumber);
    return order && arraysEqual(order.items, cartItems);
  });
  
  const orderNumber = existingOrderNumber || generateOrderNumber();
  
  const order = {
    orderNumber,
    items: cartItems,
  };
  
  allOrders.add(orderNumber);
  setSessionStorage(orderNumber, order);
  setSessionStorage("all-orders", Array.from(allOrders));
  
  return order;
};

const arraysEqual = (a, b) => {
  if (a.length !== b.length) {
    return false;
  }
  
  for (let i = 0; i < a.length; i++) {
    if (a[i].id !== b[i].id || a[i].quantity !== b[i].quantity) {
      return false;
    }
  }
  
  return true;
};

const temp_order = createData({});
const silence = { silent: true };

const set_temp_order = (order) => {
  temp_order.set(order, silence)
};

const get_temp_order = () => {
  return temp_order.value;
};

const commit_temp_order = (order_num) => {
  const order = get_temp_order();
  setSessionStorage(`order-${order_num}`, order);
};

const clear_temp_order = () => {
  temp_order.reset(silence);
};

const get_order = (orderNumber) => getSessionStorage(orderNumber);

const get_cart_items = () => cart.getState().value;

const clear_cart = () => cart.dispatch({ type: CLEAR });

const add_to_cart = (product) => {
  cart.dispatch({ type: ADD, payload: product });
};

const remove_from_cart = (productId) => {
  cart.dispatch({ type: REMOVE, payload: productId });
};

const update_cart_item = (productId, updatedData) => {
  cart.dispatch({
    type: UPDATE,
    payload: {
      id: productId,
      updatedData,
    },
  });
};

const increase_item_quantity = (productId) => {
  cart.dispatch({
    type: INCREASE_QUANTITY,
    payload: {
      id: productId,
    },
  });
};

const decrease_item_quantity = (productId) => {
  cart.dispatch({
    type: DECREASE_QUANTITY,
    payload: {
      id: productId,
    },
  });
};

const get_total_cart_items = () => get_cart_items().length;

export {
  get_cart_items,
  clear_cart,
  add_to_cart,
  update_cart_item,
  remove_from_cart,
  increase_item_quantity,
  decrease_item_quantity,
  create_order,
  get_order,
  get_all_orders,
  get_total_cart_items,
  set_temp_order,
  get_temp_order,
  clear_temp_order,
  commit_temp_order
};
