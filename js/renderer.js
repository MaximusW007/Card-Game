window.addEventListener('DOMContentLoaded', () => {
  // References to buttons on the title screen
  const playButton = document.getElementById('play-game');
  const rulesButton = document.getElementById('view-rules');
  const mainMenu = document.getElementById('main-menu');
  const rulesScreen = document.getElementById('rules-screen');
  const backButton = document.getElementById('back-to-menu');

  // Navigate to game.html when "Play" is clicked
  if (playButton) {
    playButton.addEventListener('click', () => {
      window.location.href = '../pages/game.html'; // Navigate to the game screen
    });
  }

  // Show the Rules screen
  if (rulesButton) {
    rulesButton.addEventListener('click', () => {
      mainMenu.classList.add('hidden');
      rulesScreen.classList.remove('hidden');
    });
  }

  // Go back to the Main Menu
  if (backButton) {
    backButton.addEventListener('click', () => {
      rulesScreen.classList.add('hidden');
      mainMenu.classList.remove('hidden');
    });
  }
});
