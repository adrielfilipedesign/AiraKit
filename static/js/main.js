/* ============================================
   AiraKit — Main
   Load order: main.js → dark-mode.js → ui.js → toast.js
   ============================================ */

/* --------------------------------------------
   Theme — apply before render to avoid flash
   -------------------------------------------- */
(function () {
  const saved     = localStorage.getItem('airakit-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme     = saved ?? (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
})();

/* --------------------------------------------
   Theme button — sync icon + label
   -------------------------------------------- */
function _updateThemeBtn(btn, theme) {
  if (!btn) return;
  const isDark = theme === 'dark';
  btn.querySelector('.theme-icon').textContent  = isDark ? '☀️' : '🌙';
  btn.querySelector('.theme-label').textContent = isDark ? 'Light' : 'Dark';
}

function toggleTheme(btn) {
  const html  = document.documentElement;
  const next  = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('airakit-theme', next);
  _updateThemeBtn(btn, next);
}

/* --------------------------------------------
   Navbar — Web Component
   -------------------------------------------- */
class AiraNavbar extends HTMLElement {
  connectedCallback() {
    fetch('components/navbar.html')
      .then(res => res.text())
      .then(html => {
        this.innerHTML = html;

        const btn   = this.querySelector('.btn-theme');
        const theme = document.documentElement.getAttribute('data-theme');
        _updateThemeBtn(btn, theme);

        document.addEventListener('click', _handleOutsideClick);
      });
  }
}

/* --------------------------------------------
   Footer — Web Component
   -------------------------------------------- */
class AiraFooter extends HTMLElement {
  connectedCallback() {
    fetch('components/footer.html')
      .then(res => res.text())
      .then(html => {
        this.innerHTML = html;

        const btn   = this.querySelector('.btn-theme');
        const theme = document.documentElement.getAttribute('data-theme');
        _updateThemeBtn(btn, theme);
      });
  }
}

/* --------------------------------------------
   Side menu — outside click handler
   -------------------------------------------- */
function _handleOutsideClick(event) {
  const menu   = document.getElementById('itensMenu');
  const toggle = document.querySelector('.navbar-toggle');
  if (!menu || !toggle) return;

  const clickedOutside = !menu.contains(event.target) && !toggle.contains(event.target);
  if (menu.classList.contains('active') && clickedOutside) {
    menu.classList.remove('active');
  }
}

function clickMenu() {
  document.getElementById('itensMenu')?.classList.toggle('active');
}

customElements.define('aira-navbar', AiraNavbar);
customElements.define('aira-footer', AiraFooter);

/* --------------------------------------------
   Icons grid — build + copy to clipboard
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