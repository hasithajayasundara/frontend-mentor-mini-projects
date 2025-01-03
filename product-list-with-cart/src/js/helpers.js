export const mapProducts = (products) => products.map((p) => ({
  ...p,
  price: new Intl.NumberFormat('en-US',{ style: 'currency', currency: 'USD' }).format(p.price),
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
}));
