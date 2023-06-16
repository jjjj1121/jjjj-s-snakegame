const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");
const high = document.querySelector(".high-score");


gameover=false;
score =0;
snakelength=1;
snakeX=10;
snakeY=10;
changeX=0;
changeY=0;
foodX=20;
foodY=20;
snake = [];
let highScore = localStorage.getItem("high-score") || 0;
high.innerText = `High Score: ${highScore}`;

playBoard.innerHTML=`<div class="head" style="grid-area: ${snakeY}/${snakeX}"> </div>`;
playBoard.innerHTML+=`<div class="food" style="grid-area: ${foodY}/${foodX}"> </div>`;
function snake_change(e){
    console.log(e.key)
    if (e.key =="ArrowUp" && changeY!=1){
        changeX=0;
        changeY=-1;
    }
    else if (e.key =="ArrowDown" &&changeY!= -1){
        changeX=0;
        changeY=1;
    }
    else if (e.key =="ArrowLeft"&&changeX!=1){
        changeX=-1;
        changeY=0;
    }
    else if (e.key =="ArrowRight"&&changeX!=-1){
        changeX=1;
        changeY=0;
    }
}

function foodchange(){
    foodX = Math.floor(Math.random() * 40) + 1;
    foodY = Math.floor(Math.random() * 40) + 1;
}
function handleGameOver (){
    clearInterval(x);
    alert("Game Over! Press OK to replay...");
    location.reload();
}
function snake_move(){
    snakeX+=changeX;
    snakeY+=changeY;
    for(let i =snakelength-1;i>0;i--){
        snake[i]=snake[i-1];
    }
    snake[0]=[snakeX,snakeY];
    playBoard.innerHTML=`<div class="food" style="grid-area: ${foodY}/${foodX}"> </div>`;
    for(let i=0;i<snakelength; i++){
        playBoard.innerHTML+=`<div class="head" style="grid-area: ${snake[i][1]}/${snake[i][0]}"> </div>`;
        if(snake[0][0]==snake[i][0]&&i!=0&&snake[0][1]==snake[i][1]){
            gameover=true;
            handleGameOver();
        }
    }
    if(snakeX==foodX && snakeY==foodY){
        console.log("yummy!");
        foodchange();
        score++;
        snakelength++;
        if(score > highScore){
            highScore=score;
            high.textContent=`High-score: ${score}`;
            localStorage.setItem("high-score", highScore);
        }
        scoreElement.textContent=`Score: ${score}`;
        
    }
    if(snakeX<=0 || snakeX>40 ||snakeY<=0 || snakeY>40){
        gameover=true;
        handleGameOver();
    }
}
x=setInterval(snake_move, 100)
document.addEventListener("keydown",snake_change);