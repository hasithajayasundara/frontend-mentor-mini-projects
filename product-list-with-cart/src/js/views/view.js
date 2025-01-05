class View {
  _data;

  _clear() {
    this._parent.innerHTML = "";
  }

  setIsLoading() {
    this._parent.classList.add('loading');
    const markup = this._generateLoadingMarkup?.();
    this._clear();
    this._parent.insertAdjacentHTML('afterbegin', markup ?? '');
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup?.();
    this._clear();
    this._parent.classList.remove('loading');
    this._parent.insertAdjacentHTML('afterbegin', markup);
  }
}

export default View;
