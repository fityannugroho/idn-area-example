import $ from 'jquery';

class SearchResults extends HTMLElement {
  connectedCallback() {
    this._results = [];
    this.render();
  }

  /**
   *
   * @param {{}[]} results
   * @returns
   */
  renderResults(results) {
    this._results = results;
    this.render();
  }

  render() {
    $(this).addClass('my-4').html(`
      <h4 class="my-3">Result</h4>
      <ul class="list-group"></ul>
    `);

    const $list = $(this).find('ul.list-group');

    if (this._results.length === 0) {
      $list.append($('<div>')
        .addClass('p-4 bg-light border')
        .html('There are no any result found.'));
    }

    this._results.forEach((result) => {
      $list.append($('<li>').addClass('list-group-item').html(`
        <span class="text-muted me-2">${result.code}</span>
        <span>${result.name}</span>
      `));
    });
  }
}

customElements.define('search-results', SearchResults);
