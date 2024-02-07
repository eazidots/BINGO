# BINGO

This is a simple implementation of a Bingo game using HTML, CSS, and JavaScript. The game features a 6x6 grid where each cell contains an image of a fruit. The objective is to find three or more fruits of the same type in a row, column, or diagonal.

## How to Run the Game

1. Clone this repository to your local machine.
2. Open the `index.html` file in your web browser.
3. Click on any cell in the grid to change the fruit image.
4. If three or more matching fruits line up horizontally, vertically, or diagonally, a "BINGO" message will appear.

## Understanding the Code

### Initialization of the Board

- The `initializeBoard` function populates the game board with random fruit objects, ensuring that no winning patterns exist initially in any direction. It achieves this by checking adjacent cells to avoid creating a winning pattern right from the start.

### Rendering the Board

- The `renderBoard` function dynamically generates the HTML elements for the game grid and displays the fruit images accordingly. It attaches click event listeners to each cell to handle user interactions.

### Handling Click Events

- The `handleClick` function responds to user clicks on the game grid. Upon a click, it changes the fruit image in the clicked cell and checks if the new configuration forms a winning pattern using the `checkForWin` function.

### Checking for Winning Patterns

- The `checkForWin` function examines the current state of the game board to determine if a winning pattern exists. It traverses the grid in all directions (up, down, left, right, diagonals) from the clicked cell, counting matching fruits. If three or more matching fruits are found in a row, a winning pattern is detected.

### Displaying the Winner Message

- If a winning pattern is found, the `displayWinnerMessage` function shows a "BINGO! Congratulations, you won!" message on the screen, indicating that the game has been won.

## Further Improvements

- Currently, the game ends when a winning pattern is found. Additional features could be implemented, such as keeping track of the score, allowing multiple rounds, or adding more challenging gameplay mechanics.

---

