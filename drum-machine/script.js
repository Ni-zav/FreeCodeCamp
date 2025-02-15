document.addEventListener('DOMContentLoaded', () => {
  const drumPads = document.querySelectorAll('.drum-pad');
  const display = document.getElementById('display');

  const playSound = (pad) => {
    const audio = pad.querySelector('audio');
    const displayText = pad.id.replace(/-/g, ' ').toUpperCase();
    
    audio.currentTime = 0;
    audio.play();
    display.textContent = displayText;
    
    pad.classList.add('active');
    setTimeout(() => pad.classList.remove('active'), 100);
  };

  drumPads.forEach(pad => {
    pad.addEventListener('click', () => playSound(pad));
  });

  document.addEventListener('keydown', (e) => {
    const key = e.key.toUpperCase();
    const pad = document.querySelector(`.drum-pad:has(audio[id="${key}"])`);
    if (pad) playSound(pad);
  });
});
