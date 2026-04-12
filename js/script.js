
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
