// Anime.js 4: se importan las funciones desde el objeto global de la versión UMD.
const { animate, stagger, createTimeline } = anime;
const title = document.querySelector('.title');
const subtitle = document.querySelector('.subtitle');
const tag = document.querySelector('.tag');
const device = document.querySelector('.device');
const rings = document.querySelectorAll('.ring');
let timeline;

// Secuencia principal: outExpo da una entrada rápida que desacelera suavemente.
function playIntro() {
  if (timeline) timeline.pause();
  animate([title, subtitle, tag], { opacity: 0, translateY: 20, duration: 0 });
  animate(device, { opacity: 0, scale: .7, rotate: -25, duration: 0 });
  animate(rings, { opacity: 0, scale: .7, duration: 0 });
  timeline = createTimeline({ defaults: { duration: 750, ease: 'outExpo' } });
  timeline.add(tag, { opacity: [0,1], translateY: [18,0] })
    .add(title, { opacity: [0,1], translateY: [35,0] }, '-=480')
    .add(subtitle, { opacity: [0,1], translateY: [20,0] }, '-=450')
    .add(device, { opacity: [0,1], scale: [.7,1], rotate: [-25,-12] }, '-=500')
    .add(rings, { opacity: [.1,.8], scale: [.7,1], delay: stagger(130) }, '-=550');
}
playIntro();

// Contadores: animamos objetos JS y actualizamos el texto en cada fotograma.
function countStats() {
  document.querySelectorAll('.stat strong').forEach((el, i) => {
    const counter = { value: 0 };
    const target = Number(el.dataset.count);
    animate(counter, { value: target, duration: 1300, delay: i * 180, ease: 'outCubic',
      onUpdate: () => el.textContent = Math.round(counter.value) + (i === 1 ? '%' : i === 0 ? 'h' : '') });
  });
}
countStats();

// Microinteracción con ease elástico: el dispositivo responde al clic.
device.addEventListener('click', () => animate(device, { scale: [1,1.08,1], duration: 700, ease: 'outElastic(1,.5)' }));
document.querySelector('#replay').addEventListener('click', () => { playIntro(); countStats(); });
document.querySelector('#explore').addEventListener('click', () => {
  animate('.stats', { translateY: [25,0], opacity: [0,1], duration: 650, ease: 'outBack' });
  document.querySelector('.stats').scrollIntoView({ behavior: 'smooth', block: 'center' });
});