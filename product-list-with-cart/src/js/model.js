export const state = {
  products: {
    byId: new Map(),
    allIds: [],
  },
  cart: {
    total: '',
    items: {
      byId: new Map(),
      allIds: [],
    },
  },
};
