


function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  console.log(e.target);
  e.target.classList.remove('playing');
}

function playSound(e) {
  const item = e.target;
  const audio = item.querySelector('.track');
  const key = item.querySelector('.target');

  // item.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

document.querySelectorAll('.brd-btn').forEach( track => {
  // track.addEventListener('transitionend', removeTransition);
  track.addEventListener('click', playSound);
});
