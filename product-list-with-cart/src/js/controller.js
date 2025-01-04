import { data } from './mocks/data';
import { state } from './model';
import { mapProducts } from './helpers';
import {
  CART_OPERATION_DECREMENT,
  CART_OPERATION_INCREMENT
} from './constants';

import productView from './views/productView';
import cartView from './views/cartView';
import orderConfirmedView from './views/orderConfirmedView';

export const getProducts = async () => new Promise((resolve) => {
  setTimeout(() => {
    const { productMap, productIds } = mapProducts(data);
    state.products = { byId: productMap, allIds: productIds };
    resolve();
  }, 1000);
});

const controlProducts = async () => {
  try {
    // Render spinner
    productView.renderSpinner();

    // Get products(desserts)
    await getProducts();

    // Render product view
    productView.render(state);

    // Render cart view
    cartView.render(state);
  } catch (err) {
    console.log(err);
  }
};

const controlAddToCart = (id) => {
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

  productView.render(state);
  cartView.render(state);
};

const controlChangeCart = (id, operation) => {
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

    productView.render(state);
    cartView.render(state);
  }
};

const controlRemoveCartItem = (id) => {
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

    productView.render(state);
    cartView.render(state);
  }
};

const controlConfirmOrder = () => {
  orderConfirmedView.render(state);
};

const controlStartNewOrder = () => {
  state.cart.totalPrice = 0;
  state.cart.totalItems = 0;
  state.cart.items.allIds = [];
  state.cart.items.byId = new Map();
  productView.render(state);
  cartView.render(state);
};

const init = () => {
  productView.addHandlerRender(controlProducts);
  productView.addHandlerAddToCart(controlAddToCart);
  productView.addHandlerChangeCart(controlChangeCart);
  cartView.addHandlerRemoveItem(controlRemoveCartItem);
  cartView.addHandlerConfirmOrder(controlConfirmOrder);
  orderConfirmedView.addHandlerStartNewOrder(controlStartNewOrder);
};

init();
