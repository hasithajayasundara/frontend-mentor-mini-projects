import { v4 } from 'uuid';

export const formatCurrency = (price) => new Intl.NumberFormat(
  'en-US',
  { style: 'currency', currency: 'USD' }
).format(price);

export const mapProducts = (products) => {
  const productMap = new Map();
  const productIds = [];
  products.forEach((p) => {
    const product = {
      ...p,
      id: v4(),
      srcset: Object.entries(p.image).map(([key, value]) => {
        switch (key) {
          case 'desktop':
            return `${value} 502w`;
          case 'tablet':
            return `${value} 427w`;
          case 'mobile':
            return `${value} 654w`;
          case 'thumbnail':
            return `${value} 100w`;
        }
      }, []).join(','),
    };

    productMap.set(product.id, product);
    productIds.push(product.id);
  });

  return { productIds, productMap }
};
