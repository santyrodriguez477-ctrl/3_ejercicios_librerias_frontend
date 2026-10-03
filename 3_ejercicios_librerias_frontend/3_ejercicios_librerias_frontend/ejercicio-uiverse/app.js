// Interacción del toggle: cambia entre tema oscuro y claro.
document.querySelector('#tema').addEventListener('change', e => document.body.classList.toggle('light', e.target.checked));
// Los botones de producto rellenan el mensaje del formulario.
document.querySelectorAll('.buy').forEach(btn => btn.addEventListener('click', () => {
  document.querySelector('#mensaje').value = `Hola, me interesa ${btn.dataset.producto}.`;
  document.querySelector('#contacto').scrollIntoView({behavior:'smooth'});
}));
// Validación HTML + respuesta local de demostración (no envía datos a un servidor).
document.querySelector('#form').addEventListener('submit', e => {
  e.preventDefault();
  document.querySelector('#respuesta').textContent = `¡Gracias, ${document.querySelector('#nombre').value}! Tu mensaje quedó registrado en esta demostración.`;
  e.target.reset();
});