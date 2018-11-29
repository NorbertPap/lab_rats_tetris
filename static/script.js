function getBoard(rowCount, colCount)
{
    let board = [];
    for(let i=0; i<rowCount; i++)
    {
        board[i] = [];
        for(let j=0; j<colCount; j++)
        {
            board[i].push(0);
        }
    }
    return board;
}

function moveElementIfPossible(board, myElements, noElementReachedBottom, noNonMovingElementBeneathAnyElement)
{
    if(noElementReachedBottom && noNonMovingElementBeneathAnyElement)
    {
        // Moves every element one step down from the lowest element to the highest
        // by moving them down in reverse order compared to their place in their list
        for (let i = 3; i > -1; i--)
        {
            //Puts the element one place down in the JS matrix
            board[Number(myElements[i].dataset.row) + 1][Number(myElements[i].dataset.col)] = {color: myElements[0]['style']['backgroundColor']};
            //Removing the element from it's original position in the JS matrix
            board[Number(myElements[i].dataset.row)][Number(myElements[i].dataset.col)] = 0;

            //Puts the element one place down in the DOM
            let boardElement = document.querySelector(`[data-row='${Number(myElements[i].dataset.row) + 1}'][data-col='${Number(myElements[i].dataset.col)}']`);
            boardElement.style.backgroundColor = board[Number(myElements[i].dataset.row) + 1][Number(myElements[i].dataset.col)].color;
            boardElement.classList.add('moving');
            //Removing the element from it's original position in the DOM
            myElements[i].style.backgroundColor = '';
            myElements[i].classList.remove('moving');
        }
    }
    else {
        while (myElements.length !== 0) {
            myElements[0].classList.remove('moving');
        }
    }
}


function checkIfBottomReached(board, coordinates)
{
//Get a condition that is true if no moving element has hit bottom yet
    let noElementReachedBottom = true;
    for (const coordinate of coordinates)
    {
        if (coordinate.row === 21) {
            noElementReachedBottom = false;
            break;
        }
    }
    return noElementReachedBottom;
}


function checkIfAbovePreviousElement(board, coordinates)
{
// Get a condition that is true only if each moving element doesn't have a non moving element beneath it
    let noNonMovingElementBeneathAnyElement = true;
    for (const coordinate of coordinates)
    {
        if (coordinate.row === 21 || (board[coordinate.row + 1][coordinate.col] !== 0 &&
            !(document.querySelector(`[data-row='${coordinate.row + 1}'][data-col='${coordinate.col}'].moving`)))) {
            noNonMovingElementBeneathAnyElement = false;
            break;
        }
    }
    return noNonMovingElementBeneathAnyElement;
}


function getMovingElementCoordinates(myElements)
{
// Finds every moving element from HTML, then stores each one's coordinate in an array of objects
    // with properties col and row
    let coordinates = [];
    for (let i = 0; i < myElements.length; i++) {
        let x = {
            col: Number(myElements[i].dataset.col),
            row: Number(myElements[i].dataset.row)
        };
        coordinates.push(x);
    }
    return coordinates
}


function fallingMovement(board)
{
    // Sets up interval that places elements in the play area if there are no moving elements yet,
    // and moves them in the JS matrix and the HTML every 300 milliseconds
    let myInterval = setInterval(
    function () {
        // If there's a column as high as the play grid, the game stops
        if (checkColumnFill(board)){
            clearInterval(myInterval);
            // Placeholder for actual action
            console.log('end');
            return;
        }
        // Adds new moving element if there isn't any in the play area currently
        let myElements = document.getElementsByClassName('cube moving');
        if (document.getElementsByClassName('cube moving').length === 0) {
            board = createMovingElement(board);
        }
        // If there is a moving element in the game, moves it down one step
        else
        {
            let coordinates = getMovingElementCoordinates(myElements);
            let noNonMovingElementBeneathAnyElement = checkIfAbovePreviousElement(board, coordinates);
            let noElementReachedBottom = checkIfBottomReached(board, coordinates);
            moveElementIfPossible(board, myElements, noElementReachedBottom, noNonMovingElementBeneathAnyElement);
            // When the movement is done, checks for filled rows
            let checkRow = checkRowFill(board);
            if (checkRow.length > 0) {
                deleteRow(board, checkRow);
            }
        }
    }, 300);
}


