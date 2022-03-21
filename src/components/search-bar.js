import $ from 'jquery';

class SearchBar extends HTMLElement {
  connectedCallback() {
    this.id = $(this).attr('id') || '';
    this.label = $(this).attr('label') || '';
    this.placeholder = $(this).attr('placeholder') || '';
    this.helper = $(this).attr('helper') || '';
    this.value = $(this).attr('value') || '';
    this._isOnLoad = false;

    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
  }

  static get observedAttributes() {
    return ['id', 'label', 'placeholder', 'helper', 'value'];
  }

  /**
   * Generate searchBar id based on the form searchBar id.
   * For example: `id: 'car'` => `searchId: 'inputCar'`.
   * @param {string} id The searchBar id.
   */
  static generateSearchBarId(id) {
    return `input${id.replace(/^\w/, (c) => c.toUpperCase())}`;
  }

  // -------- SETTER --------
  /**
   * @param {string} id
   */
  set id(id) {
    // Set the search bar id every time the form `id` value is changed.
    this._searchBarId = SearchBar.generateSearchBarId(id);
  }

  setId(id) {
    this.id = id;
    return this;
  }

  setLabel(label) {
    this.label = label;
    return this;
  }

  setPlaceholder(placeholder) {
    this.placeholder = placeholder;
    return this;
  }

  setHelper(helper) {
    this.helper = helper;
    return this;
  }

  /**
   * If set to `true`, the search bar will show a loading spinner.
   * @param {boolean} isOnLoad The default is `true`.
   */
  setOnLoad(isOnLoad = true) {
    this._isOnLoad = isOnLoad;
    return this;
  }

  render() {
    $(this).html(`
      <div class="form-floating mb-3">
        <input type="text" class="form-control" id="${this._searchBarId}" placeholder="${this.placeholder}" value="${this.value}">
        <label for="${this._searchBarId}">${this.label}</label>
        <div id="${this._searchBarId}Helper" class="form-text">
          <span>${this.helper}</span>
          ${this._isOnLoad ? '<i class="fa-solid fa-spinner fa-spin"></i>' : ''}
        </div>
      </div>
    `);

    $(`#${this._searchBarId}`).on('input', () => {
      this.value = $(`#${this._searchBarId}`).val();
    });
  }
}

customElements.define('search-bar', SearchBar);
