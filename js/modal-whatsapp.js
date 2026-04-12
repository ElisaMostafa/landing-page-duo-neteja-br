(() => {
    // ─── HTML ───
    const html = `
  <div class="wa-float" id="waFloat" aria-label="Abrir WhatsApp">
    <button class="wa-btn" id="waBtn" aria-label="Contactar por WhatsApp" aria-expanded="false">
      <img src="imagens/whatsapp-modal.png" alt="" aria-hidden="true" width="58" height="58" />
    </button>

    <div class="wa-modal" id="waModal" role="dialog" aria-modal="true" aria-label="Contacto por WhatsApp">
      <button class="wa-modal-close" id="waClose" aria-label="Cerrar">✕</button>
      <div class="wa-modal-header">
        <div class="wa-avatar" aria-hidden="true">
            <img src="imagens/whatsapp-modal.png" alt="Duo Neteja BR" width="42" height="42" />
        </div>
        <div>
          <p class="wa-modal-name">Duo Neteja BR</p>
          <p class="wa-modal-status">● Normalmente responde en minutos</p>
        </div>
      </div>
      <div class="wa-modal-bubble">
        <p>¡Hola! 👋 ¿En qué podemos ayudarte hoy?</p>
      </div>
      <a href="https://wa.me/34600000000?text=Hola%2C%20me%20gustar%C3%ADa%20pedir%20m%C3%A1s%20información%20sobre%20vuestros%20servicios." class="wa-modal-btn" target="_blank" rel="noopener noreferrer">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.52 3.48A11.9 11.9 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.17 1.6 5.99L0 24l6.17-1.6A11.95 11.95 0 0012 24c6.63 0 12-5.37 12-12 0-3.2-1.25-6.22-3.48-8.52z"/></svg>
        Abrir WhatsApp
      </a>
    </div>
  </div>`;

    // ─── CSS ───
    const css = `
  .wa-float {
    position: fixed;
    bottom: 2rem; right: 2rem;
    z-index: 200;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.8rem;
  }
  .wa-btn {
    width: 58px; height: 58px;
    border-radius: 50%;
    background: none;
    border: none; cursor: pointer;
    padding: 0; overflow: hidden;
    box-shadow: 0 4px 20px rgba(37,211,102,0.45);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .wa-btn img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 50%;
  }
  .wa-btn:hover {
    transform: scale(1.08);
    box-shadow: 0 8px 28px rgba(37,211,102,0.55);
  }
  .wa-modal {
    background: #fff;
    border-radius: 16px;
    width: 300px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.15);
    border: 1px solid #d4e8dc;
    overflow: hidden;
    opacity: 0;
    position: fixed;
    bottom: 5rem;
    right: 2rem;
    transform: translateY(12px) scale(0.97);
    pointer-events: none;
    transition: opacity 0.25s ease, transform 0.25s ease;
    transform-origin: bottom right;
  }
  .wa-modal.open {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: all;
  }
  .wa-modal-close {
    position: absolute;
    top: 0.7rem; right: 0.8rem;
    background: none; border: none;
    color: rgba(255,255,255,0.8);
    font-size: 1rem; cursor: pointer;
  }
  .wa-modal-close:hover { color: #fff; }
  .wa-modal-header {
    background: #075e54;
    padding: 1.1rem 1.2rem;
    display: flex; align-items: center; gap: 0.9rem;
    position: relative;
  }
  .wa-avatar {
    width: 42px; height: 42px;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
  }
  .wa-avatar img {
    width: 100%; height: 100%;
    object-fit: cover;
    display: block;
  }
  .wa-modal-name {
    color: #fff;
    font-weight: 600; font-size: 0.95rem;
    margin-bottom: 0.15rem;
  }
  .wa-modal-status {
    color: rgba(255,255,255,0.75);
    font-size: 0.78rem;
  }
  .wa-modal-bubble {
    background: #f0f0f0;
    margin: 1rem;
    padding: 0.75rem 1rem;
    border-radius: 0 12px 12px 12px;
    font-size: 0.92rem;
    color: #1a1a1a;
    line-height: 1.5;
    position: relative;
  }
  .wa-modal-bubble::before {
    content: '';
    position: absolute;
    top: 0; left: -8px;
    border: 8px solid transparent;
    border-right-color: #f0f0f0;
    border-top-color: #f0f0f0;
  }
  .wa-modal-btn {
    display: flex; align-items: center; justify-content: center; gap: 0.5rem;
    margin: 0 1rem 1rem;
    padding: 0.75rem;
    background: #25d366;
    color: #fff;
    border-radius: 50px;
    font-weight: 600; font-size: 0.95rem;
    text-decoration: none;
    transition: background 0.3s ease, transform 0.3s ease;
  }
  .wa-modal-btn:hover {
    background: #1ebe5d;
    transform: translateY(-1px);
  }`;

    // ─── INJECT ───
    document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
    document.body.insertAdjacentHTML('beforeend', html);

    // ─── LOGIC ───
    const waBtn = document.getElementById('waBtn');
    const waModal = document.getElementById('waModal');
    const waClose = document.getElementById('waClose');

    waBtn.addEventListener('click', () => {
        const isOpen = waModal.classList.toggle('open');
        waBtn.setAttribute('aria-expanded', isOpen);
    });

    waClose.addEventListener('click', () => {
        waModal.classList.remove('open');
        waBtn.setAttribute('aria-expanded', false);
    });

    document.addEventListener('click', (e) => {
        if (!document.getElementById('waFloat').contains(e.target)) {
            waModal.classList.remove('open');
            waBtn.setAttribute('aria-expanded', false);
        }
    });
})();