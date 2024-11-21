window.addEventListener('DOMContentLoaded', () => {
  // References to screens and buttons
  const mainMenu = document.getElementById('main-menu');
  const rulesScreen = document.getElementById('rules-screen');
  const rulesButton = document.getElementById('view-rules');
  const backButton = document.getElementById('back-to-menu');

  // Show the Rules screen
  rulesButton.addEventListener('click', () => {
    mainMenu.classList.add('hidden');
    rulesScreen.classList.remove('hidden');
  });

  // Go back to the Main Menu
  backButton.addEventListener('click', () => {
    rulesScreen.classList.add('hidden');
    mainMenu.classList.remove('hidden');
  });
});
