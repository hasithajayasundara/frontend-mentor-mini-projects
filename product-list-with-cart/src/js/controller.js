import productView from './views/productView';

import { state } from './model';

import { data } from './mocks/data';

export const getProducts = async () => new Promise((resolve) => {
  setTimeout(() => {
    state.products = data;
    resolve();
  }, 3000);
});

const controlProducts = async () => {
  try {
    await getProducts();
    productView.render(state.products);
  } catch (err) {
    console.log(err);
  }
};

const init = () => {
  productView.addHandlerRender(controlProducts);
};

init();
