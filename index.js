let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#newGame-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let Main = document.querySelector("main");

let turn0 = true;// playerX, player0
let count = 0;

const winPattern = [
    [0,1,2], 
    [0,4,8],
    [0,3,6],
    [3,4,5], 
    [6,7,8],  
    [1,4,7], 
    [2,5,8],  
    [2,4,6]
];
boxes.forEach((box) => {
    box.addEventListener("click",() => {

        if(turn0){ //player0
            box.innerText = "O";
            turn0 = false;
            box.style.color = "green";
        }
        else{ //playerX
            box.innerText = "X";
            turn0 = true;
            box.style.color = "red";
        }
        box.disabled = true;
        count++;
        let isWinner = checkWinner();
        
        if (count === 9 && !isWinner) {
            gameDraw();
          }
        
    })
});

const disableBoxes = () =>{
    for (let box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () =>{
    for (let box of boxes) {
        box.disabled = false;
        box.innerText=""; 
    }
}
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    Main.classList.add("hide");
    disableBoxes();
}
const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;  
    msgContainer.classList.remove("hide");
    Main.classList.add("hide");
    disableBoxes();
}


const checkWinner = () => {
     for (pattern of winPattern) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
            }
        }

     }
};

   const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    Main.classList.remove("hide");
    count = 0;
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
