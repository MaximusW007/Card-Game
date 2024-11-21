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
    const cardTracker = document.getElementById('card-tracker'); // Card tracker for visual feedback

    // Game Variables
    let selectedPlayerCount = 2;
    let players = [];
    let currentPlayerIndex = 0;
    let isPictureCard = false;
    let cardsDrawnThisTurn = 0;
    let deckSize = 52;
    const cardValues = [
        '2', '3', '4', '5', '6', '7', '8', '9', '10',
        'J', 'Q', 'K', 'A', 'Joker',
    ];
    let usedCards = [];
    let gameOver = false;

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

    // Initialize the game
    function initializeGame(playerCount) {
        createPlayers(playerCount);
        updateTurnIndicator();
        resetCardTracker(); // Reset tracker for first turn
    }

    // Create players dynamically
    function createPlayers(playerCount) {
        playerArea.innerHTML = ''; // Clear existing players
        players = [];

        for (let i = 1; i <= playerCount; i++) {
            players.push({ id: i, liveScore: 0, bankedScore: 0 });

            // Create player UI
            const playerDiv = document.createElement('div');
            playerDiv.classList.add('player');
            playerDiv.innerHTML = `
                <img src="https://via.placeholder.com/80" alt="Player ${i}" />
                <div class="score-group">
                    <div id="player-${i}-live-score" class="score live-score">Live: 0</div>
                    <div id="player-${i}-banked-score" class="score banked-score">Banked: 0</div>
                    <div id="player-${i}-total-score" class="score total-score">Total: 0</div>
                </div>
            `;
            playerArea.appendChild(playerDiv);
        }
    }

    // Update the turn indicator to show the current player's turn
    function updateTurnIndicator() {
        turnIndicator.textContent = `Player ${players[currentPlayerIndex].id}'s Turn`;
    }

    // Reset card tracker
    function resetCardTracker() {
        cardTracker.innerHTML = ''; // Clear existing dots
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.classList.add('card-dot');
            cardTracker.appendChild(dot);
        }
    }

    // Update card tracker
    function updateCardTracker() {
        const dots = cardTracker.querySelectorAll('.card-dot');
        if (cardsDrawnThisTurn > 0 && cardsDrawnThisTurn <= dots.length) {
            dots[cardsDrawnThisTurn - 1].classList.add('active');
        }
    }

    // Simulate drawing a card
    function drawCard() {
        if (deckSize <= 6) {
            determineWinner();
            return null;
        }

        const randomIndex = Math.floor(Math.random() * cardValues.length);
        const card = cardValues[randomIndex];

        // If Joker is drawn, replace it back into the deck
        if (card === 'Joker') {
            return card; // Joker is not removed
        }

        usedCards.push(card);
        deckSize--;
        return card;
    }

    // Handle deck click to draw a card
    deck.addEventListener('click', () => {
        if (cardsDrawnThisTurn < 3 && !gameOver) {
            const card = drawCard();
            if (!card) return; // No card means game ended

            cardDisplay.textContent = card; // Show the drawn card
            handleCardDraw(card);
            cardsDrawnThisTurn++;
            updateCardTracker(); // Update tracker after card draw

            if (cardsDrawnThisTurn >= 1) {
                endTurnButton.disabled = false; // Enable "End Turn" button
            }

            if (cardsDrawnThisTurn === 3) {
                if (!isPictureCard) {
                    setTimeout(() => endTurnButton.click(), 1500); // Auto-end turn
                }
            }

            setTimeout(() => {
                cardDisplay.textContent = '?'; // Reset card display
            }, 1500);
        }
    });

    // Handle card draw logic
    function handleCardDraw(card) {
        const currentPlayer = players[currentPlayerIndex];

        if (['J', 'Q', 'K'].includes(card)) {
            isPictureCard = true;
            bankHalfButton.disabled = false;
        } else {
            isPictureCard = false;
            bankHalfButton.disabled = true;
        }

        if (card === 'A') {
            currentPlayer.liveScore += 11;
        } else if (card === 'Joker') {
            currentPlayer.liveScore = 0;
        } else if (!['J', 'Q', 'K'].includes(card)) {
            currentPlayer.liveScore += parseInt(card) || 0;
        }

        updatePlayerScores(currentPlayer);
    }

    // Update player scores on the UI and check for winner
    function updatePlayerScores(player) {
        document.getElementById(`player-${player.id}-live-score`).textContent = `Live: ${player.liveScore}`;
        document.getElementById(`player-${player.id}-banked-score`).textContent = `Banked: ${player.bankedScore}`;
        document.getElementById(`player-${player.id}-total-score`).textContent = `Total: ${player.liveScore + player.bankedScore}`;

        if (player.liveScore + player.bankedScore >= 100) {
            endGame(player);
        }
    }

    // End the game when a player reaches 100 points
    function endGame(winningPlayer) {
        gameOver = true;
        alert(`Player ${winningPlayer.id} wins with ${winningPlayer.liveScore + winningPlayer.bankedScore} points!`);
        resetGame();
    }

    // Handle "Bank Half" button
    bankHalfButton.addEventListener('click', () => {
        const currentPlayer = players[currentPlayerIndex];
        if (isPictureCard) {
            currentPlayer.bankedScore += Math.floor(currentPlayer.liveScore / 2);
            currentPlayer.liveScore = 0;
            updatePlayerScores(currentPlayer);
            bankHalfButton.disabled = true;
            nextTurn();
        }
    });

    // Handle "End Turn" button
    endTurnButton.addEventListener('click', () => {
        cardsDrawnThisTurn = 0; // Reset tracker for the next turn
        resetCardTracker();
        nextTurn();
    });

    // Move to the next player's turn
    function nextTurn() {
        cardsDrawnThisTurn = 0;
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        updateTurnIndicator();
        resetCardTracker(); // Reset tracker for the new player
        bankHalfButton.disabled = true;
        endTurnButton.disabled = true;
    }

    // Reset the game
    function resetGame() {
        location.reload();
    }
});
