window.addEventListener('DOMContentLoaded', () => {
    const playerCountScreen = document.getElementById('player-count-screen');
    const gameScreen = document.getElementById('game-screen');
    const slider = document.getElementById('player-slider');
    const playerCountDisplay = document.getElementById('player-count-display');
    const startGameButton = document.getElementById('start-game');
    const playerArea = document.getElementById('player-area');
    const turnIndicator = document.getElementById('turn-indicator');
    const deck = document.getElementById('deck');
    const bankHalfButton = document.getElementById('bank-half');
  
    let selectedPlayerCount = 2; // Default player count
    let players = [];
    let currentPlayerIndex = 0;
    let isPictureCard = false; // Track whether a picture card was drawn
  
    // Update player count dynamically when slider changes
    slider.addEventListener('input', () => {
      selectedPlayerCount = slider.value;
      playerCountDisplay.textContent = `Players: ${selectedPlayerCount}`;
    });
  
    // Start the game when "Start Game" button is clicked
    startGameButton.addEventListener('click', () => {
      playerCountScreen.classList.add('fade-out');
  
      // Wait for the fade-out animation to finish, then show the game screen
      setTimeout(() => {
        playerCountScreen.classList.add('hidden'); // Hide player count screen
        gameScreen.classList.remove('hidden'); // Show game screen
        initializeGame(selectedPlayerCount);
      }, 1000);
    });
  
    // Initialize the game with the selected number of players
    function initializeGame(playerCount) {
      console.log(`Game starting with ${playerCount} players...`);
      createPlayers(playerCount);
      updateTurnIndicator();
    }
  
    // Create players dynamically
    function createPlayers(playerCount) {
      playerArea.innerHTML = ''; // Clear existing players
      players = [];
  
      for (let i = 1; i <= playerCount; i++) {
        players.push({ id: i, score: 0 });
  
        // Create player UI
        const playerDiv = document.createElement('div');
        playerDiv.classList.add('player');
        playerDiv.innerHTML = `
          <img src="https://via.placeholder.com/80" alt="Player ${i}" />
          <div class="score" id="player-${i}-score">Score: 0</div>
        `;
        playerArea.appendChild(playerDiv);
      }
    }
  
    // Update the turn indicator to show the current player's turn
    function updateTurnIndicator() {
      turnIndicator.textContent = `Player ${players[currentPlayerIndex].id}'s Turn`;
    }
  
    // Handle card draws
    deck.addEventListener('click', () => {
      const card = drawCard();
      console.log(`Player ${players[currentPlayerIndex].id} drew: ${card}`);
      handleCardDraw(card);
    });
  
    // Simulate drawing a card
    function drawCard() {
      const cardTypes = [
        '2', '3', '4', '5', '6', '7', '8', '9', '10',
        'J', 'Q', 'K', 'A', 'Joker'
      ];
      const randomIndex = Math.floor(Math.random() * cardTypes.length);
      return cardTypes[randomIndex];
    }
  
    // Handle the logic when a card is drawn
    function handleCardDraw(card) {
      if (['J', 'Q', 'K'].includes(card)) {
        isPictureCard = true;
        bankHalfButton.disabled = false;
      } else if (card === 'Joker') {
        // Joker logic: Reset player's score
        players[currentPlayerIndex].score = 0;
        document.getElementById(
          `player-${players[currentPlayerIndex].id}-score`
        ).textContent = `Score: 0`;
      } else {
        // Add card value to player's score
        players[currentPlayerIndex].score += parseInt(card) || 0;
        document.getElementById(
          `player-${players[currentPlayerIndex].id}-score`
        ).textContent = `Score: ${players[currentPlayerIndex].score}`;
      }
  
      // End turn and move to next player
      setTimeout(nextTurn, 1000);
    }
  
    // Move to the next player's turn
    function nextTurn() {
      isPictureCard = false;
      bankHalfButton.disabled = true;
      currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
      updateTurnIndicator();
    }
  
    // Handle "Bank Half" button
    bankHalfButton.addEventListener('click', () => {
      if (isPictureCard) {
        const player = players[currentPlayerIndex];
        player.score = Math.floor(player.score / 2);
        document.getElementById(
          `player-${player.id}-score`
        ).textContent = `Score: ${player.score}`;
        bankHalfButton.disabled = true;
        isPictureCard = false;
      }
    });
  });
  