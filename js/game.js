window.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const playerCountScreen = document.getElementById('player-count-screen');
    const gameScreen = document.getElementById('game-screen');
    const slider = document.getElementById('player-slider');
    const playerCountDisplay = document.getElementById('player-count-display');
    const startGameButton = document.getElementById('start-game');
    const playerArea = document.getElementById('player-area');
    const turnIndicator = document.getElementById('turn-indicator');
    const deck = document.getElementById('deck');
    const cardDisplay = document.getElementById('card-display');
    const bankHalfButton = document.getElementById('bank-half');
    const endTurnButton = document.getElementById('end-turn');
  
    // Game Variables
    let selectedPlayerCount = 2; // Default player count
    let players = [];
    let currentPlayerIndex = 0;
    let isPictureCard = false; // Track if a picture card was drawn
    let cardsDrawnThisTurn = 0; // Track the number of cards drawn in the current turn
    const cardValues = [
      '2', '3', '4', '5', '6', '7', '8', '9', '10',
      'J', 'Q', 'K', 'A', 'Joker',
    ];
  
    // Update player count dynamically when slider changes
    slider.addEventListener('input', () => {
      selectedPlayerCount = slider.value;
      playerCountDisplay.textContent = `Players: ${selectedPlayerCount}`;
    });
  
    // Start the game when "Start Game" button is clicked
    startGameButton.addEventListener('click', () => {
      playerCountScreen.classList.add('fade-out');
  
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
  
    // Simulate drawing a card
    function drawCard() {
      const randomIndex = Math.floor(Math.random() * cardValues.length);
      return cardValues[randomIndex];
    }
  
    // Handle deck click to draw a card
    deck.addEventListener('click', () => {
      if (cardsDrawnThisTurn < 3) {
        const card = drawCard();
        cardDisplay.textContent = card; // Show the drawn card
        console.log(`Player ${players[currentPlayerIndex].id} drew: ${card}`);
        handleCardDraw(card);
        cardsDrawnThisTurn++;
  
        if (cardsDrawnThisTurn >= 1) {
          endTurnButton.disabled = false; // Enable "End Turn" button after the first draw
        }
  
        if (cardsDrawnThisTurn === 3) {
          endTurnButton.disabled = true; // Disable "End Turn" button after 3 draws
          setTimeout(nextTurn, 1000); // Automatically end turn after 3 cards
        }
  
        // Hide the card value after 1.5 seconds
        setTimeout(() => {
          cardDisplay.textContent = '?'; // Reset the deck display
        }, 1500);
      }
    });
  
    // Handle card draw logic
    function handleCardDraw(card) {
      const currentPlayer = players[currentPlayerIndex];
  
      if (['J', 'Q', 'K'].includes(card)) {
        isPictureCard = true;
        bankHalfButton.disabled = false;
      } else if (card === 'Joker') {
        // Joker logic: Reset player's score
        currentPlayer.score = 0;
        document.getElementById(
          `player-${currentPlayer.id}-score`
        ).textContent = `Score: 0`;
      } else {
        // Add card value to player's score
        currentPlayer.score += parseInt(card) || 0;
        document.getElementById(
          `player-${currentPlayer.id}-score`
        ).textContent = `Score: ${currentPlayer.score}`;
      }
    }
  
    // Handle "Bank Half" button
    bankHalfButton.addEventListener('click', () => {
      if (isPictureCard) {
        const currentPlayer = players[currentPlayerIndex];
        currentPlayer.score = Math.floor(currentPlayer.score / 2);
        document.getElementById(
          `player-${currentPlayer.id}-score`
        ).textContent = `Score: ${currentPlayer.score}`;
        bankHalfButton.disabled = true;
        isPictureCard = false;
      }
    });
  
    // Handle "End Turn" button
    endTurnButton.addEventListener('click', () => {
      if (cardsDrawnThisTurn >= 1) {
        endTurnButton.disabled = true;
        bankHalfButton.disabled = true;
        isPictureCard = false;
        setTimeout(nextTurn, 1000);
      }
    });
  
    // Move to the next player's turn
    function nextTurn() {
      cardsDrawnThisTurn = 0; // Reset card count for the next turn
      currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
      updateTurnIndicator();
      endTurnButton.disabled = true; // Disable "End Turn" button initially
      bankHalfButton.disabled = true; // Disable "Bank Half" button initially
    }
  });
  