function createMovingElement(board) {
    let colors = ["red", "blue", "deepskyblue", "orange", "yellow", "limegreen", "purple"]

    const lineElement = function lineElement(board) {

        // Creates a new moving element in JS matrix
        board[0][5] = {color: 'red'};
        board[1][5] = {color: 'red'};
        board[2][5] = {color: 'red'};
        board[3][5] = {color: 'red'};
        // Places the moving elements into HTML
        let boardElements = [];
        for (let i = 0; i < 4; i++) {
            boardElements.push(document.querySelector(`[data-row="${i}"][data-col='5']`));
            boardElements[i].style.backgroundColor = board[0][5].color;
            boardElements[i].classList.add('moving');
        }
        return board;
    };

    const cubeElement = function cubeElement(board) {
        board[0][5] = {color: 'red'};
        board[1][5] = {color: 'red'};
        board[0][6] = {color: 'red'};
        board[1][6] = {color: 'red'};
        let boardElements = [];
        for (let i = 0; i < 4; i++) {
            boardElements.push(document.querySelector(`[data-row="${i}"][data-col="5"]`));
            boardElements.push(document.querySelector(`[data-row="${i}"][data-col="6"]`));
            boardElements[i].style.backgroundColor = board[0][5].color;
            boardElements[i].style.backgroundColor = board[0][6].color;
            boardElements[i].classList.add('moving');
        }
        return board;
    };

    const horizontalLine = function horizontalLine(board) {
        board[0][4] = {color: 'red'};
        board[0][5] = {color: 'red'};
        board[0][6] = {color: 'red'};
        board[0][7] = {color: 'red'};

        let boardElements = [];
        boardElements.push(document.querySelector(`[data-row="0"][data-col="4"]`));
        boardElements.push(document.querySelector(`[data-row="0"][data-col="5"]`));
        boardElements.push(document.querySelector(`[data-row="0"][data-col="6"]`));
        boardElements.push(document.querySelector(`[data-row="0"][data-col="7"]`));
        for (let i = 0; i < 4; i++) {
            boardElements[i].style.backgroundColor = board[0][5].color;
            boardElements[i].classList.add('moving');
        }
        return board;
    };

    const TElement = function TElement(board) {
        board[0][4] = {color: 'red'};
        board[0][5] = {color: 'red'};
        board[0][6] = {color: 'red'};
        board[1][5] = {color: 'red'};

        let boardElements = [];
        boardElements.push(document.querySelector(`[data-row="0"][data-col="4"]`));
        boardElements.push(document.querySelector(`[data-row="0"][data-col="5"]`));
        boardElements.push(document.querySelector(`[data-row="0"][data-col="6"]`));
        boardElements.push(document.querySelector(`[data-row="1"][data-col="5"]`));

        for (let i = 0; i < 4; i++) {
            boardElements[i].style.backgroundColor = board[0][5].color;
            boardElements[i].classList.add('moving');
        }
        return board;
    };

    const SElement1 = function SElement1(board) {
        board[0][5] = {color: 'red'};
        board[0][6] = {color: 'red'};
        board[1][4] = {color: 'red'};
        board[1][5] = {color: 'red'};

        let boardElements = [];
        boardElements.push(document.querySelector(`[data-row="0"][data-col="5"]`));
        boardElements.push(document.querySelector(`[data-row="0"][data-col="6"]`));
        boardElements.push(document.querySelector(`[data-row="1"][data-col="4"]`));
        boardElements.push(document.querySelector(`[data-row="1"][data-col="5"]`));

        for (let i = 0; i < 4; i++) {
            boardElements[i].style.backgroundColor = board[0][5].color;
            boardElements[i].classList.add('moving');
        }
        return board;
    };

    const SElement2 = function SElement2(board) {
        board[0][4] = {color: 'red'};
        board[0][5] = {color: 'red'};
        board[1][5] = {color: 'red'};
        board[1][6] = {color: 'red'};

        let boardElements = [];
        boardElements.push(document.querySelector(`[data-row="0"][data-col="4"]`));
        boardElements.push(document.querySelector(`[data-row="0"][data-col="5"]`));
        boardElements.push(document.querySelector(`[data-row="1"][data-col="5"]`));
        boardElements.push(document.querySelector(`[data-row="1"][data-col="6"]`));

        for (let i = 0; i < 4; i++) {
            boardElements[i].style.backgroundColor = board[0][5].color;
            boardElements[i].classList.add('moving');
        }
        return board;
    };

    const LElement1 = function LElement1(board) {
        board[0][4] = {color: 'red'};
        board[0][5] = {color: 'red'};
        board[0][6] = {color: 'red'};
        board[1][6] = {color: 'red'};

        let boardElements = [];
        boardElements.push(document.querySelector(`[data-row="0"][data-col="4"]`));
        boardElements.push(document.querySelector(`[data-row="0"][data-col="5"]`));
        boardElements.push(document.querySelector(`[data-row="0"][data-col="6"]`));
        boardElements.push(document.querySelector(`[data-row="1"][data-col="6"]`));
        for (let i = 0; i < 4; i++) {
            boardElements[i].style.backgroundColor = board[0][5].color;
            boardElements[i].classList.add('moving');
        }
        return board;
    };

    const LElement2 = function LElement2(board) {
        board[0][4] = {color: 'red'};
        board[0][5] = {color: 'red'};
        board[0][6] = {color: 'red'};
        board[1][4] = {color: 'red'};

        let boardElements = [];
        boardElements.push(document.querySelector(`[data-row="0"][data-col="4"]`));
        boardElements.push(document.querySelector(`[data-row="0"][data-col="5"]`));
        boardElements.push(document.querySelector(`[data-row="0"][data-col="6"]`));
        boardElements.push(document.querySelector(`[data-row="1"][data-col="4"]`));
        for (let i = 0; i < 4; i++) {
            boardElements[i].style.backgroundColor = board[0][5].color;
            boardElements[i].classList.add('moving');
        }
        return board;
    };

    function chooseOneElement(board) {
        let elementList = [horizontalLine, LElement1, LElement2, cubeElement, lineElement, TElement, SElement1, SElement2];
        return elementList[Math.floor(Math.random() * elementList.length)](board);
    }

    return chooseOneElement(board);
}


