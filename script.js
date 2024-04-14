const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        console.log('Ah nah thats the same one bud');
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if (!timeUp) peep();
    }, time);
}
function endGame() {
    const popup = document.querySelector('.popup');
    const finalScore = document.querySelector('.final-score');
    finalScore.textContent = score;
    popup.style.display = 'block';
}

function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    let countdown = 10;
    const countdownDisplay = document.querySelector('.countdown');

    const countdownInterval = setInterval(() => {
        countdown--;
        countdownDisplay.textContent = countdown;
        if (countdown === 0) {
            clearInterval(countdownInterval);
            timeUp = true;
            endGame();
        }
    }, 1000);
    peep();

    setTimeout(() => {
        timeUp = true;
        endGame();
    }, 10000);
    
}


function bonk(e) {
    if (!e.isTrusted) return; // cheater!
    score++;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(mole => mole.addEventListener('click', bonk));

