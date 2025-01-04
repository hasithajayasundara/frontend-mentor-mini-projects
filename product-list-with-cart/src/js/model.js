import { CART_OPERATION_DECREMENT, CART_OPERATION_INCREMENT } from "./constants";
import { mapProducts } from "./helpers";

export const state = {
  products: {
    byId: new Map(),
    allIds: [],
  },
  cart: {
    totalPrice: 0,
    totalItems: 0,
    items: {
      byId: new Map(),
      allIds: [],
    },
  },
};

export const setProducts = (data) => {
  const { productMap, productIds } = mapProducts(data);
  state.products = { byId: productMap, allIds: productIds };
};

export const addToCart = (id) => {
  const cartItemsById = state.cart.items.byId;
  if (cartItemsById.has(id)) {
    const quantity = cartItemsById.get(id);
    cartItemsById.set(id, quantity + 1);
  } else {
    state.cart.items.allIds.push(id);
    cartItemsById.set(id, 1);
  }

  // Calculate total price
  const product = state.products.byId.get(id);
  const quantity = cartItemsById.get(id);
  state.cart.totalItems += 1;
  state.cart.totalPrice += (product.price * quantity);
};

export const changeCart = (id, operation) => {
  const cartItemsById = state.cart.items.byId;
  const product = state.products.byId.get(id);

  if (cartItemsById.has(id)) {
    const quantity = cartItemsById.get(id);
    if (operation === CART_OPERATION_DECREMENT) {
      cartItemsById.set(id, quantity - 1);
      state.cart.totalItems -= 1;
      state.cart.totalPrice -= product.price;
    } else if (operation === CART_OPERATION_INCREMENT) {
      cartItemsById.set(id, quantity + 1);
      state.cart.totalItems += 1;
      state.cart.totalPrice += product.price;
    }

    // After updating if the quantity is 0 remove it from cart items map
    if (cartItemsById.get(id) === 0) {
      cartItemsById.delete(id);
      state.cart.items.allIds = state.cart.items.allIds.filter((i) => i !== id);
    }
  }
};

export const removeCartItem = (id) => {
  const cartItemsById = state.cart.items.byId;
  if (cartItemsById.has(id)) {
    const product = state.products.byId.get(id);
    const quantity = cartItemsById.get(id);

    // Remove item from cart
    cartItemsById.delete(id);
    state.cart.items.allIds = state.cart.items.allIds.filter((i) => i !== id);

    // Modify total price
    state.cart.totalPrice -= (quantity * product.price);

    // Modify items count
    state.cart.totalItems -= quantity;
  }
};

export const resetState = () => {
  state.cart.totalPrice = 0;
  state.cart.totalItems = 0;
  state.cart.items.allIds = [];
  state.cart.items.byId = new Map();
};