function shiftSideways(board, myElement, whichSide)
{
    switch(whichSide)
    {
        case 'left': {
            //Puts the element one place left in the JS matrix
            board[Number(myElement.dataset.row)][Number(myElement.dataset.col) - 1] = {color: myElement['style']['backgroundColor']};
            //Removing the element from it's original position in the JS matrix
            board[Number(myElement.dataset.row)][Number(myElement.dataset.col)] = 0;
            //Puts the element one place left in the DOM
            let boardElement = document.querySelector(`[data-row='${Number(myElement.dataset.row)}'][data-col='${Number(myElement.dataset.col) - 1}']`);
            boardElement.style.backgroundColor = board[Number(myElement.dataset.row)][Number(myElement.dataset.col) - 1].color;
            boardElement.classList.add('moving');
            //Removing the element from it's original position in the DOM
            myElement.style.backgroundColor = '';
            myElement.classList.remove('moving');
            break;
        }
        case 'right': {
            //Puts the element one place right in the JS matrix
            board[Number(myElement.dataset.row)][Number(myElement.dataset.col) + 1] = {color: myElement['style']['backgroundColor']};
            //Removing the element from it's original position in the JS matrix
            board[Number(myElement.dataset.row)][Number(myElement.dataset.col)] = 0;
            //Puts the element one place right in the DOM
            let boardElement = document.querySelector(`[data-row='${Number(myElement.dataset.row)}'][data-col='${Number(myElement.dataset.col) + 1}']`);
            boardElement.style.backgroundColor = board[Number(myElement.dataset.row)][Number(myElement.dataset.col) + 1].color;
            boardElement.classList.add('moving');
            //Removing the element from it's original position in the DOM
            myElement.style.backgroundColor = '';
            myElement.classList.remove('moving');
        }

    }
}


