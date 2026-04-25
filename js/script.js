
    // Nav toggle mobile
    const toggle = document.getElementById('navToggle');
    const links  = document.getElementById('navLinks');
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', false);
      });
    });

    // Scroll reveal
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));

    // Form submit feedback
    document.querySelector('form').addEventListener('submit', function(e) {
      e.preventDefault();
      const btn = this.querySelector('.form-submit');
      btn.textContent = '¡Mensaje enviado! 🎉';
      btn.style.background = '#1a7c4e';
      btn.disabled = true;
    });

  document.querySelectorAll('[data-slider]').forEach(wrap => {
  const antesWrap = wrap.querySelector('.img-antes-wrap');
  const line = wrap.querySelector('.slider-line');
  const handle = wrap.querySelector('.slider-handle');
  let dragging = false;

  function setPos(x) {
    const rect = wrap.getBoundingClientRect();
    let pct = ((x - rect.left) / rect.width) * 100;
    pct = Math.max(2, Math.min(98, pct));
    antesWrap.style.width = pct + '%';
    line.style.left = pct + '%';
    handle.style.left = pct + '%';
  }

  wrap.addEventListener('mousedown', e => { dragging = true; setPos(e.clientX); e.preventDefault(); });
  wrap.addEventListener('touchstart', e => { dragging = true; setPos(e.touches[0].clientX); }, { passive: true });
  document.addEventListener('mousemove', e => { if (dragging) setPos(e.clientX); });
  document.addEventListener('touchmove', e => { if (dragging) setPos(e.touches[0].clientX); }, { passive: true });
  document.addEventListener('mouseup', () => dragging = false);
  document.addEventListener('touchend', () => dragging = false);
});
