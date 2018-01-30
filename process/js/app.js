function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function playSound(e) {
  const audio = document.querySelector('.track');
  const key = document.querySelector('.target');

  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

document.querySelector('.target').addEventListener('transitionend', removeTransition);
document.querySelector('.target').addEventListener('click', playSound);
