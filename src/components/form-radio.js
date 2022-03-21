import $ from 'jquery';

class FormRadio extends HTMLElement {
  connectedCallback() {
    this.id = $(this).attr('id') || '';
    this.label = $(this).attr('label') || '';
    this.value = $(this).attr('value') || '';
    this.name = $(this).attr('name') || '';
    this.isChecked = $(this).attr('checked') !== undefined;

    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'checked') {
      this.isChecked = newValue;
    } else {
      this[name] = newValue;
    }
  }

  static get observedAttributes() {
    return ['id', 'label', 'value', 'name', 'checked'];
  }

  // -------- SETTER --------
  /**
   * Generate radio id based on the form radio id.
   * For example: `id: 'car'` => `radioId: 'radioCar'`.
   * @param {string} id The form radio id.
   */
  static generateRadioId(id) {
    return `radio${id.replace(/^\w/, (c) => c.toUpperCase())}`;
  }

  /**
   * @param {string} id
   */
  set id(id) {
    // Set the radio id every time the form `id` value is changed.
    this._radioId = FormRadio.generateRadioId(id);
  }

  render() {
    $(this).addClass('form-check form-check-inline').html(`
      <input class="form-check-input" type="radio" name="${this.name}" id="${this._radioId}" value="${this.value}" ${this.isChecked ? 'checked' : ''}>
      <label class="form-check-label" for="${this._radioId}">${this.label}</label>
    `);

    $(this).on('click', () => {
      $(`form-radio[name="${this.name}"]`).removeAttr('checked');
      $(this).attr('checked', '');
    });
  }
}

customElements.define('form-radio', FormRadio);
