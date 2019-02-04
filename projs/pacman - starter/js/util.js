var elModal = document.querySelector('.modal');
var elModalHeading = document.querySelector('.modal h3');

function getRandomColor() {
  var letters = '0123456789ABCDEF'.split('');
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  if (color === '#0000CD') return getRandomColor();
  return color;
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function openModal(result) {
  if (result === 'LOSS') elModalHeading.innerText = 'Game over!';
  else elModalHeading.innerText = 'You are victorious!!';
	elModal.style.display = 'block';
}

function closeModal() {
	elModal.style.display = 'none';
}