# Number Guessing Game: Step-by-Step Development Guide

This guide walks through the complete process of building a simple decision-based number guessing game using HTML, CSS, and JavaScript. By following these steps, you'll create an interactive game where players try to guess a random number between 1 and 10 within three attempts.

## Table of Contents
1. [Project Overview](#project-overview)
2. [Setting Up Your Project](#setting-up-your-project)
3. [Step 1: Creating the Game Object](#step-1-creating-the-game-object)
4. [Step 2: Building the Game Logic](#step-2-building-the-game-logic)
5. [Step 3: Designing the HTML Structure](#step-3-designing-the-html-structure)
6. [Step 4: Styling with CSS](#step-4-styling-with-css)
7. [Step 5: Connecting JavaScript to the Interface](#step-5-connecting-javascript-to-the-interface)
8. [Testing and Debugging](#testing-and-debugging)
9. [Advanced Features and Enhancements](#advanced-features-and-enhancements)
10. [Further Learning](#further-learning)

## Project Overview

**What we're building:** A browser-based game where:
- The computer generates a random number between 1 and 10
- The player has 3 chances to guess the number
- After each guess, the game provides feedback (too high, too low, or correct)
- The game ends when the player either guesses correctly or runs out of attempts

**Skills you'll practice:**
- JavaScript objects and methods
- DOM manipulation
- Event handling
- Conditional logic
- CSS styling

## Setting Up Your Project

Create a new folder for your project and set up these three files:

1. `index.html` - The main HTML document
2. `styles.css` - CSS styles for the game 
3. `script.js` - JavaScript code for game logic

## Step 1: Creating the Game Object

First, let's create the game object to store our game data. This is the foundation of our game.

Open `script.js` and add:

```javascript
// Step 1: Define an Object to Store Game Data
let game = {
    secretNumber: Math.floor(Math.random() * 10) + 1, // Random number between 1-10
    maxGuesses: 3,                                   // Maximum allowed guesses
    currentGuesses: 0,                               // Counter for guesses made
    guessHistory: [],                                // Array to track guess history
    gameOver: false                                  // Flag to check if game is over
};
```

**Code explanation:**
- `secretNumber`: Generates a random number between 1 and 10
  - `Math.random()` produces a value between 0 (inclusive) and 1 (exclusive)
  - Multiplying by 10 gives a number between 0 and 9.999...
  - `Math.floor()` rounds down to the nearest integer (0-9)
  - Adding 1 shifts the range to 1-10
- `maxGuesses`: Sets the limit for how many guesses the player gets
- `currentGuesses`: Keeps track of how many guesses have been made
- `guessHistory`: An array that will store all guesses made
- `gameOver`: A boolean flag to track if the game has ended

## Step 2: Building the Game Logic

Now, let's add methods to the game object to handle the game logic. Add these methods inside the game object:

```javascript
// Update your game object to include these methods
let game = {
    secretNumber: Math.floor(Math.random() * 10) + 1,
    maxGuesses: 3,
    currentGuesses: 0,
    guessHistory: [],
    gameOver: false,

    // Method to handle player guesses
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
    
    // Method to reset the game
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
    
    // Method to get remaining guesses
    getRemainingGuesses: function() {
        return this.maxGuesses - this.currentGuesses;
    }
};
```

**Code explanation:**
- The `makeGuess` method:
  - Takes a guess parameter and converts it to a number
  - Checks if the game is already over
  - Checks if the player has used all their guesses
  - Increments the guess counter and adds the guess to history
  - Compares the guess to the secret number and returns appropriate feedback
  - Returns an object with a message and status for UI feedback

- The `reset` method:
  - Generates a new secret number
  - Resets counters and arrays
  - Returns a message to display to the player

- The `getRemainingGuesses` method:
  - Calculates and returns how many guesses the player has left

## Step 3: Designing the HTML Structure

Now let's create the user interface. Open `index.html` and add:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Number Guessing Game</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Number Guessing Game</h1>
    
    <div class="game-container">
        <div class="game-info">
            <p>I'm thinking of a number between 1 and 10. Can you guess it?</p>
            <p>You have <span id="guesses-left">3</span> attempts remaining.</p>
        </div>
        
        <div class="input-group">
            <label for="guess">Your guess: </label>
            <input type="number" id="guess" min="1" max="10">
            <button id="submit-guess">Guess!</button>
        </div>
        
        <div id="message"></div>
        <div class="attempts" id="attempts-list"></div>
        
        <button id="reset-game" class="reset">New Game</button>
    </div>

    <!-- Link to external JavaScript file -->
    <script src="script.js"></script>
</body>
</html>
```

**HTML explanation:**
- We create a main heading for the game
- The `game-container` div holds all game elements
- The `game-info` section provides instructions and shows remaining attempts
- The `input-group` contains the input field and submit button
- The `message` div will display feedback after each guess
- The `attempts-list` div will show the history of guesses
- The reset button allows players to start a new game
- We link to our CSS and JavaScript files

## Step 4: Styling with CSS

Let's make our game visually appealing. Open `styles.css` and add:

```css
/* Basic styling for the game interface */
body {
    font-family: Arial, sans-serif;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f0f8ff;
    color: #333;
}

h1 {
    color: #2c3e50;
    text-align: center;
}

.game-container {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.game-info {
    margin-bottom: 20px;
    padding: 10px;
    background-color: #e8f4f8;
    border-radius: 5px;
}

.input-group {
    margin-bottom: 15px;
}

button {
    background-color: #3498db;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #2980b9;
}

input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    width: 60px;
}

#message {
    padding: 10px;
    margin-top: 15px;
    border-radius: 5px;
}

.success {
    background-color: #d4edda;
    color: #155724;
}

.error {
    background-color: #f8d7da;
    color: #721c24;
}

.warning {
    background-color: #fff3cd;
    color: #856404;
}

.info {
    background-color: #d1ecf1;
    color: #0c5460;
}

.attempts {
    font-weight: bold;
    margin-top: 15px;
}

.reset {
    margin-top: 15px;
    background-color: #6c757d;
}

.reset:hover {
    background-color: #5a6268;
}
```

**CSS explanation:**
- We set a clean, readable font and limit the width of the game
- The game container has a white background with rounded corners and a subtle shadow
- Buttons have a blue background that darkens on hover
- We create different styles for different message types (success, error, warning)
- The input field and other elements are styled consistently

## Step 5: Connecting JavaScript to the Interface

Finally, let's connect our game logic to the interface. Add this code to the bottom of your `script.js` file:

```javascript
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
```

**JavaScript interface code explanation:**
- We select all the DOM elements we need to interact with
- We create helper functions:
  - `updateGuessesLeft()`: Updates the display of remaining guesses
  - `displayMessage()`: Shows feedback with appropriate styling
  - `updateAttemptsList()`: Shows the history of guesses
- We add event listeners:
  - For the submit button to process guesses
  - For the reset button to start a new game
  - For the Enter key to submit guesses
- We validate user input to ensure it's a number between 1 and 10
- We handle the game state, disabling inputs when the game is over
- We initialize the game with a starting message

## Testing and Debugging

Now that you've created all the necessary files, test your game by opening `index.html` in a web browser. Try different scenarios:

1. Guess the correct number on the first try
2. Guess numbers that are too high or too low
3. Use all three attempts without guessing correctly
4. Try entering invalid inputs (like letters or numbers outside the range)
5. Test the reset button to start a new game

If you encounter any issues:
1. Open your browser's developer tools (F12 or right-click > Inspect)
2. Check the Console tab for any JavaScript errors
3. Review your code for typos or logic errors

## Advanced Features and Enhancements

Once your basic game is working, you can enhance it with additional features:

1. **Difficulty levels:** Add easy, medium, and hard modes with different number ranges
   ```javascript
   // Example:
   let difficulties = {
       easy: { max: 10, attempts: 4 },
       medium: { max: 50, attempts: 5 },
       hard: { max: 100, attempts: 6 }
   };
   ```

2. **Score tracking:** Keep track of wins and losses across multiple games
   ```javascript
   // Add to game object:
   wins: 0,
   losses: 0
   ```

3. **Hints:** Add a hint button that narrows down the possible range
   ```javascript
   // Example hint function:
   giveHint: function() {
       const range = Math.floor(this.secretNumber / 2);
       return `The number is between ${this.secretNumber - range} and ${this.secretNumber + range}`;
   }
   ```

4. **Animations:** Add CSS animations for correct/incorrect guesses
   ```css
   @keyframes celebrate {
       0% { transform: scale(1); }
       50% { transform: scale(1.1); }
       100% { transform: scale(1); }
   }
   
   .success {
       animation: celebrate 0.5s ease;
   }
   ```

5. **Sound effects:** Add sounds for correct/incorrect guesses
   ```javascript
   // Example:
   const correctSound = new Audio('correct.mp3');
   correctSound.play();
   ```



