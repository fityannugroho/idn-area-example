import $ from 'jquery';

class FormSelect extends HTMLElement {
  connectedCallback() {
    this.id = $(this).attr('id') || '';
    this.label = $(this).attr('label') || null;
    this.emptyOption = $(this).attr('empty-opt') || '';
    this.disabled = $(this).attr('disabled') !== undefined;
    this._options = [];

    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[name] = newValue;
  }

  static get observedAttributes() {
    return ['id', 'label', 'empty-opt', 'disabled'];
  }

  /**
   * Generate select id based on the form select id.
   * For example: `id: 'car'` => `selectId: 'selectCar'`.
   * @param {string} id The form select id.
   */
  static generateSelectId(id) {
    return `select${id.replace(/^\w/, (c) => c.toUpperCase())}`;
  }

  // -------- SETTER --------
  /**
   * @param {string} id
   */
  set id(id) {
    // Set the select id every time the form `id` value is changed.
    this._selectId = FormSelect.generateSelectId(id);
  }

  // -------- METHOD --------
  /**
   * Set the id of form select.
   * @param {string} id The id.
   */
  setId(id) {
    this.id = id;
    return this;
  }

  /**
   * Set the label of form select.
   * @param {string} label The label.
   */
  setLabel(label) {
    this.label = label;
    return this;
  }

  /**
   * Set the empty option value. If value is `null`, the empty option will be removed.
   * @param {string} value The empty option value.
   * @param {() => any} onClickCallback Set the callback when the empty option is clicked.
   */
  setEmptyOption(value = '', onClickCallback = () => {}) {
    this.emptyOption = value;
    this._onEmptyOptionClicked = onClickCallback;
    return this;
  }

  /**
   * Disable the form select.
   * @param {boolean} disabled Set `false` to enable.
   */
  setDisabled(disabled = true) {
    this.disabled = disabled;
    return this;
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
   * If set to `true`, the select element will show a loading spinner.
   * @param {boolean} isOnLoad The default is `true`.
   */
  setOnLoad(isOnLoad = true) {
    this._isOnLoad = isOnLoad;
    return this;
  }

  /**
   * Render the element.
   */
  render() {
    $(this).html(`
      <div class="mb-3 has-validation">
        <label for="${this._selectId}" class="form-label">${this.label}</label>
        <div class="input-group">
          <select class="form-select" id="${this._selectId}" ${this.disabled ? 'disabled' : ''}>
            ${this.emptyOption === '' ? '' : `<option class="empty-option" selected>${this.emptyOption}</option>`}
          </select>
          ${this._isOnLoad ? '<span class="input-group-text"><i class="fa-solid fa-spinner fa-spin"></i></span>' : ''}
        </div>
      </div>
    `);

    // Render options.
    const $selectElement = $(this).find(`#${this._selectId}`);
    this._options.forEach((opt) => {
      $selectElement.append(
        $('<option>').html(opt[this._optionValueKey])
          .on('click', () => this._onOptionClicked(opt)),
      );
    });

    // Set on empty option is clicked.
    $(this).find('.empty-option').on('click', this._onEmptyOptionClicked);
  }

  /**
   * Reset the form select options and render it.
   */
  resetOptions() {
    this.setOptions([]).setDisabled().setEmptyOption().render();
  }
}

customElements.define('form-select', FormSelect);
