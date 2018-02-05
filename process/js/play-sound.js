
function playSound(e) {
  let item = e.target;
  if (e.target !== e.currentTarget) {
    item = e.target.parentElement;
  }

  const audio = item.querySelector('.track');

  item.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

document.querySelectorAll('.track').forEach( track => {
  track.addEventListener('ended', function(e) {
    e.target.parentElement.classList.remove('playing');
  });
});

document.querySelectorAll('.brd-btn').forEach( btn => {
  btn.addEventListener('click', playSound);
});
