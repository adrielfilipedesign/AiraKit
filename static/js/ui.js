/* ============================================
   AiraKit — UI Components
   Accordion · Carousel · Checkbox
   ============================================ */

/* --------------------------------------------
   Accordion
   -------------------------------------------- */
document.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
  if (trigger.getAttribute('aria-expanded') === 'true') {
    trigger.closest('.accordion-item').classList.add('open');
  }

  trigger.addEventListener('click', function () {
    var item      = trigger.closest('.accordion-item');
    var accordion = item.closest('.accordion');
    var isMulti   = accordion.classList.contains('accordion--multi');
    var isOpen    = item.classList.contains('open');

    if (!isMulti) {
      accordion.querySelectorAll('.accordion-item.open').forEach(function (other) {
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
(function () {
  var carousel = document.getElementById('carousel-demo');
  if (!carousel) return;

  var track   = carousel.querySelector('.carousel-track');
  var slides  = carousel.querySelectorAll('.carousel-slide');
  var dotsEl  = document.getElementById('carousel-demo-dots');
  var btnPrev = carousel.querySelector('.carousel-btn--prev');
  var btnNext = carousel.querySelector('.carousel-btn--next');
  var current = 0;
  var total   = slides.length;

  slides.forEach(function (_, i) {
    var dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Slide ' + (i + 1));
    dot.addEventListener('click', function () { goTo(i); });
    dotsEl.appendChild(dot);
  });

  function goTo(index) {
    current = Math.max(0, Math.min(index, total - 1));
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    carousel.querySelectorAll('.carousel-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === current);
    });
    btnPrev.disabled = current === 0;
    btnNext.disabled = current === total - 1;
  }

  btnPrev.addEventListener('click', function () { goTo(current - 1); });
  btnNext.addEventListener('click', function () { goTo(current + 1); });

  var startX = 0;
  track.addEventListener('pointerdown', function (e) { startX = e.clientX; });
  track.addEventListener('pointerup',   function (e) {
    var diff = startX - e.clientX;
    if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
  });

  goTo(0);
})();

/* --------------------------------------------
   Checkbox
   -------------------------------------------- */
document.querySelectorAll('.checkbox-wrap input[type="checkbox"]').forEach(function (input) {
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