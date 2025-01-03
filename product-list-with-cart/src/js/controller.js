import { data } from './mocks/data';
import { state } from './model';
import { mapProducts } from './helpers';
import productView from './views/productView';

export const getProducts = async () => new Promise((resolve) => {
  setTimeout(() => {
    state.products = mapProducts(data);
    resolve();
  }, 3000);
});

const controlProducts = async () => {
  try {
    productView.renderSpinner();
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
