let startGameButton = document.getElementById('start-game');
const gameContainer = document.getElementById('containerRow');
const gameBoard = document.getElementById('gameBoard');
const gameOver = document.getElementById('game-over-row');
const restart = document.getElementById('restart');
const Time = document.getElementById('time');
let timer = null; // global timer id

const allEmojis = ['🎯', '🚀', '🍕', '🎮', '🎲', '🚗', '🐱', '🎵', '🌟', '🍀', '🌈', '🎁', '🔥', '🐶', '📦', '💎'];
function getRandomEmojis(count = 8) {
  const shuffled = allEmojis.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function startMemoryGame() {
    // Tozalash
    if (timer) clearInterval(timer);
    Time.innerHTML = '0';
    gameContainer.style.display = 'none';
    gameOver.style.display = 'none';
    gameBoard.innerHTML = '';

    // Timer boshlash
    timer = setInterval(() => {
        Time.innerHTML = parseInt(Time.innerHTML) + 1;
    }, 1000);

    const emojis = getRandomEmojis();
    let cards = [...emojis, ...emojis];
    cards = cards.sort(() => 0.5 - Math.random());

    let flippedCards = [];

    cards.forEach((emoji) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <div class="card-inner">
            <div class="card-front"><img src="img/logo.png" alt="logo" style="height:50px"></div>
            <div class="card-back">${emoji}</div>
        </div>
      `;
      card.dataset.emoji = emoji;

      card.addEventListener('click', () => {
        if (
          card.classList.contains('flipped') ||
          flippedCards.length === 2
        ) return;

        card.classList.add('flipped');
        flippedCards.push(card);

        if (flippedCards.length === 2) {
          const [first, second] = flippedCards;
          if (first.dataset.emoji === second.dataset.emoji) {
            flippedCards = [];
            // Barcha kartalar ochildimi tekshiramiz
            if (document.querySelectorAll('.card.flipped').length === cards.length) {
              clearInterval(timer);
              gameOver.style.display = 'flex';
              document.getElementById('final-time').innerText = Time.innerHTML;
            }
          } else {
            setTimeout(() => {
              first.classList.remove('flipped');
              second.classList.remove('flipped');
              flippedCards = [];
            }, 1000);
          }
        }
      });

      gameBoard.appendChild(card);
    });
}

startGameButton.addEventListener('click', startMemoryGame);
restart.addEventListener('click', startMemoryGame);