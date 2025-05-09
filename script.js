// Step 1: Define an Object to Store Game Data
// Creating a game object to hold all game-related properties and methods
let game = {
    secretNumber: Math.floor(Math.random() * 10) + 1, // Random number between 1-10
    maxGuesses: 3,                                   // Maximum allowed guesses
    currentGuesses: 0,                               // Counter for guesses made
    guessHistory: [],                                // Array to track guess history
    gameOver: false,                                 // Flag to check if game is over

    // Step 4: Refactoring makeGuess into a method of the game object
    // Handles logic when player makes a guess
    makeGuess: function(guess) {
        // Convert guess to number to ensure proper comparison
        guess = Number(guess);
        
        // Check if game is already over
        if (this.gameOver) {
            return {
                message: "Game is over! Please start a new game.",
                status: "error"
            };
        }
        
        // Check if player has exceeded max guesses
        if (this.currentGuesses >= this.maxGuesses) {
            this.gameOver = true;
            return {
                message: `No more guesses left! The secret number was ${this.secretNumber}.`,
                status: "error"
            };
        }
        
        // Increment guess counter
        this.currentGuesses++;
        
        // Add guess to history
        this.guessHistory.push(guess);
        
        // Check if guess is correct
        if (guess === this.secretNumber) {
            this.gameOver = true;
            return {
                message: `Congratulations! You guessed the secret number ${this.secretNumber}!`,
                status: "success"
            };
        } else if (guess > this.secretNumber) {
            // Guess is too high
            return {
                message: "Too high! Try again.",
                status: "warning"
            };
        } else {
            // Guess is too low
            return {
                message: "Too low! Try again.",
                status: "warning"
            };
        }
    },
    
    // Reset game to initial state
    reset: function() {
        this.secretNumber = Math.floor(Math.random() * 10) + 1;
        this.currentGuesses = 0;
        this.guessHistory = [];
        this.gameOver = false;
        return {
            message: "New game started! I'm thinking of a new number between 1 and 10.",
            status: "info"
        };
    },
    
    // Get number of remaining guesses
    getRemainingGuesses: function() {
        return this.maxGuesses - this.currentGuesses;
    }
};

// Step 5: Create an Interface and hook up the game logic
// DOM elements
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit-guess");
const resetButton = document.getElementById("reset-game");
const messageDisplay = document.getElementById("message");
const guessesLeftDisplay = document.getElementById("guesses-left");
const attemptsList = document.getElementById("attempts-list");

// Function to update the UI with remaining guesses
function updateGuessesLeft() {
    guessesLeftDisplay.textContent = game.getRemainingGuesses();
}

// Function to display message with appropriate styling
function displayMessage(result) {
    messageDisplay.textContent = result.message;
    messageDisplay.className = result.status;
}

// Function to update the attempts history
function updateAttemptsList() {
    attemptsList.innerHTML = "";
    if (game.guessHistory.length > 0) {
        const historyText = document.createElement("p");
        historyText.textContent = `Your guesses: ${game.guessHistory.join(", ")}`;
        attemptsList.appendChild(historyText);
    }
}

// Event listener for submit button
submitButton.addEventListener("click", function() {
    const guess = parseInt(guessInput.value);
    
    // Validate input
    if (isNaN(guess) || guess < 1 || guess > 10) {
        displayMessage({
            message: "Please enter a valid number between 1 and 10.",
            status: "error"
        });
        return;
    }
    
    // Process the guess
    const result = game.makeGuess(guess);
    displayMessage(result);
    updateGuessesLeft();
    updateAttemptsList();
    
    // Clear input field
    guessInput.value = "";
    guessInput.focus();
    
    // Disable input if game is over
    if (game.gameOver) {
        guessInput.disabled = true;
        submitButton.disabled = true;
    }
});

// Event listener for reset button
resetButton.addEventListener("click", function() {
    const result = game.reset();
    displayMessage(result);
    updateGuessesLeft();
    updateAttemptsList();
    
    // Re-enable input
    guessInput.disabled = false;
    submitButton.disabled = false;
    guessInput.value = "";
    guessInput.focus();
});

// Event listener for Enter key in input field
guessInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        submitButton.click();
    }
});

// Initialize message
displayMessage({
    message: "Enter a number between 1 and 10 and click 'Guess!'",
    status: "info"
});