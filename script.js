const cells=document.querySelectorAll("#cell");
const board=document.querySelector(".board");
var circleTurn=true;
const X_CLASS="x";
const CIRCLE_CLASS="circle";
const WINNING_COMBINATIONS=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
function startGame()
{
    circleTurn=false;
    cells.forEach(cell=>{
        cell.addEventListener('click',handleclick,{once: true}); 
    });
    setBoardHover();
}

startGame();
function handleclick(e)
{
    const cell=e.target;
    const currentClass=circleTurn?CIRCLE_CLASS:X_CLASS;
    
    //Mark the Place
    placeMark(cell,currentClass);
    //Check if win or draw
    if(checkWin(currentClass))
    {
        endGame(false,currentClass);
    }
    else if(isDraw())
    {
        endGame(true);
    }
    else{
        //If not, switch turn  
        switchTurn();
        setBoardHover();
    }
    
};

function endGame(draw,currentClass=undefined)
{
    if(draw){
        alert("This game is a draw");
        restart();
    }    
    else
    {
        alert(`${currentClass} won the game`);
        restart();
    }
}
function placeMark(cell,currentClass)
{
    cell.classList.add(currentClass);
}
function switchTurn()
{
    circleTurn=!circleTurn;
}
function setBoardHover()
{
    board.classList.remove(X_CLASS,CIRCLE_CLASS);
    if(circleTurn) board.classList.add(CIRCLE_CLASS);
    else board.classList.add(X_CLASS);
}

function checkWin(currentClass)
{
    //If currentClass is in all three of these elements 
    //inside our combination, then it will return true (showing win). 
    return WINNING_COMBINATIONS.some(combination=>{
        return combination.every(index =>{
            return cells[index].classList.contains(currentClass);
        })
    })
}

function restart()
{
    let restart=confirm('Do you want to play again?');
        if(restart){
            cells.forEach(cell=>{
                cell.classList.remove(X_CLASS,CIRCLE_CLASS);
            });
            startGame();
        }
        else{
            alert("Thank you for playing the game");
            window.close();
        }
}

function isDraw()
{
    return [...cells].every(cell=>{
        return cell.classList.contains(X_CLASS) || 
        cell.classList.contains(CIRCLE_CLASS);
    })
}