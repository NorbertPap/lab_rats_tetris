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

let board = getBoard(22, 12);

board[0][5] = {color: 'red', id: 100};


let boardElement = document.querySelector("[data-row='0'][data-col='5']");
boardElement.style.backgroundColor = board[0][5].color;
boardElement.classList.add('moving');

function moveDown()
{
    let myInterval = setInterval(incrementIndex, 300);
    function incrementIndex()
    {
        let myElements = document.getElementsByClassName('cube moving');
        let col = Number(myElements[0].dataset.col);
        let row = Number(myElements[0].dataset.row);
        if(row !== 21)
        {
            myElements[0].style.backgroundColor='';
            myElements[0].classList.remove('moving');
            board[row][col] = 0;
            board[row+1][col] = {color: 'red'};

            let boardElements = document.getElementsByClassName('cube');
            for(let i=0; i<boardElements.length; i++)
            {
                if(boardElements[i].dataset.col === String(col) && boardElements[i].dataset.row === String(row+1))
                {
                    boardElements[i].style.backgroundColor = board[row+1][col].color;
                    boardElements[i].classList.add('moving');
                    break;
                }
            }
        }
        else
        {
            clearInterval(myInterval);
        }
    }
}
moveDown();