function moveDown(board)
{
    let myElements = document.getElementsByClassName('cube moving');
    let noElementReachedBottom = checkIfBottomReached(board, getMovingElementCoordinates(myElements));
    let noNonMovingElementBeneathAnyElement = checkIfAbovePreviousElement(board, getMovingElementCoordinates(myElements));
    if(noElementReachedBottom && noNonMovingElementBeneathAnyElement)
    {
        // Moves every element one step down from the lowest element to the highest
        // by moving them down in reverse order compared to their place in their list
        for (let i = 3; i > -1; i--)
        {
            //Puts the element one place down in the JS matrix
            board[Number(myElements[i].dataset.row) + 1][Number(myElements[i].dataset.col)] = {color: myElements[0]['style']['backgroundColor']};
            //Removing the element from it's original position in the JS matrix
            board[Number(myElements[i].dataset.row)][Number(myElements[i].dataset.col)] = 0;

            //Puts the element one place down in the DOM
            let boardElement = document.querySelector(`[data-row='${Number(myElements[i].dataset.row) + 1}'][data-col='${Number(myElements[i].dataset.col)}']`);
            boardElement.style.backgroundColor = board[Number(myElements[i].dataset.row) + 1][Number(myElements[i].dataset.col)].color;
            boardElement.classList.add('moving');
            //Removing the element from it's original position in the DOM
            myElements[i].style.backgroundColor = '';
            myElements[i].classList.remove('moving');
        }
    }
    else {
        while (myElements.length !== 0) {
            myElements[0].classList.remove('moving');
        }
    }
}


function moveLeft(board)
{
    let myElements = document.getElementsByClassName('cube moving');
    let coordinates = getMovingElementCoordinates(myElements);
    // Sort coordinates by row, ascending
    coordinates.sort(function(a, b){
        if (a.col < b.col)
        {
            return -1;
        }
        if (a.col > b.col)
        {
            return 1;
        }
      return 0;
    });

    let noElementReachedTheSideYet = true;
    let noElementHasElementToTheSide = true;
    for(let i=0; i < coordinates.length; i++)
    {
        // Get the element with matching coordinates
        let myElement = document.querySelector(`[data-row="${coordinates[i].row}"][data-col="${coordinates[i].col}"]`);
        // Check if the element can be shifted to the left
        let didntReachTheSideYet = myElement.dataset.col !== "0";
        let noElementToTheSide = board[Number(myElement.dataset.row)][Number(myElement.dataset.col)-1] === 0 || Boolean(document.querySelector(`[data-row="${coordinates[i].row}"][data-col="${coordinates[i].col-1}"].moving`));
        //Checks for every element
        noElementReachedTheSideYet = noElementReachedTheSideYet && didntReachTheSideYet;
        noElementHasElementToTheSide = noElementHasElementToTheSide && noElementToTheSide;

    }
    if (noElementReachedTheSideYet && noElementHasElementToTheSide)
    {
        //Moves the current element one step to the left
        for(let i=0; i < coordinates.length; i++)
        {
            let myElement = document.querySelector(`[data-row="${coordinates[i].row}"][data-col="${coordinates[i].col}"]`);
            shiftSideways(board, myElement, 'left');
        }

    }
}


function moveRight(board)
{
    let myElements = document.getElementsByClassName('cube moving');
    let coordinates = getMovingElementCoordinates(myElements);
    // Sort coordinates by row, descending
    coordinates.sort(function(a, b){
        if (a.row > b.row)
        {
            return -1;
        }
        if (a.row < b.row)
        {
            return 1;
        }
      return 0;
    });
    coordinates.reverse();

    let noElementReachedTheSideYet = true;
    let noElementHasElementToTheSide = true;
    for(let i=0; i < coordinates.length; i++)
    {
        // Get the element with matching coordinates
        let myElement = document.querySelector(`[data-row="${coordinates[i].row}"][data-col="${coordinates[i].col}"]`);
        // Check if the element can be shifted to the left
        let didntReachTheSideYet = myElement.dataset.col !== "11";
        let noElementToTheSide = board[Number(myElement.dataset.row)][Number(myElement.dataset.col)+1] === 0 || Boolean(document.querySelector(`[data-row="${coordinates[i].row}"][data-col="${coordinates[i].col+1}"].moving`));
        //Checks for every element
        noElementReachedTheSideYet = noElementReachedTheSideYet && didntReachTheSideYet;
        noElementHasElementToTheSide = noElementHasElementToTheSide && noElementToTheSide;

    }
    if (noElementReachedTheSideYet && noElementHasElementToTheSide)
    {
        //Moves the current element one step to the left
        for(let i=0; i < coordinates.length; i++)
        {
            let myElement = document.querySelector(`[data-row="${coordinates[i].row}"][data-col="${coordinates[i].col}"]`);
            shiftSideways(board, myElement, 'right');
        }

    }
}


