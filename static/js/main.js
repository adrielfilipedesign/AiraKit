function clickMenu() {
  const itensMenu = document.getElementById('itensMenu');
  itensMenu.classList.toggle('active');
}

function toggleTheme(btn) {
  const isDark = document.body.classList.toggle('dark-mode');
  btn.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
  btn.querySelector('.theme-label').textContent = isDark ? 'Light' : 'Dark';
  localStorage.setItem('airakit-theme', isDark ? 'dark' : 'light');
}

(function () {
  const saved = localStorage.getItem('airakit-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (saved === 'dark' || (!saved && prefersDark)) {
    document.body.classList.add('dark-mode');
  }
})();

class AiraNavbar extends HTMLElement {
  connectedCallback() {
    fetch('components/navbar.html')
      .then(res => res.text())
      .then(html => {
        this.innerHTML = html;

        // Aplica tema salvo no botão depois de carregar
        const btn = this.querySelector('.btn-theme');
        if (btn && document.body.classList.contains('dark-mode')) {
          btn.querySelector('.theme-icon').textContent = '☀️';
          btn.querySelector('.theme-label').textContent = 'Light';
        }

        // Fecha menu ao clicar fora
        document.addEventListener('click', function(event) {
          const itensMenu = document.getElementById('itensMenu');
          const botaoMenu = document.querySelector('.navbar-toggle');
          if (!itensMenu || !botaoMenu) return;

          const clicouFora = !itensMenu.contains(event.target) && !botaoMenu.contains(event.target);
          if (itensMenu.classList.contains('active') && clicouFora) {
            itensMenu.classList.remove('active');
          }
        });
      });
  }
}

class AiraFooter extends HTMLElement {
  connectedCallback() {
    fetch('components/footer.html')
      .then(res => res.text())
      .then(html => {
        this.innerHTML = html;

        // Aplica tema salvo no botão depois de carregar
        const btn = this.querySelector('.btn-theme');
        if (btn && document.body.classList.contains('dark-mode')) {
          btn.querySelector('.theme-icon').textContent = '☀️';
          btn.querySelector('.theme-label').textContent = 'Light';
        }

        // Fecha menu ao clicar fora
        document.addEventListener('click', function(event) {
          const itensMenu = document.getElementById('itensMenu');
          const botaoMenu = document.querySelector('.navbar-toggle');
          if (!itensMenu || !botaoMenu) return;

          const clicouFora = !itensMenu.contains(event.target) && !botaoMenu.contains(event.target);
          if (itensMenu.classList.contains('active') && clicouFora) {
            itensMenu.classList.remove('active');
          }
        });
      });
  }
}

customElements.define('aira-navbar', AiraNavbar);
customElements.define('aira-footer', AiraFooter);


// dark-light mode button
 function toggleTheme(btn) {
            const isDark = document.body.classList.toggle('dark-mode');
            btn.querySelector('.theme-icon').textContent = isDark ? '☀️' : '🌙';
            btn.querySelector('.theme-label').textContent = isDark ? 'Light' : 'Dark';
            localStorage.setItem('airakit-theme', isDark ? 'dark' : 'light');
        }

        (function () {
            const saved = localStorage.getItem('airakit-theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (saved === 'dark' || (!saved && prefersDark)) {
                document.body.classList.add('dark-mode');
                const btn = document.querySelector('.btn-theme');
                if (btn) {
                    btn.querySelector('.theme-icon').textContent = '☀️';
                    btn.querySelector('.theme-label').textContent = 'Light';
                }
            }
        })();


//copy icons
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
            toast.textContent = msg;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        }

        function buildIconGrid() {
            const grid = document.getElementById('ui-icons-grid');
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