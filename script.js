'use strict';
/*
// 82. PROJECT #3: Pig Game

// vamos colocar os scores em 0 e fazer o dado desaparecer.
const score0 = document.querySelector('#score--0');
const score1 = document.querySelector('#score--1');


// há outra forma de seleciona elementos por ID.
// Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
// getElementById é para ser mais rápido que o querySelector.

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
// especificamos número e não string, mas o JS vai converter para string.

// esconder o dado. vamos criar uma classe hidden no CSS.
const diceEl = document.querySelector('.dice');
diceEl.classList.add('hidden');


// 83. Rolling the Dice
// Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
// Selecting current score
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
// Selecting buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// criar currentScore
let currentScore = 0;

// Rolling dice functionality
// como não vai ser uma função reutilizável, vamos escrever direto no eventlistener.
btnRoll.addEventListener('click', function () {
  // 1. Generating a random dice roll
  // vamos criar uma variável local, não global, só será usada aqui dentro. random cria um número entre 0 e 0.99999.
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);

  // 2. Display dice
  // primeiro vamos remover a classe hidden para mostrar o dado.
  diceEl.classList.remove('hidden');
  // mostrar imagem do dado baseado no número do dice. mudar o src da img.
  diceEl.src = `dice-${dice}.png`;

  // 3. Check for rolled 1
  if (dice !== 1) {
    // Add dice do the current score
    // currentScore = currentScore + dice;
    currentScore += dice;
    current0El.textContent = currentScore;
    // vamos só mostrar no player 1 por enquanto.
  } else {
    // Switch to next player

    console.log('it is 1');
  }
});


// 84. Switching the Active Player
// Selecting the class of player--0 e --1
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

// array com os scores. é o score grande que vai acumulando a cada rodada.
const scores = [0, 0];
let currentScore = 0;

// vamos criar uma variável que será 0 se o for o player 1, e 1 se for o player 2 que estiver jogando. isso pq vamos armazenar os score em um array.
let activePlayer = 0;

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  // 1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // 2. Display dice
  diceEl.classList.remove('hidden');
  diceEl.src = `dice-${dice}.png`;

  // 3. Check for rolled 1
  if (dice !== 1) {
    // Add dice do the current score
    // currentScore = currentScore + dice;
    currentScore += dice;
    // vamos selecionar o elemento dinamicamente.
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // Switch to next player
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    // antes de trocar o player temos que mudar o current score dele para 0.
    // a variável currentScore não está atrelada a nenhum player.
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    // se o activePlayer é 0, muda para 1, se não muda para 0.

    // para alterar a parte visual queremos remover ou adicionar a classe player--active
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
  }
});


// 85. Holding Current Score

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

// Vamos criar uma variável para ver se o jogo está sendo jogado, ou alguém já ganhou (desativa os botões).
let playing = true;

// Switch to next player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice do the current score
      // currentScore = currentScore + dice;
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    // scores[1] = scores[1] + currentScore;
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 10) {
      // Finish the game
      playing = false;
      // hide the dice
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});
*/

// 86. Resetting the Game
// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// temos que criar essas variáveis fora da função init, para poder acessar elas fora da init.
// podemos criar várias variáveis de uma vez só, se não declararmos valor para elas.
let scores, currentScore, activePlayer, playing;

// Initialization
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
// temos que chamar essa função qd carrega a página
init();

// Switch to next player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      // Add dice do the current score
      // currentScore = currentScore + dice;
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    // scores[1] = scores[1] + currentScore;
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      // hide the dice
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// Resetting the Game
btnNew.addEventListener('click', init);
