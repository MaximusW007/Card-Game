window.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const playerCountScreen = document.getElementById('player-count-screen');
    const gameScreen = document.getElementById('game-screen');
    const slider = document.getElementById('player-slider');
    const playerCountDisplay = document.getElementById('player-count-display');
    const startGameButton = document.getElementById('start-game');
    const playerArea = document.getElementById('player-area');
    const turnIndicator = document.getElementById('turn-indicator');
    const deckElement = document.getElementById('deck');
    const cardDisplay = document.getElementById('card-display');
    const bankHalfButton = document.getElementById('bank-half');
    const endTurnButton = document.getElementById('end-turn');
    const cardTracker = document.getElementById('card-tracker');
    const shuffleButton = document.getElementById('shuffle-deck'); // Shuffle button

    // Game Variables
    let selectedPlayerCount = 2;
    let players = [];
    let currentPlayerIndex = 0;
    let isPictureCard = false;
    let cardsDrawnThisTurn = 0;
    let deck = [];
    let usedCards = [];
    let gamePaused = false; // Tracks if the game is paused (e.g., during shuffle)

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

    // Initialize the game
    function initializeGame(playerCount) {
        shuffleButton.classList.add('hidden'); // Ensure shuffle button is hidden at the start
        createPlayers(playerCount);
        initializeDeck();
        updateTurnIndicator();
        resetCardTracker();
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

    // Initialize the deck
    function initializeDeck() {
        deck = [...cardValues, ...cardValues, 'Joker', 'Joker'];
        shuffleDeck(deck);
    }

    // Shuffle the deck
    function shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]]; // Swap cards
        }
    }

    // Update turn indicator
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

    // Draw a card
    function drawCard() {
        if (deck.length === 0) {
            determineWinner();
            return null;
        }
        const card = deck.pop();
        usedCards.push(card);
        return card;
    }

    // Deck click handler
    deckElement.addEventListener('click', () => {
        if (gamePaused || cardsDrawnThisTurn >= 3) return;

        const card = drawCard();
        if (!card) return;

        cardDisplay.textContent = card; // Display the card
        handleCardDraw(card);
        cardsDrawnThisTurn++;
        updateCardTracker();

        if (cardsDrawnThisTurn >= 1) {
            endTurnButton.disabled = false; // Enable "End Turn" button
        }

        if (cardsDrawnThisTurn === 3 && !isPictureCard) {
            setTimeout(() => endTurnButton.click(), 1500); // Auto-end turn
        }

        setTimeout(() => {
            cardDisplay.textContent = '?'; // Reset card display
        }, 1500);
    });

    // Handle card draw logic
    function handleCardDraw(card) {
        if (card === 'Joker') {
            handleJokerDraw();
            return;
        }

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
        } else {
            currentPlayer.liveScore += parseInt(card) || 0;
        }

        updatePlayerScores(currentPlayer);
    }

    // Handle Joker draw
    function handleJokerDraw() {
        const currentPlayer = players[currentPlayerIndex];
        currentPlayer.liveScore = 0; // Reset live score
        updatePlayerScores(currentPlayer);

        // Reset tracker and disable buttons
        cardsDrawnThisTurn = 0; // Reset card count
        resetCardTracker(); // Reset card tracker UI
        shuffleButton.classList.remove('hidden'); // Show shuffle button
        disableGameplay();
    }

    // Shuffle button logic
    shuffleButton.addEventListener('click', () => {
        deck = [...deck, ...usedCards];
        usedCards = [];
        shuffleDeck(deck);
        shuffleButton.classList.add('hidden');
        enableGameplay();
        cardsDrawnThisTurn = 0; // Ensure cardsDrawnThisTurn resets properly
        nextTurn();
    });

    // Disable all gameplay buttons
    function disableGameplay() {
        gamePaused = true;
        deckElement.style.pointerEvents = 'none';
        bankHalfButton.disabled = true;
        endTurnButton.disabled = true;
    }

    // Enable all gameplay buttons
    function enableGameplay() {
        gamePaused = false;
        deckElement.style.pointerEvents = 'auto';
        bankHalfButton.disabled = true;
        endTurnButton.disabled = true;
    }

    // Update player scores
    function updatePlayerScores(player) {
        document.getElementById(`player-${player.id}-live-score`).textContent = `Live: ${player.liveScore}`;
        document.getElementById(`player-${player.id}-banked-score`).textContent = `Banked: ${player.bankedScore}`;
        document.getElementById(`player-${player.id}-total-score`).textContent = `Total: ${player.liveScore + player.bankedScore}`;
    }

    // Bank Half functionality
    bankHalfButton.addEventListener('click', () => {
        if (gamePaused) return;

        const currentPlayer = players[currentPlayerIndex];
        if (isPictureCard) {
            currentPlayer.bankedScore += Math.floor(currentPlayer.liveScore / 2);
            currentPlayer.liveScore = 0;
            updatePlayerScores(currentPlayer);

            cardsDrawnThisTurn = 0;
            resetCardTracker();
            nextTurn();
        }
    });

    // End turn
    endTurnButton.addEventListener('click', () => {
        if (gamePaused) return;

        cardsDrawnThisTurn = 0;
        resetCardTracker();
        nextTurn();
    });

    // Move to the next turn
    function nextTurn() {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        updateTurnIndicator();
        resetCardTracker();
        bankHalfButton.disabled = true;
        endTurnButton.disabled = true;
        cardsDrawnThisTurn = 0; // Reset card count explicitly here
    }

    // Determine the winner
    function determineWinner() {
        let highestScore = 0;
        let winners = [];

        players.forEach((player) => {
            const totalScore = player.liveScore + player.bankedScore;
            if (totalScore > highestScore) {
                highestScore = totalScore;
                winners = [player];
            } else if (totalScore === highestScore) {
                winners.push(player);
            }
        });

        if (winners.length === 1) {
            alert(`Player ${winners[0].id} wins with ${highestScore} points!`);
        } else {
            alert(
                `It's a tie between ${winners.map((w) => `Player ${w.id}`).join(', ')} with ${highestScore} points each!`
            );
        }
        resetGame();
    }

    // Reset the game
    function resetGame() {
        location.reload();
    }
});
