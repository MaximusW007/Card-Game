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
    const shuffleButton = document.getElementById('shuffle-deck');

    // Game Variables
    let selectedPlayerCount = 2;
    let players = [];
    let currentPlayerIndex = 0;
    let isPictureCard = false;
    let cardsDrawnThisTurn = 0;
    let deck = [];
    let usedCards = [];
    let gamePaused = false;

    const cardDeck = [
        // Hearts
        { name: '2H', value: 2, suit: 'hearts', image: '../Resources/cards/2H.png' },
        { name: '3H', value: 3, suit: 'hearts', image: '../Resources/cards/3H.png' },
        { name: '4H', value: 4, suit: 'hearts', image: '../Resources/cards/4H.png' },
        { name: '5H', value: 5, suit: 'hearts', image: '../Resources/cards/5H.png' },
        { name: '6H', value: 6, suit: 'hearts', image: '../Resources/cards/6H.png' },
        { name: '7H', value: 7, suit: 'hearts', image: '../Resources/cards/7H.png' },
        { name: '8H', value: 8, suit: 'hearts', image: '../Resources/cards/8H.png' },
        { name: '9H', value: 9, suit: 'hearts', image: '../Resources/cards/9H.png' },
        { name: '10H', value: 10, suit: 'hearts', image: '../Resources/cards/10H.png' },
        { name: 'JH', value: 10, suit: 'hearts', image: '../Resources/cards/JH.png' },
        { name: 'QH', value: 10, suit: 'hearts', image: '../Resources/cards/QH.png' },
        { name: 'KH', value: 10, suit: 'hearts', image: '../Resources/cards/KH.png' },
        { name: 'AH', value: 11, suit: 'hearts', image: '../Resources/cards/AH.png' },
    
        // Diamonds
        { name: '2D', value: 2, suit: 'diamonds', image: '../Resources/cards/2D.png' },
        { name: '3D', value: 3, suit: 'diamonds', image: '../Resources/cards/3D.png' },
        { name: '4D', value: 4, suit: 'diamonds', image: '../Resources/cards/4D.png' },
        { name: '5D', value: 5, suit: 'diamonds', image: '../Resources/cards/5D.png' },
        { name: '6D', value: 6, suit: 'diamonds', image: '../Resources/cards/6D.png' },
        { name: '7D', value: 7, suit: 'diamonds', image: '../Resources/cards/7D.png' },
        { name: '8D', value: 8, suit: 'diamonds', image: '../Resources/cards/8D.png' },
        { name: '9D', value: 9, suit: 'diamonds', image: '../Resources/cards/9D.png' },
        { name: '10D', value: 10, suit: 'diamonds', image: '../Resources/cards/10D.png' },
        { name: 'JD', value: 10, suit: 'diamonds', image: '../Resources/cards/JD.png' },
        { name: 'QD', value: 10, suit: 'diamonds', image: '../Resources/cards/QD.png' },
        { name: 'KD', value: 10, suit: 'diamonds', image: '../Resources/cards/KD.png' },
        { name: 'AD', value: 11, suit: 'diamonds', image: '../Resources/cards/AD.png' },
    
        // Clubs
        { name: '2C', value: 2, suit: 'clubs', image: '../Resources/cards/2C.png' },
        { name: '3C', value: 3, suit: 'clubs', image: '../Resources/cards/3C.png' },
        { name: '4C', value: 4, suit: 'clubs', image: '../Resources/cards/4C.png' },
        { name: '5C', value: 5, suit: 'clubs', image: '../Resources/cards/5C.png' },
        { name: '6C', value: 6, suit: 'clubs', image: '../Resources/cards/6C.png' },
        { name: '7C', value: 7, suit: 'clubs', image: '../Resources/cards/7C.png' },
        { name: '8C', value: 8, suit: 'clubs', image: '../Resources/cards/8C.png' },
        { name: '9C', value: 9, suit: 'clubs', image: '../Resources/cards/9C.png' },
        { name: '10C', value: 10, suit: 'clubs', image: '../Resources/cards/10C.png' },
        { name: 'JC', value: 10, suit: 'clubs', image: '../Resources/cards/JC.png' },
        { name: 'QC', value: 10, suit: 'clubs', image: '../Resources/cards/QC.png' },
        { name: 'KC', value: 10, suit: 'clubs', image: '../Resources/cards/KC.png' },
        { name: 'AC', value: 11, suit: 'clubs', image: '../Resources/cards/AC.png' },
    
        // Spades
        { name: '2S', value: 2, suit: 'spades', image: '../Resources/cards/2S.png' },
        { name: '3S', value: 3, suit: 'spades', image: '../Resources/cards/3S.png' },
        { name: '4S', value: 4, suit: 'spades', image: '../Resources/cards/4S.png' },
        { name: '5S', value: 5, suit: 'spades', image: '../Resources/cards/5S.png' },
        { name: '6S', value: 6, suit: 'spades', image: '../Resources/cards/6S.png' },
        { name: '7S', value: 7, suit: 'spades', image: '../Resources/cards/7S.png' },
        { name: '8S', value: 8, suit: 'spades', image: '../Resources/cards/8S.png' },
        { name: '9S', value: 9, suit: 'spades', image: '../Resources/cards/9S.png' },
        { name: '10S', value: 10, suit: 'spades', image: '../Resources/cards/10S.png' },
        { name: 'JS', value: 10, suit: 'spades', image: '../Resources/cards/JS.png' },
        { name: 'QS', value: 10, suit: 'spades', image: '../Resources/cards/QS.png' },
        { name: 'KS', value: 10, suit: 'spades', image: '../Resources/cards/KS.png' },
        { name: 'AS', value: 11, suit: 'spades', image: '../Resources/cards/AS.png' },
    
        // Jokers
        { name: 'Joker', value: 0, suit: null, image: '../Resources/cards/joker.png' },
        { name: 'Joker', value: 0, suit: null, image: '../Resources/cards/joker.png' }
    ];    

    // Update player count dynamically
    slider.addEventListener('input', () => {
        selectedPlayerCount = slider.value;
        playerCountDisplay.textContent = `Players: ${selectedPlayerCount}`;
    });

    // Start the game
    startGameButton.addEventListener('click', () => {
        playerCountScreen.classList.add('fade-out');
        setTimeout(() => {
            playerCountScreen.classList.add('hidden');
            gameScreen.classList.remove('hidden');
            initializeGame(selectedPlayerCount);
        }, 1000);
    });

    function initializeGame(playerCount) {
        shuffleButton.classList.add('hidden');
        createPlayers(playerCount);
        initializeDeck();
        updateTurnIndicator();
        resetCardTracker();
        resetCardDisplay();
    }

    function createPlayers(playerCount) {
        playerArea.innerHTML = '';
        players = [];
        for (let i = 1; i <= playerCount; i++) {
            players.push({ id: i, liveScore: 0, bankedScore: 0 });
            const playerDiv = document.createElement('div');
            playerDiv.classList.add('player');
            playerDiv.setAttribute('id', `player-${i}`); // Assign unique ID to each player container
            playerDiv.innerHTML = `
                <img src="../Resources/user.png" alt="Player ${i}" />
                <div class="score-group">
                    <div id="player-${i}-live-score" class="score live-score">Live: 0</div>
                    <div id="player-${i}-banked-score" class="score banked-score">Banked: 0</div>
                    <div id="player-${i}-total-score" class="score total-score">Total: 0</div>
                </div>
            `;
            playerArea.appendChild(playerDiv);
        }
        highlightCurrentPlayer(); // Highlight the first player initially
    }
    
    function highlightCurrentPlayer() {
        // Remove highlight from all players
        document.querySelectorAll('.player').forEach(player => {
            player.classList.remove('highlighted');
        });
    
        // Add highlight to the current player
        const currentPlayerDiv = document.getElementById(`player-${players[currentPlayerIndex].id}`);
        currentPlayerDiv.classList.add('highlighted');
    }

    function initializeDeck() {
        deck = [...cardDeck];
        shuffleDeck(deck);
    }

    function shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    function updateTurnIndicator() {
        turnIndicator.textContent = `Player ${players[currentPlayerIndex].id}'s Turn`;
    }

    function resetCardTracker() {
        cardTracker.innerHTML = '';
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.classList.add('card-dot');
            cardTracker.appendChild(dot);
        }
    }

    function resetCardDisplay() {
        cardDisplay.innerHTML = `<img src="../Resources/cards/card-back.png" alt="Card Back" class="card-image">`;
    }

    function updateCardTracker() {
        const dots = cardTracker.querySelectorAll('.card-dot');
        if (cardsDrawnThisTurn > 0 && cardsDrawnThisTurn <= dots.length) {
            dots[cardsDrawnThisTurn - 1].classList.add('active');
        }
    }

    function drawCard() {
        if (deck.length === 0) {
            determineWinner();
            return null;
        }
        const card = deck.pop();
        usedCards.push(card);
        return card;
    }

    deckElement.addEventListener('click', () => {
        if (gamePaused || cardsDrawnThisTurn >= 3) return;
    
        const card = drawCard();
        if (!card) return;
    
        // Show the drawn card's image in the card display
        const cardImage = document.getElementById('card-display');
        cardImage.src = card.image;
        cardImage.alt = card.name;
    
        handleCardDraw(card);
    
        if (card.name !== 'Joker') {
            cardsDrawnThisTurn++;
            updateCardTracker();
        }
    
        if (cardsDrawnThisTurn >= 1 && !gamePaused) {
            endTurnButton.disabled = false;
        }
    
        if (cardsDrawnThisTurn === 3 && !isPictureCard) {
            setTimeout(() => endTurnButton.click(), 1500);
        }
    
        // Reset to card back after 2 seconds
        setTimeout(() => {
            cardImage.src = '../Resources/cards/card back red.png';
            cardImage.alt = 'Card Back';
        }, 2000);
    });    

    function handleCardDraw(card) {
        if (card.name === 'Joker') {
            handleJokerDraw();
            return;
        }

        const currentPlayer = players[currentPlayerIndex];
        if (['J', 'Q', 'K'].includes(card.name[0])) {
            isPictureCard = true;
            bankHalfButton.disabled = false;
        } else {
            isPictureCard = false;
            bankHalfButton.disabled = true;
        }

        if (card.name[0] === 'A') {
            currentPlayer.liveScore += 11;
        } else {
            currentPlayer.liveScore += card.value;
        }

        updatePlayerScores(currentPlayer);
    }

    function handleJokerDraw() {
        const currentPlayer = players[currentPlayerIndex];
        currentPlayer.liveScore = 0;
        updatePlayerScores(currentPlayer);

        cardsDrawnThisTurn = 0;
        resetCardTracker();
        shuffleButton.classList.remove('hidden');
        disableGameplay();
    }

    shuffleButton.addEventListener('click', () => {
        deck = [...deck, ...usedCards];
        usedCards = [];
        shuffleDeck(deck);
        shuffleButton.classList.add('hidden');
        enableGameplay();
        cardsDrawnThisTurn = 0;
        nextTurn();
    });

    function disableGameplay() {
        gamePaused = true;
        deckElement.style.pointerEvents = 'none';
        bankHalfButton.disabled = true;
        endTurnButton.disabled = true;
    }

    function enableGameplay() {
        gamePaused = false;
        deckElement.style.pointerEvents = 'auto';
        bankHalfButton.disabled = true;
        endTurnButton.disabled = true;
    }

    function updatePlayerScores(player) {
        document.getElementById(`player-${player.id}-live-score`).textContent = `Live: ${player.liveScore}`;
        document.getElementById(`player-${player.id}-banked-score`).textContent = `Banked: ${player.bankedScore}`;
        document.getElementById(`player-${player.id}-total-score`).textContent = `Total: ${player.liveScore + player.bankedScore}`;
    }

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

    endTurnButton.addEventListener('click', () => {
        if (gamePaused) return;

        cardsDrawnThisTurn = 0;
        resetCardTracker();
        nextTurn();
    });

    function nextTurn() {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        highlightCurrentPlayer();
        updateTurnIndicator();
        resetCardTracker();
        resetCardDisplay();
        bankHalfButton.disabled = true;
        endTurnButton.disabled = true;
    }

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

    function resetGame() {
        location.reload();
    }
});