function changePosition(direction, board)
{
    switch(direction)
    {
        case 'down':
            moveDown(board);
            break;
        case 'left':
            moveLeft(board);
            break;
        case 'right':
            moveRight(board);
            break;
    }
}


function shifting(event, board)
{
    let key = event.keyCode;
    // A = 65, D = 68, S = 83, Left Arrow = 37, Right Arrow = 39, Down Arrow = 40
    switch(key)
    {
        // Left
        case 65:
            changePosition('left', board);
            break;
        case 37:
            changePosition('left', board);
            break;
        // Right
        case 68:
            changePosition('right', board);
            break;
        case 39:
            changePosition('right', board);
            break;
        // Down
        case 83:
            changePosition('down', board);
            break;
        case 40:
            changePosition('down', board);
            break;
    }
}


function checkColumnFill(board)
{
    let colors = ["red", "blue", "deepskyblue", "orange", "yellow", "limegreen", "purple"];
    let topRowElements = null;
    for(color of colors)
    {
        topRowElements = document.querySelectorAll(`[data-row="0"][style="background-color: ${color};"]`);
        for(element of topRowElements)
        {
            if(!element.classList.contains('moving'))
            {
                return true;
            }
        }
    }

}


function checkRowFill(board)
{
    let filledRows = [];

    for (let j = 21; j>0; j--) {
        var filledRow = [];
        let i = 0;

        for (let i=0; i<12; i++) {
            if (board[j][i] !== 0 && !document.querySelector(`[data-row="${j}"][data-col="${i}"].moving`)) {
                filledRow.push(1);
            }
            if (filledRow.length === 12) {
                filledRows.push(j)
            }
        }
    }
    return filledRows;
}


function deleteRow(board, rows)
{
    for(row of rows)
    {
        // Delete from matrix.
        for (let i = 0; i<12; i++)
        {
            if(Boolean(document.querySelector(`[data-row="${row}"][data-col='${i}'].moving`)))
            {
                continue;
            }
            board[row][i] = 0;
        }
        // Delete from Html.
        for (let i = 0; i<12; i++) {
            if(Boolean(document.querySelector(`[data-row="${row}"][data-col='${i}'].moving`)))
            {
                continue;
            }
            let element = document.querySelector(`[data-row="${row}"][data-col='${i}'][style="background-color: red;"]`);
            element['style']['backgroundColor'] = '';
        }
    }
    moveRowsDown(board, rows);
}


function moveRowsDown(board, rows)
{
    let rowsToBeFilled = [];
    for(let i=0; i<rows.length; i++)
    {
        rowsToBeFilled.push(rows[i]+i);
        closeEmptyRowSpace(board, rowsToBeFilled[i]);
    }
}


function closeEmptyRowSpace(board, rowToClose)
{
    //Move every non-moving element one step down
    for (let i = rowToClose; i > 0; i--)
    {
        for (let j = 0; j < board[0].length; j++)
        {
            if(Boolean(document.querySelector(`[data-row="${i-1}"][data-col='${j}'].moving`)))
            {
                continue;
            }
            // Move matrix.
            board[i][j] = board[i - 1][j];
            // Move Html.
            let elementUnder = document.querySelector(`[data-row="${i}"][data-col='${j}']`);
            let elementAbove = document.querySelector(`[data-row="${i-1}"][data-col='${j}']`);
            elementUnder['style']['backgroundColor'] = elementAbove['style']['backgroundColor'];
        }
    }
}


function main()
{
    // Initialize JS representation of the play area
    let row = 22;
    let col = 12;
    let board = getBoard(row, col);

    // Making the page responsive to sideways key presses, then setting up the basic movement
    document.addEventListener('keydown', function() { shifting(event, board) });
    fallingMovement(board);
}
main();