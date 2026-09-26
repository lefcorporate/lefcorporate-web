const menuBtn = document.querySelector('.menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

document.querySelectorAll('[data-contact-form]').forEach(form => {
  form.addEventListener('submit', async e => {
    e.preventDefault();

    const status = form.querySelector('.form-status');
    const endpoint = 'https://api.web3forms.com/submit';

    status.style.display = 'block';
    status.textContent = 'Enviando...';

    try {
      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: json
      });

      const result = await response.json();

      if (result.success) {
        form.reset();
        status.textContent = 'Gracias. Su solicitud fue enviada correctamente.';
      } else {
        throw new Error(result.message || 'Error de envío');
      }

    } catch (err) {
      console.error(err);
      status.textContent =
        'No fue posible enviar la solicitud. Intente nuevamente o utilice WhatsApp.';
    }
  });
});
