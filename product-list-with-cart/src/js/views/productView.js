import View from './view';

class ProductView extends View {
  _parent = document.querySelector('.products');

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerAddToCart(handler) {
    this._parent.addEventListener('click', (e) => {
      e.preventDefault();
      const { target } = e;
      if (!target.classList.contains('add-to-cart__btn')) {
        return;
      }

      const id = target.dataset.id;
      if (!id) {
        return;
      }

      handler?.(id);
    });
  }

  _generateAddToCartButton(isAddedToCart, id) {
    if (isAddedToCart) {
      return `
      <div class="change-quantity">
        <button class="decrement__quantity--btn">
          <img src="src/assets/icon-decrement-quantity.svg" alt="Add to cart icon"/>
        </button>
        ${this._data.cart.items.byId.get(id)}
        <button class="increment__quantity--btn">
          <img src="src/assets/icon-increment-quantity.svg" alt="Add to cart icon"/>
        </button>
      </div>
    `
    }

    return `
      <button class="btn add-to-cart__btn" data-id="${id}">
        <img src="src/assets/icon-add-to-cart.svg" alt="Add to cart icon"/>
        Add to cart
      </button>
    `
  }

  _generateMarkup() {
    const markup = this._data.products.allIds.map((id) => {
      const product = this._data.products.byId.get(id);
      let isAddedToCart = false;
      if (this._data.cart.items.byId.has(id)) {
        isAddedToCart = true;
      }

      let className = 'product';
      if(isAddedToCart){
        className = className.concat(' active');
      }

      return `
        <div class="${className}">
          <div class="product__header">
            <div class="product__img">
              <img
                loading="lazy"
                src="${product.image.thumbnail}" 
                alt="Image of ${product.name}" 
                srcset="${product.srcset}"
              >
            </div>
            ${this._generateAddToCartButton(isAddedToCart, id)}
          </div>
          <div class="product__data">
            <div class="product__category">${product.category}</div>
            <div class="product__name">${product.name}</div>
            <div class="product__price">${product.price}</div>
          </div>
        </div>
    `});

    return markup.join('');
  }
}

export default new ProductView();
