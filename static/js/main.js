/* --------------------------------------------
   Theme — aplica antes do render para evitar flash
   -------------------------------------------- */
(function () {
  const saved     = localStorage.getItem('airakit-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme     = saved ?? (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

function toggleTheme(btn) {
  const html    = document.documentElement;
  const isDark  = html.getAttribute('data-theme') === 'dark';
  const next    = isDark ? 'light' : 'dark';

  html.setAttribute('data-theme', next);
  localStorage.setItem('airakit-theme', next);
  _updateThemeBtn(btn, next);
}

function _updateThemeBtn(btn, theme) {
  if (!btn) return;
  const isDark = theme === 'dark';
  btn.querySelector('.theme-icon').textContent  = isDark ? '☀️' : '🌙';
  btn.querySelector('.theme-label').textContent = isDark ? 'Light' : 'Dark';
}

/* --------------------------------------------
   Navbar (Web Component)
   -------------------------------------------- */
class AiraNavbar extends HTMLElement {
  connectedCallback() {
    fetch('components/navbar.html')
      .then(res => res.text())
      .then(html => {
        this.innerHTML = html;

        // Sincroniza botão de tema com o estado atual
        const btn   = this.querySelector('.btn-theme');
        const theme = document.documentElement.getAttribute('data-theme');
        _updateThemeBtn(btn, theme);

        // Fecha menu ao clicar fora
        document.addEventListener('click', _handleOutsideClick);
      });
  }
}

/* --------------------------------------------
   Footer (Web Component)
   -------------------------------------------- */
class AiraFooter extends HTMLElement {
  connectedCallback() {
    fetch('components/footer.html')
      .then(res => res.text())
      .then(html => {
        this.innerHTML = html;

        // Sincroniza botão de tema com o estado atual
        const btn   = this.querySelector('.btn-theme');
        const theme = document.documentElement.getAttribute('data-theme');
        _updateThemeBtn(btn, theme);
      });
  }
}

function _handleOutsideClick(event) {
  const itensMenu  = document.getElementById('itensMenu');
  const botaoMenu  = document.querySelector('.navbar-toggle');
  if (!itensMenu || !botaoMenu) return;

  const clicouFora = !itensMenu.contains(event.target) && !botaoMenu.contains(event.target);
  if (itensMenu.classList.contains('active') && clicouFora) {
    itensMenu.classList.remove('active');
  }
}

function clickMenu() {
  document.getElementById('itensMenu')?.classList.toggle('active');
}

customElements.define('aira-navbar', AiraNavbar);
customElements.define('aira-footer', AiraFooter);

/* --------------------------------------------
   Icons — grid + copy to clipboard
   -------------------------------------------- */
const uiIcons = [
  'checkbox-checked',
  'checkbox-uncheck',
  'close',
  'contract',
  'copy',
  'download',
  'expand',
  'home',
  'human',
  'loading',
  'menu',
  'more',
  'next-music',
  'next',
  'pause',
  'previous',
  'previus-music',
  'trash',
  'upload'
];

function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function buildIconGrid() {
  const grid = document.getElementById('ui-icons-grid');
  if (!grid) return;

  uiIcons.forEach(name => {
    const path = `static/icons/ui/${name}.svg`;
    const card = document.createElement('div');
    card.className = 'icon-card';
    card.innerHTML = `
      <span class="copy-hint">copy</span>
      <img src="${path}" alt="${name}">
      <span class="icon-card-name">${name}</span>
    `;
    card.addEventListener('click', () => {
      navigator.clipboard.writeText(path).then(() => {
        card.classList.add('copied');
        card.querySelector('.copy-hint').textContent = 'copied!';
        showToast(`Copied: ${path}`);
        setTimeout(() => {
          card.classList.remove('copied');
          card.querySelector('.copy-hint').textContent = 'copy';
        }, 2000);
      });
    });
    grid.appendChild(card);
  });
}

buildIconGrid();