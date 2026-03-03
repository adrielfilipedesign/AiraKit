/* --------------------------------------------
   Accordion
   -------------------------------------------- */
document.querySelectorAll('.accordion-trigger').forEach(function(trigger) {
    if (trigger.getAttribute('aria-expanded') === 'true') {
        trigger.closest('.accordion-item').classList.add('open');
    }

    trigger.addEventListener('click', function() {
        var item      = trigger.closest('.accordion-item');
        var accordion = item.closest('.accordion');
        var isMulti   = accordion.classList.contains('accordion--multi');
        var isOpen    = item.classList.contains('open');

        if (!isMulti) {
            accordion.querySelectorAll('.accordion-item.open').forEach(function(other) {
                other.classList.remove('open');
                other.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
            });
        }

        item.classList.toggle('open', !isOpen);
        trigger.setAttribute('aria-expanded', String(!isOpen));
    });
});


/* --------------------------------------------
   Carousel
   -------------------------------------------- */
(function() {
    var carousel = document.getElementById('carousel-demo');
    if (!carousel) return;

    var track   = carousel.querySelector('.carousel-track');
    var slides  = carousel.querySelectorAll('.carousel-slide');
    var dotsEl  = document.getElementById('carousel-demo-dots');
    var btnPrev = carousel.querySelector('.carousel-btn--prev');
    var btnNext = carousel.querySelector('.carousel-btn--next');
    var current = 0;
    var total   = slides.length;

    slides.forEach(function(_, i) {
        var dot = document.createElement('button');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Slide ' + (i + 1));
        dot.addEventListener('click', function() { goTo(i); });
        dotsEl.appendChild(dot);
    });

    function goTo(index) {
        current = Math.max(0, Math.min(index, total - 1));
        track.style.transform = 'translateX(-' + (current * 100) + '%)';
        carousel.querySelectorAll('.carousel-dot').forEach(function(d, i) {
            d.classList.toggle('active', i === current);
        });
        btnPrev.disabled = current === 0;
        btnNext.disabled = current === total - 1;
    }

    btnPrev.addEventListener('click', function() { goTo(current - 1); });
    btnNext.addEventListener('click', function() { goTo(current + 1); });

    var startX = 0;
    track.addEventListener('pointerdown', function(e) { startX = e.clientX; });
    track.addEventListener('pointerup',   function(e) {
        var diff = startX - e.clientX;
        if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
    });

    goTo(0);
})();


/* --------------------------------------------
   Checkbox
   -------------------------------------------- */
document.querySelectorAll('.checkbox-wrap input[type="checkbox"]').forEach(function(input) {
    function updateIcon() {
        var icon = input.nextElementSibling;
        if (!icon || !icon.classList.contains('checkbox-icon')) return;
        var svgCheck   = icon.querySelector('.svg-check');
        var svgUncheck = icon.querySelector('.svg-uncheck');
        if (!svgCheck || !svgUncheck) return;
        if (input.checked) {
            svgCheck.style.display   = '';
            svgUncheck.style.display = 'none';
        } else {
            svgCheck.style.display   = 'none';
            svgUncheck.style.display = '';
        }
    }
    updateIcon();
    input.addEventListener('change', updateIcon);
});


/* --------------------------------------------
   Toast
   -------------------------------------------- */
function showToastKit(msg, type) {
    var container = document.getElementById('toast-kit');
    if (!container) return;

    var toast = document.createElement('div');
    toast.className = 'toast-kit-item toast-kit--' + (type || 'default');
    toast.setAttribute('role', 'status');

    var icons = {
        success: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
        error:   '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
        warning: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        default: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
    };

    toast.innerHTML =
        '<span class="toast-kit-icon">' + (icons[type] || icons.default) + '</span>' +
        '<span class="toast-kit-msg">'  + msg + '</span>' +
        '<button class="toast-kit-close" aria-label="Close" onclick="this.parentElement.remove()">' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button>';

    container.appendChild(toast);

    requestAnimationFrame(function() {
        requestAnimationFrame(function() { toast.classList.add('show'); });
    });

    setTimeout(function() {
        toast.classList.remove('show');
        setTimeout(function() { toast.remove(); }, 300);
    }, 4000);
}