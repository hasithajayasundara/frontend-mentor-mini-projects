import View from './view';
import {
  CART_OPERATION_DECREMENT,
  CART_OPERATION_INCREMENT
} from '../constants';
import { formatCurrency } from '../helpers';

import iconDecrement from '../../img/icon-decrement-quantity.svg';
import iconIncrement from '../../img/icon-increment-quantity.svg';
import iconAddToCart from '../../img/icon-add-to-cart.svg';

class ProductView extends View {
  _parent = document.querySelector('.products');

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  addHandlerAddToCart(handler) {
    this._parent.addEventListener('click', (e) => {
      e.preventDefault();
      const addToCartButton = e.target.closest('.add-to-cart__btn');
      if (!addToCartButton) {
        return;
      }

      const id = addToCartButton.dataset.id;
      if (!id) {
        return;
      }

      handler?.(id);
    });
  }

  addHandlerChangeCart(handler) {
    this._parent.addEventListener('click', (e) => {
      e.preventDefault();
      const decrementQuantityButton = e.target.closest('.decrement-quantity__btn');
      const incrementQuantityButton = e.target.closest('.increment-quantity__btn');
      if (!decrementQuantityButton && !incrementQuantityButton) {
        return;
      }

      let id = '', operation = '';
      if (incrementQuantityButton) {
        id = incrementQuantityButton.dataset.id;
        operation = CART_OPERATION_INCREMENT;
      } else if (decrementQuantityButton) {
        id = decrementQuantityButton.dataset.id;
        operation = CART_OPERATION_DECREMENT;
      }

      if (!id) {
        return;
      }

      handler?.(id, operation);
    });
  }

  _generateAddToCartButton(isAddedToCart, id) {
    if (isAddedToCart) {
      return `
      <div class="change-quantity">
        <button class="decrement-quantity__btn" data-id="${id}">
          <img src="${iconDecrement}" alt="Decrement quantity button"/>
        </button>
        ${this._data.cart.items.byId.get(id)}
        <button class="increment-quantity__btn" data-id="${id}">
          <img src="${iconIncrement}" alt="Add to cart icon"/>
        </button>
      </div>
    `
    }

    return `
      <button class="btn add-to-cart__btn" data-id="${id}">
        <img src="${iconAddToCart}" alt="Increment quantity button"/>
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
      if (isAddedToCart) {
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
            <div class="product__price">${formatCurrency(product.price)}</div>
          </div>
        </div>
    `});

    return markup.join('');
  }
}

export default new ProductView();
