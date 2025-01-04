import View from './view';

class CartView extends View{
  _parent = document.querySelector('.cart');

  _generateMarkup() {
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
