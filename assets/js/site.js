
const menuBtn=document.querySelector('.menu-btn');
const mobileMenu=document.querySelector('.mobile-menu');
if(menuBtn&&mobileMenu){
  menuBtn.addEventListener('click',()=>{
    const open=mobileMenu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded',open?'true':'false');
  });
}

document.querySelectorAll('[data-contact-form]').forEach(form=>{
  form.addEventListener('submit',async e=>{
    e.preventDefault();
    const status=form.querySelector('.form-status');
    const endpoint=form.dataset.endpoint || '';
    if(!endpoint){
      status.style.display='block';
      status.textContent='El formulario está listo, pero falta conectar el servicio de recepción. Se activará al definir el correo oficial y el hosting.';
      return;
    }
    status.style.display='block';
    status.textContent='Enviando...';
    try{
      const response=await fetch(endpoint,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}});
      if(!response.ok) throw new Error('send');
      form.reset();
      status.textContent='Gracias. Su solicitud fue enviada correctamente.';
    }catch(err){
      status.textContent='No fue posible enviar la solicitud. Intente nuevamente o utilice el canal de contacto publicado.';
    }
  });
});
