class ProductView {
  #data;
  #parent = document.querySelector('.products');

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup?.();
    this.#clear();
    this.#parent.insertAdjacentHTML('afterbegin', markup);
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
        <img src="${p.image.desktop}" alt="Image of ${p.name}">
        <span>${p.name}</span>
        <span>${p.category}</span>
        <span>${p.price}</span>
      </div>
    `);

    return markup.join('');
  }
}

export default new ProductView();
