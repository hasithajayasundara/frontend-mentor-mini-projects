class ProductView {
  #data;
  #parent = document.querySelector('.products');

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup?.();
    this.#clear();
    this.#parent.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    this.#clear();
    this.#parent.insertAdjacentHTML('afterbegin', '<div class="loader"></div>')
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  #clear() {
    this.#parent.innerHTML = "";
  }

  #generateMarkup() {
    const markup = this.#data.map((p) => `
      <div class="product">
        <div class="product__header">
          <div class="product__img">
            <img 
              src="${p.image.thumbnail}" 
              alt="Image of ${p.name}" 
              srcset="${p.srcset}"
            >
          </div>
          <button class="btn add-to-cart__btn">
            <img src="src/assets/icon-add-to-cart.svg" alt="Add to cart icon"/>
            Add to cart
          </button>
        </div>
        <div class="product__data">
          <div class="product__category">${p.category}</div>
          <div class="product__name">${p.name}</div>
          <div class="product__price">${p.price}</div>
        </div>
      </div>
    `);

    return markup.join('');
  }
}

export default new ProductView();
