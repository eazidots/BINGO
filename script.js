// Define object images
const objects = [
    { name: 'Apple', image: 'apple.png' },
    { name: 'Banana', image: 'banana.png' },
    { name: 'Orange', image: 'orange.png' },    
    { name: 'Grape', image: 'grape.png' },
    { name: 'Mango', image: 'mango.png' },
    { name: 'Pear', image: 'pear.png' }
];

// Initialize the board
const board = [];
const numRows = 5;
const numCols = 6;
let winnerFound = false;

// Initialize the board with random objects, ensuring no more than one match in each direction
function initializeBoard() {
    for (let i = 0; i < numRows; i++) {
        const row = [];
        for (let j = 0; j < numCols; j++) {
            // Ensure no more than one match in each direction (up, left, diagonal-up-left, diagonal-up-right)
            const randomIndex = Math.floor(Math.random() * objects.length);
            const currentObject = objects[randomIndex];
            const previousRowObject = i > 0 ? board[i - 1][j] : null;
            const previousColObject = j > 0 ? row[j - 1] : null;
            const previousDiagonalUpLeftObject = i > 0 && j > 0 ? board[i - 1][j - 1] : null;
            const previousDiagonalUpRightObject = i > 0 && j < numCols - 1 ? board[i - 1][j + 1] : null;

            // Check if there are no more than one match in each direction
            if (previousRowObject && previousRowObject.name === currentObject.name) {
                row.push(objects[(randomIndex + 1) % objects.length]);
            } else if (previousColObject && previousColObject.name === currentObject.name) {
                row.push(objects[(randomIndex + 1) % objects.length]);
            } else if (previousDiagonalUpLeftObject && previousDiagonalUpLeftObject.name === currentObject.name) {
                row.push(objects[(randomIndex + 1) % objects.length]);
            } else if (previousDiagonalUpRightObject && previousDiagonalUpRightObject.name === currentObject.name) {
                row.push(objects[(randomIndex + 1) % objects.length]);
            } else {
                row.push(currentObject);
            }
        }
        board.push(row);
    }
}
// Initialize the board with random objects, ensuring no winning patterns exist initially



/*function initializeBoard() {
    const maxOccurrences = 2; // Maximum allowed occurrences of an object on a row, column, or diagonal

    for (let i = 0; i < numRows; i++) {
        const row = [];
        for (let j = 0; j < numCols; j++) {
            let currentObject;

            // Ensure no more than the maximum allowed occurrences in each direction (up, left, diagonal-up-left, diagonal-up-right)
            do {
                const randomIndex = Math.floor(Math.random() * objects.length);
                currentObject = objects[randomIndex];

                const occurrencesInRow = row.filter(obj => obj?.name === currentObject.name).length;
                const occurrencesInCol = board.reduce((acc, row) => acc + (row[j]?.name === currentObject.name ? 1 : 0), 0);
                const occurrencesInDiagonalUpLeft = board.reduce((acc, row, rowIndex) => acc + (row[j - i + rowIndex]?.name === currentObject.name ? 1 : 0), 0);
                const occurrencesInDiagonalUpRight = board.reduce((acc, row, rowIndex) => acc + (row[j + i - rowIndex]?.name === currentObject.name ? 1 : 0), 0);

                if (occurrencesInRow >= maxOccurrences || occurrencesInCol >= maxOccurrences ||
                    occurrencesInDiagonalUpLeft >= maxOccurrences || occurrencesInDiagonalUpRight >= maxOccurrences) {
                    // If max occurrences reached, try again with a different object
                    continue;
                }

                // If the object can be placed without exceeding the maximum occurrences, add it to the row
                row.push(currentObject);
            } while (!currentObject);
        }
        board.push(row);
    }
}*/

// Render the board on the UI
function renderBoard() {
    const bingoBoard = document.getElementById('bingo-board');
    bingoBoard.innerHTML = '';
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const box = document.createElement('div');
            box.classList.add('bingo-box');
            box.setAttribute('data-row', i);
            box.setAttribute('data-col', j);
            box.addEventListener('click', handleClick);
            //box.innerHTML = `<img src="images/${board[i][j].image}" alt="${board[i][j].name}" />`;
            //const img = document.createElement('img');
            //img.src = `images/${board[i][j].image}`;
            //img.alt = board[i][j].name;
            //box.appendChild(img);
            //bingoBoard.appendChild(box);
            box.style.backgroundImage = `url(images/${board[i][j].image})`;
            box.querySelector("button");
            bingoBoard.appendChild(box);
        }
        bingoBoard.innerHTML += '<br>';
    }
    bingoBoard.addEventListener('click', function(event) {
        if (!event.target.classList.contains('bingo-box')) {
            console.log('Clicked element:', event.target);
            return;
        }
        handleClick(event);
    });
}

// Handle click event on a box
function handleClick(event) {
    //console.log(event);
   //return
    if (winnerFound) return;
  
    const row = parseInt(event.target.getAttribute('data-row'));
    const col = parseInt(event.target.getAttribute('data-col'));
    const clickedObject = board[row][col];
    
    

    // Change the object in the clicked box
    const randomIndex = Math.floor(Math.random() * objects.length);
    board[row][col] = objects[randomIndex];
    //event.target.innerHTML = `<img src="images/${board[row][col].image}" alt="${board[row][col].name}" />`;
    event.target.style.backgroundImage = `url(images/${board[row][col].image})`;

    // Check for winning pattern
    if (checkForWin(row, col, clickedObject)) {
        winnerFound = true; //Setting this to true stops further clicks
        displayWinnerMessage();    
    }
}

/*function checkForWin(row, col, clickedObject) {
    const directions = [[1, 0], [0, 1], [1, 1], [1, -1]]; // down, right, diagonal-down-right, diagonal-down-left
    
    for (const [dx, dy] of directions) {
        let count = 1;
        let r = row + dx;
        let c = col + dy;
        
        while (r >= 0 && r < numRows && c >= 0 && c < numCols && board[r][c].name === clickedObject.name) {
            count++;
            r += dx;
            c += dy;
        }
        
        r = row - dx;
        c = col - dy;
        
        while (r >= 0 && r < numRows && c >= 0 && c < numCols && board[r][c].name === clickedObject.name) {
            count++;
            r -= dx;
            c -= dy;
        }
        
        if (count >= 3) return true; // Winning pattern found
    }
    
    return false;
}*/

// Check for winning pattern
function checkForWin(row, col, clickedObject) {
    const directions = [
        [1, 0],  // down
        [0, 1],  // right
        [1, 1],  // diagonal-down-right
        [1, -1], // diagonal-down-left
        [-1, 0], // up
        [0, -1], // left
        [-1, -1],// diagonal-up-left
        [-1, 1]  // diagonal-up-right
    ];
    
    for (const [dx, dy] of directions) {
        let count = 1;
        let r = row + dx;
        let c = col + dy;
        
        while (r >= 0 && r < numRows && c >= 0 && c < numCols && board[r][c].name === clickedObject.name) {
            count++;
            r += dx;
            c += dy;
        }
        
        r = row - dx;
        c = col - dy;
        
        while (r >= 0 && r < numRows && c >= 0 && c < numCols && board[r][c].name === clickedObject.name) {
            count++;
            r -= dx;
            c -= dy;
        }
        
        if (count >= 3) return true; // Winning pattern found
    }
    
    return false;
}


// Display winner message
function displayWinnerMessage() {
    const winnerMessage = document.getElementById('winner-message');
    winnerMessage.textContent = 'BINGO! Congratulations, you won!';
    winnerFound = true;
}

// Initialize and render the board
initializeBoard();
renderBoard();
