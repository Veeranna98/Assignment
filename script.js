const images = document.querySelectorAll('img');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const para = document.getElementById('para');
const h = document.getElementById('p');
let clickedImages = [];
let state = 1;

function shuffleImages() {
  const parent = document.getElementById('images');
  for (let i = parent.children.length; i >= 0; i--) {
    parent.appendChild(parent.children[Math.random() * i | 0]);
  }
}

function reset() {
  clickedImages = [];
  images.forEach(img => img.classList.remove('selected'));
  resetButton.style.display = 'none';
  verifyButton.style.display = 'none';
  para.style.display = 'none';
  state = 1;
  h.innerText = 'Please click on the identical tiles to verify that you are not a robot.';
}

function checkIdentical() {
  return clickedImages.every((img, index, array) => img === array[0]);
}

function handleClick(event) {
  const clickedImg = event.target;
  if (!clickedImages.includes(clickedImg.classList[0]) && clickedImages.length < 2) {
    clickedImg.classList.add('selected');
    clickedImages.push(clickedImg.classList[0]);

    if (clickedImages.length === 2) {
      verifyButton.style.display = 'inline-block';
    }
  }
  else {
    para.innerText = 'You can select maximum two images.';
    para.classList.add('red');
    setTimeout(() => {
      para.innerText = '';
      para.classList.remove('red');
    }, 2000);
  }
}

function verify() {
    verifyButton.innerText = 'Verifying...';
    setTimeout(() => {
        if (checkIdentical()) {
            para.innerText = 'You are a human. Congratulations!';
        } else {
            para.innerText = 'We can\'t verify you as a human. You selected the non-identical tiles.';
        }
        verifyButton.style.display = 'none';
        para.style.display = 'block';
        resetButton.style.display = 'inline-block';
        verifyButton.innerText = 'Verify'; 
    }, 1000);
}
function reset() {
    clickedImages = [];
    images.forEach(img => img.classList.remove('selected'));
    resetButton.style.display = 'none';
    verifyButton.style.display = 'none';
    para.style.display = 'none';
    state = 1;
    h.innerText = 'Please click on the identical tiles to verify that you are not a robot.';
    shuffleImages();
  }
  
images.forEach(img => img.addEventListener('click', handleClick));
resetButton.addEventListener('click', reset);
verifyButton.addEventListener('click', verify);

shuffleImages();