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
