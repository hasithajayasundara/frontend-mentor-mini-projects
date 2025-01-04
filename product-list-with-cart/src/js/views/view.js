class View {
  _data;

  _clear() {
    this._parent.innerHTML = "";
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup?.();
    this._clear();
    this._parent.insertAdjacentHTML('afterbegin', markup);
  }

  renderSpinner() {
    this._clear();
    this._parent.insertAdjacentHTML('afterbegin', '<div class="loader"></div>')
  }
}

export default View;
