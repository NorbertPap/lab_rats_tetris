function getBoard(rowCount, colCount){
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


function moveDown(board)
{
    let myInterval = setInterval(
    function ()
    {
        let myElements = document.getElementsByClassName('cube moving');
        let col = Number(myElements[0].dataset.col);
        let row = Number(myElements[0].dataset.row);

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
        else
        {
            clearInterval(myInterval);
            document.getElementsByClassName('cube moving')[0].classList.remove('moving');
        }
    }, 300);
}


function createMovingElement(board)
{
    board[0][5] = {color: 'red'};
    let boardElement = document.querySelector("[data-row='0'][data-col='5']");
    boardElement.style.backgroundColor = board[0][5].color;
    boardElement.classList.add('moving');
}


function fall(board)
{
    let myInterval = setInterval(
        function ()
        {
            if(document.getElementsByClassName('cube moving').length === 0)
            {
                createMovingElement(board);
                moveDown(board);
            }
        }, 150);
}

//
// function slide()
// {
//     if(row !== 21 && board[row+1][col] === 0)
//             {
//                 myElements[0].style.backgroundColor='';
//                 myElements[0].classList.remove('moving');
//                 board[row][col] = 0;
//                 board[row+1][col] = {color: 'red'};
//                 let boardElement = document.querySelector(`[data-row='${row+1}'][data-col='${col}']`);
//                 boardElement.style.backgroundColor = board[row+1][col].color;
//                 boardElement.classList.add('moving');
//             }
// }


function changePosition(direction, board)
{
    let myElements = document.getElementsByClassName('cube moving');
    let col = Number(myElements[0].dataset.col);
    let row = Number(myElements[0].dataset.row);

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
    let row = 22;
    let col = 12;
    let board = getBoard(row, col);

    document.addEventListener('keydown', function() { shifting(event, board) });
    fall(board);


}
main();