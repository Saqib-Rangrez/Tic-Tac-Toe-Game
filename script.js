// const { pseudo } = require("postcss-selector-parser");

const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");


let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

// create function to initialise
function initGame () {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];
    // ui clear
    boxes.forEach((box,index) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList.remove("win");
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}
// Game Initialisation Call
initGame();

function swapTurn() {
    if(currentPlayer === "X"){
        currentPlayer = "O";
    }else {
        currentPlayer = "X";
    }
    gameInfo.innerText =  `Current Player - ${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";
    winningPosition.forEach((position) => {
        if((gameGrid[position[0]] !== "" && gameGrid[position[1]] !== "" && gameGrid[position[2]] !== "")
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])){
            // check if x is winner
            if(gameGrid[position[0]] === "X"){
                answer = "X";
            }else{
                answer = "O";
            }
            // disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            // now we know the winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");

            gameInfo.innerText = `Winner Player - ${answer}`;
            newGameBtn.classList.add("active");
            return;
        }        
    });

    let fillcount = 0;
    boxes.forEach((box) => {
        if(box.innerText !== ""){
            fillcount++;
        }
    })
    if(fillcount === 9) {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
        return;
    }
    
}

function handleClick(index) {
    if(gameGrid[index] == "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        // swap turn
        swapTurn();
        // check anyone won
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);

