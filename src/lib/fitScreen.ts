const BASE = 1920;
const MIN = 1280;

const fit = () => {
  const w = window.innerWidth;
  const root = document.documentElement;
  const z = w >= MIN && w < BASE ? w / BASE : 1;
  root.style.setProperty('zoom', z === 1 ? '' : String(z));
  root.style.setProperty('--site-zoom', String(z));
};

fit();
window.addEventListener('resize', fit);

export default fit;
