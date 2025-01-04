import { data } from './mocks/data';
import * as model from './model';

import productView from './views/productView';
import cartView from './views/cartView';
import orderConfirmedView from './views/orderConfirmedView';

export const getProducts = async () => new Promise((resolve) => {
  setTimeout(() => {
    model.setProducts(data);
    resolve();
  }, 2000);
});

const controlProducts = async () => {
  try {
    // Render spinner
    productView.renderSpinner();

    // Get products(desserts)
    await getProducts();

    // Render product view
    productView.render(model.state);

    // Render cart view
    cartView.render(model.state);
  } catch (err) {
    console.log(err);
  }
};

const controlAddToCart = (id) => {
  model.addToCart(id);
  productView.render(model.state);
  cartView.render(model.state);
};

const controlChangeCart = (id, operation) => {
  model.changeCart(id, operation);
  productView.render(model.state);
  cartView.render(model.state);
};

const controlRemoveCartItem = (id) => {
  model.removeCartItem(id);
  productView.render(model.state);
  cartView.render(model.state);
};

const controlConfirmOrder = () => {
  orderConfirmedView.render(model.state);
};

const controlStartNewOrder = () => {
  model.resetState();
  productView.render(model.state);
  cartView.render(model.state);
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
