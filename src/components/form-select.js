import $ from 'jquery';

class FormSelect extends HTMLElement {
  connectedCallback() {
    this.id = $(this).attr('id') || '';
    this.label = $(this).attr('label') || null;
    this.emptyOption = $(this).attr('empty-opt');
    this.disabled = $(this).attr('disabled') !== undefined;
    this._options = [];

    this.render();
  }

  /**
   * Generate select id based on the form select id.
   * For example: `id: 'car'` => `selectId: 'selectCar'`.
   * @param {string} id The form select id.
   */
  static generateSelectId(id) {
    return `select${id.replace(/^\w/, (c) => c.toUpperCase())}`;
  }

  /**
   * @param {string} id
   */
  set id(id) {
    // Set the select id every time the form `id` value is changed.
    this._selectId = FormSelect.generateSelectId(id);
  }

  /**
   * Set the select options.
   * @param {{}[]} options The list of option.
   */
  setOptions(options) {
    this._options = options;
    return this;
  }

  /**
   * Set the option value key.
   * @param {string} optionValueKey The list of option.
   */
  setOptionValueKey(optionValueKey) {
    this._optionValueKey = optionValueKey;
    return this;
  }

  /**
   * Set the callback when an option is clicked.
   * @param {(option: {}) => any} callback The on-click event callback.
   */
  setOnOptionClicked(callback) {
    this._onOptionClicked = callback;
    return this;
  }

  /**
   * Set the callback when the empty option is clicked.
   * @param {() => any} callback The on-click event callback.
   */
  setOnEmptyOptionClicked(callback) {
    this._onEmptyOptionClicked = callback;
    return this;
  }

  /**
   * Render the element.
   */
  render() {
    $(this).html(`
      <div class="mb-3 has-validation">
        <label for="${this._selectId}" class="form-label">${this.label}</label>
        <select class="form-select" id="${this._selectId}" ${this.disabled ? 'disabled' : ''}>
          ${this.emptyOption === undefined ? '' : `<option class="empty-option" selected>${this.emptyOption}</option>`}
        </select>
      </div>
    `);

    // Render options.
    const $selectElement = $(this).find(`#${this._selectId}`);
    this._options.forEach((opt) => {
      const $newOpt = $('<option>').html(opt[this._optionValueKey]).on('click', () => this._onOptionClicked(opt));
      $selectElement.append($newOpt);
    });

    // Set on empty option is clicked.
    $(this).find('.empty-option').on('click', this._onEmptyOptionClicked);
  }
}

customElements.define('form-select', FormSelect);
