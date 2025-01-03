import { data } from './mocks/data';

export const getProducts = async () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(data);
  }, 3000);
});
