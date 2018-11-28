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
        document.finished=false;
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
            document.finished=true;
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


function move(board)
{
    let myInterval = setInterval(
        function (){
            if(document.getElementsByClassName('cube moving').length === 0)
            {
                createMovingElement(board);
                moveDown(board);
            }
        }, 150);
}


function main()
{
    let row = 22;
    let col = 12;
    let board = getBoard(row, col);

    move(board);


}
main();