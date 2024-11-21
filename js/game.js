window.addEventListener('DOMContentLoaded', () => {
    const playerCountScreen = document.getElementById('player-count-screen');
    const gameScreen = document.getElementById('game-screen');
    const slider = document.getElementById('player-slider');
    const playerCountDisplay = document.getElementById('player-count-display');
    const startGameButton = document.getElementById('start-game');
  
    let selectedPlayerCount = 2; // Default player count
  
    // Update player count dynamically when slider changes
    slider.addEventListener('input', () => {
      selectedPlayerCount = slider.value;
      playerCountDisplay.textContent = `Players: ${selectedPlayerCount}`;
    });
  
    // Start the game when "Start Game" button is clicked
    startGameButton.addEventListener('click', () => {
      // Fade out the player count screen
      playerCountScreen.classList.add('fade-out');
  
      // Wait for the fade-out animation to finish, then show the game screen
      setTimeout(() => {
        playerCountScreen.classList.add('hidden'); // Hide player count screen
        gameScreen.classList.remove('hidden'); // Show game screen
  
        // Initialize the game (you can call a function here to set up the game)
        initializeGame(selectedPlayerCount);
      }, 1000); // Match the fade-out animation duration
    });
  
    // Placeholder function to initialize the game
    function initializeGame(playerCount) {
      console.log(`Game starting with ${playerCount} players...`);
      const gameContent = document.getElementById('game-content');
      gameContent.textContent = `Game initialized for ${playerCount} players.`;
    }
  });
  