import $ from 'jquery';

class NavBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    $(this).html(`
      <div class="container-fluid px-4">
        <a class="navbar-brand" href="#">idn-area Example</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fa-solid fa-bars fa-xl"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="https://idn-area.herokuapp.com"  target="_blank" rel="noopener noreferrer">API</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://github.com/fityannugroho/idn-area#readme"  target="_blank" rel="noopener noreferrer">Docs</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="https://fityannugroho.github.io"  target="_blank" rel="noopener noreferrer">About Me</a>
            </li>
          </ul>
        </div>
      </div>
    `);

    $(this).addClass('navbar navbar-expand-lg navbar-light');
  }
}

customElements.define('nav-bar', NavBar);