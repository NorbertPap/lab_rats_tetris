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
            board[Number(myElements[i].dataset.row) + 1][Number(myElements[i].dataset.col)] = {color: 'red'};
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


function getMovingElementsFromHTML(myElements)
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
        // Adds new moving element if there's nothing in the play area
        let myElements = document.getElementsByClassName('cube moving');
        if (document.getElementsByClassName('cube moving').length === 0) {
            board = createMovingElement(board);
        }
        else
        {
            let coordinates = getMovingElementsFromHTML(myElements);
            let noNonMovingElementBeneathAnyElement = checkIfAbovePreviousElement(board, coordinates);
            let noElementReachedBottom = checkIfBottomReached(board, coordinates);
            moveElementIfPossible(board, myElements, noElementReachedBottom, noNonMovingElementBeneathAnyElement);
        }
    }, 300);
}


function createMovingElement(board) {
    // function lineElement(board) {
    //     // Creates a new moving element in JS matrix
    //     board[0][5] = {color: 'red'};
    //     board[1][5] = {color: 'red'};
    //     board[2][5] = {color: 'red'};
    //     board[3][5] = {color: 'red'};
    //     // Places the moving elements into HTML
    //     let boardElements = [];
    //     for (let i = 0; i < 4; i++) {
    //         boardElements.push(document.querySelector(`[data-row="${i}"][data-col='5']`));
    //         boardElements[i].style.backgroundColor = board[0][5].color;
    //         boardElements[i].classList.add('moving');
    //     }
    //     return board
    // }

    // function cubeElement(board) {
    //     board[0][5] = {color: 'red'};
    //     board[1][5] = {color: 'red'};
    //     board[0][6] = {color: 'red'};
    //     board[1][6] = {color: 'red'};
    //     let boardElements = [];
    //     for (let i = 0; i < 4; i++) {
    //         boardElements.push(document.querySelector(`[data-row="${i}"][data-col="5"]`));
    //         boardElements.push(document.querySelector(`[data-row="${i}"][data-col="6"]`));
    //         boardElements[i].style.backgroundColor = board[0][5].color;
    //         boardElements[i].style.backgroundColor = board[0][6].color;
    //         boardElements[i].classList.add('moving');
    //     }
    //     return board
    // }

    function bigLElement(board) {
        board[0][4] = {color: 'red'};
        board[0][5] = {color: 'red'};
        board[0][6] = {color: 'red'};
        // board[1][5] = {color: 'red'};
        let boardElements = [];
        for (let i = 0; i < 4; i++) {
            boardElements.push(document.querySelector(`[data-row="${i}"][data-col="4"]`));
            boardElements.push(document.querySelector(`[data-row="${i}"][data-col="5"]`));
            boardElements.push(document.querySelector(`[data-row="${i}"][data-col="6"]`));
            boardElements[i].style.backgroundColor = board[0][4].color;
            boardElements[i].style.backgroundColor = board[0][5].color;
            boardElements[i].style.backgroundColor = board[0][6].color;
            boardElements[i].classList.add('moving');
        }
            return board
    }
    return bigLElement(board)
}


function changePosition(direction, board)
{
    let myElements = document.getElementsByClassName('cube moving');
    let coordinates = [];
    for(let i = 0; i < myElements.length; i++)
    {
        let x = {col: Number(myElements[i].dataset.col),
                    row: Number(myElements[i].dataset.row)};
        coordinates.push(x);
    }

    switch(direction)
    {
        case 'down':
            if(row !== 21 && board[row+1][col] === 0)
            {
                myElements[0].style.backgroundColor='';
                myElements[0].classList.remove('moving');
                board[row][col] = 0;
                board[row+1][col] = {color: 'red'};
                let boardElement = document.querySelector(`[data-row='${row+1}'][data-col='${col}']`);
                boardElement.style.backgroundColor = board[row+1][col].color;
                boardElement.classList.add('moving');
            }
            break;
        case 'left':
            if(board[row][col-1] === 0 && col !== 0)
            {
                myElements[0].style.backgroundColor='';
                myElements[0].classList.remove('moving');
                board[row][col] = 0;
                board[row][col-1] = {color: 'red'};
                let boardElement = document.querySelector(`[data-row='${row}'][data-col='${col-1}']`);
                boardElement.style.backgroundColor = board[row][col-1].color;
                boardElement.classList.add('moving');
            }
            break;
        case 'right':
            if(board[row][col+1] === 0 && col !== 11)
            {
                myElements[0].style.backgroundColor='';
                myElements[0].classList.remove('moving');
                board[row][col] = 0;
                board[row][col+1] = {color: 'red'};
                let boardElement = document.querySelector(`[data-row='${row}'][data-col='${col+1}']`);
                boardElement.style.backgroundColor = board[row][col+1].color;
                boardElement.classList.add('moving');
            }
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