const t = window.shardotI18n.t;
const shots = {
  combo: { src: 'assets/combo-points.webp', width: 536, height: 394, alt: 'Un punto de combo dorado y cuatro vacíos debajo del personaje durante un combate', caption: 'Puntos de combo. La información donde la necesitás.' },
  squares: { src: 'assets/combo-segments.webp', width: 378, height: 320, alt: 'Cinco segmentos cuadrados de puntos de combo debajo del personaje', caption: 'Segmentos cuadrados para un HUD más compacto.' },
  icon: { src: 'assets/soul-shard-icon.webp', width: 700, height: 410, alt: 'Icono de fragmento de alma con un contador de dos unidades', caption: 'Tus fragmentos de alma, con el icono del objeto.' },
  count: { src: 'assets/soul-shard-counter.webp', width: 751, height: 462, alt: 'Contador de dos fragmentos de alma y barra de progreso', caption: 'Un contador independiente con barra de objetivo.' },
};

const galleryImage = document.querySelector('#gallery-image');
const galleryCaption = document.querySelector('#gallery-caption');
const dialog = document.querySelector('#image-dialog');
const dialogImage = document.querySelector('#dialog-image');
const dialogCaption = document.querySelector('#dialog-caption');
let currentShot = shots.combo;

document.querySelectorAll('[data-shot]').forEach((button) => {
  button.addEventListener('click', () => {
    const shot = shots[button.dataset.shot];
    if (!shot) return;
    currentShot = shot;
    galleryImage.src = shot.src;
    galleryImage.alt = t(shot.alt);
    galleryCaption.textContent = t(shot.caption);
    document.querySelectorAll('[data-shot]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  });
});

document.querySelector('.image-open').addEventListener('click', () => {
  dialogImage.src = currentShot.src;
  dialogImage.alt = t(currentShot.alt);
  dialogImage.width = currentShot.width;
  dialogImage.height = currentShot.height;
  dialogCaption.textContent = t(currentShot.caption);
  dialog.showModal();
});
dialog.addEventListener('click', (event) => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});

const points = document.querySelector('#demo-points');
const range = document.querySelector('#points-range');
const progression = document.querySelector('#progression');
const output = document.querySelector('#points-output');
const colors = ['#e9bc4f', '#e9bc4f', '#eba33c', '#ed8536', '#ef6032', '#ef4232'];

function updatePoints() {
  const count = Number(range.value);
  points.querySelectorAll('i').forEach((point, index) => point.classList.toggle('active', index < count));
  points.style.setProperty('--point-color', progression.checked ? colors[count] : '#b492e4');
  points.setAttribute('aria-label', t('{count} de 5 puntos de combo').replace('{count}', String(count)));
  output.value = `${count} / 5`;
}
range.addEventListener('input', updatePoints);
progression.addEventListener('change', updatePoints);
document.querySelectorAll('[data-shape]').forEach((button) => {
  button.addEventListener('click', () => {
    points.className = `demo-points ${button.dataset.shape}`;
    document.querySelectorAll('[data-shape]').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
  });
});
updatePoints();

const copyButton = document.querySelector('[data-copy]');
let copyTimeout;
copyButton.addEventListener('click', async () => {
  const label = copyButton.querySelector('span');
  const status = document.querySelector('#copy-status');
  clearTimeout(copyTimeout);
  try {
    await navigator.clipboard.writeText(copyButton.dataset.copy);
    label.textContent = t('¡Copiado!');
    status.textContent = t('Comando /shardot copiado.');
  } catch {
    label.textContent = t('Seleccioná y copiá el comando');
    status.textContent = t('No se pudo acceder al portapapeles. Seleccioná el comando /shardot para copiarlo.');
    const selection = window.getSelection();
    const selectionRange = document.createRange();
    selectionRange.selectNodeContents(copyButton.querySelector('code'));
    selection.removeAllRanges();
    selection.addRange(selectionRange);
  }
  copyTimeout = setTimeout(() => { label.textContent = t('Copiar comando ⧉'); status.textContent = ''; }, 3500);
});

window.addEventListener('languagechange', () => {
  galleryImage.alt = t(currentShot.alt);
  galleryCaption.textContent = t(currentShot.caption);
  dialogImage.alt = t(currentShot.alt);
  dialogCaption.textContent = t(currentShot.caption);
  copyButton.querySelector('span').textContent = t('Copiar comando ⧉');
  document.querySelector('#copy-status').textContent = '';
  updatePoints();
});
