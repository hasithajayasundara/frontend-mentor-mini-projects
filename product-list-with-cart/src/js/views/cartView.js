class CartView{
  #parent = document.querySelector('.cart');
  #data;

  render(data){
    this.#data = data;;
    const markup = this.#generateMarkup?.();
    this.#clear();
    this.#parent.insertAdjacentHTML('afterbegin', markup);

  }

  #clear() {
    this.#parent.innerHTML = "";
  }

  #generateMarkup() {
    const markup = `
      <div class="card__container">
        <h3 class="cart__header"> Your cart (0) </h3>
        <div class="cart__content">
          <img src="src/assets/illustration-empty-cart.svg" alt="Empty card image">
          <p class="empty-cart__text">Your added items will appear here</p>
        </div>
      </div>
    `;

    return markup;
  }
}

export default new CartView();
