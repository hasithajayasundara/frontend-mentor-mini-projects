import { data } from './mocks/data';
import { state } from './model';
import { mapProducts } from './helpers';
import productView from './views/productView';
import cartView from './views/cartView';

export const getProducts = async () => new Promise((resolve) => {
  setTimeout(() => {
    state.products = mapProducts(data);
    resolve();
  }, 3000);
});

const controlProducts = async () => {
  try {
    // Render spinner
    productView.renderSpinner();

    // Get products(desserts)
    await getProducts();

    // Render product view
    productView.render(state.products);

    // Render cart view
    cartView.render();
  } catch (err) {
    console.log(err);
  }
};

const init = () => {
  productView.addHandlerRender(controlProducts);
};

init();
