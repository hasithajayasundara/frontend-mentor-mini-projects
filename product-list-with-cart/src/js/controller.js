import { data } from './mocks/data';
import { state } from './model';
import { mapProducts } from './helpers';
import productView from './views/productView';
import cartView from './views/cartView';

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
    cartView.render();
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
  console.log(state);
  productView.render(state);
};

const init = () => {
  productView.addHandlerRender(controlProducts);
  productView.addHandlerAddToCart(controlAddToCart);
};

init();
