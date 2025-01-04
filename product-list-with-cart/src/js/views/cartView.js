import { formatCurrency } from '../helpers';
import View from './view';

class CartView extends View {
  _parent = document.querySelector('.cart');

  addHandlerRemoveItem(handler){
    this._parent.addEventListener('click', (e)=>{
      e.preventDefault();
      const removeButton = e.target.closest('.remove-item__btn');
      if(!removeButton){
        return;
      }

      const id = removeButton.dataset.id;
      handler(id);
    });
  }

  addHandlerConfirmOrder(handler){
    this._parent.addEventListener('click', (e)=>{
      e.preventDefault();
      const confirmButton = e.target.closest('.confirm-order__btn');
      if(!confirmButton){
        return;
      }

      handler();
    });
  }

  _generateCartItems() {
    const markup = this._data.cart.items.allIds.map((id) => {
      const product = this._data.products.byId.get(id);
      const quantity = this._data.cart.items.byId.get(id);
      return `
        <li class="cart__item">
          <div class="cart__item-name">
            ${product.name}
          <div>
          <div class="cart__item-data">
            <span class="cart__item-quantity">${quantity}x</span>
            <span>@ ${formatCurrency(product.price)}</span>
            <span class="cart__item-total-price">${formatCurrency(product.price * quantity)}</span>
            <button class="btn remove-item__btn" data-id="${id}">
              <img src="src/assets/icon-remove-item.svg" alt="Add to cart icon"/>
            </button>
          </div>
        </li>
      `;
    });

    return markup.join('');
  }

  _generateMarkup() {
    if (this._data.cart.totalItems === 0) {
      return `
        <div class="card__container">
          <h3 class="cart__header"> Your cart (0) </h3>
          <div class="cart__content">
            <img src="src/assets/illustration-empty-cart.svg" alt="Empty card image">
            <p class="empty-cart__text">Your added items will appear here</p>
          </div>
        </div>
      `
    }

    return `
      <div class="card__container">
        <h3 class="cart__header"> Your cart (${this._data.cart.totalItems}) </h3>
        <div class="cart__content">
          <ul class="cart__list">
            ${this._generateCartItems()}
          </ul>
          <div class="cart-total">
            <span>Order total</span>
            <span>${formatCurrency(this._data.cart.totalPrice)}</span>
          </div>
        </div>
        <div class="delivery__message">
            <img src="src/assets/icon-carbon-neutral.svg" alt="Icon of a tree">
            This is a&nbsp;<span>carbon neutral</span>&nbsp;delivery
        </div>
        <div class="confirm-order">
          <button class="btn confirm-order__btn active"> 
            Confirm Order
          </button>
        </div>
      </div>
    `;
  }
}

export default new CartView();
