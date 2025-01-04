import { formatCurrency } from '../helpers';
import View from './view';

class OrderConfirmedView extends View {
  _parent = document.querySelector('.order-confirmed__dialog');

  render(data) {
    super.render(data);
    this._parent.classList.toggle('active');
    this._parent.showModal();
    document.body.classList.toggle('no-overflow');
  }

  addHandlerStartNewOrder(handler) {
    this._parent.addEventListener('click', (e) => {
      e.preventDefault();
      const startNewOrderButton = e.target.closest('.start-order__btn');
      if (!startNewOrderButton) {
        return;
      }

      this._clear();
      this._parent.classList.toggle('active');
      document.body.classList.toggle('no-overflow');
      this._parent.close();
      handler();
    });
  }

  _generateCartItems() {
    const markup = this._data.cart.items.allIds.map((id) => {
      const product = this._data.products.byId.get(id);
      const quantity = this._data.cart.items.byId.get(id);
      return `
          <li class="order-confirmed__item">
            <img
              loading="lazy"
              src="${product.image.thumbnail}" 
              alt="Image of ${product.name}" 
              srcset="${product.srcset}"
            >
            <div class="order-confirmed__item-data">
              <div>
                <span class="cart__item-name">${product.name}</span>
              </div>
              <div>
                <span class="cart__item-quantity">${quantity}x</span>
                <span>@ ${formatCurrency(product.price)}</span>
              </div>
            </div>
            <div class="cart__item-total-price">
              ${formatCurrency(product.price * quantity)}
            </div>
          </li>
        `;
    });

    return markup.join('');
  }

  _generateMarkup() {
    return `
      <img src="src/assets/icon-order-confirmed.svg" alt="Add to cart icon"/>
      <h1>Order confirmed</h1>
      <p>We hope you enjoy your food</p>
      <ul class="order-confirmed__list">
        ${this._generateCartItems()}
      </ul>
      <button class="btn active start-order__btn" autofocus>
        Start new order 
      </button>
    `
  }
}

export default new OrderConfirmedView();
