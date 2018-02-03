
function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  console.log(e.target);
  e.target.classList.remove('playing');
}

function playSound(e) {
  let item = e.target;
  if (e.target !== e.currentTarget) {
    item = e.target.parentElement;
  }
  const audio = item.querySelector('.track');

  // item.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

document.querySelectorAll('.brd-btn').forEach( btn => {
  // track.addEventListener('transitionend', removeTransition);
  btn.addEventListener('click', playSound);
});
