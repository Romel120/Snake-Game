const board = document.querySelector(".board") ;
const scoreUpdate = document.querySelector(".score") ;
const highScoreUpdate = document.querySelector(".high-score") ;

let foodX , foodY , snakeX = 5 , snakeY = 10 , movementX = 0 , movementY = 0; 
let snakeBody = [] ;
let gameOver = false , intervalSet , score = 0 ;
let highScore = localStorage.getItem("high-score")  || 0;
highScoreUpdate.innerText = `High-Score : ${highScore}` ;


const changeFoodPos = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1 ;
}

const changeDirection = (a) => {
    if(a.key === 'ArrowUp' && movementY != 1){
        movementX = 0 ;
        movementY = -1 ;
    }
    else if(a.key === 'ArrowDown' && movementY != -1){
        movementX = 0 ;
        movementY = 1 ;
    }
    else if(a.key === 'ArrowRight' && movementX != -1){
        movementX = 1 ;
        movementY = 0 ;
    }
    else if(a.key === 'ArrowLeft' && movementX != 1){
        movementX = -1 ;
        movementY = 0 ;
    }
    Game() ;
}

const handleGameOver = () => {
    clearInterval(intervalSet) ;
    alert("Game over! Press Enter to play again..") ;
    location.reload() ;
}

//Main game board
const Game = () => {
    if(gameOver) return handleGameOver() ;
    let inGame = `<div class = "food" style = "grid-area : ${foodY} / ${foodX}"></div> ` ;
    
    if(snakeX === foodX && snakeY === foodY){
        changeFoodPos() ;
        snakeBody.push([foodX,foodY]) ;
        score++;
        if(score > highScore) highScore = score ;
       // highScore = score >= highScore ? score : highScore ;
        localStorage.setItem("high-score" , highScore) ;
        scoreUpdate.innerText = `Score : ${score}` ;
        highScoreUpdate.innerText = `High-Score : ${highScore}` ;

    }

    for (let i = snakeBody.length - 1; i > 0; i--){
        snakeBody[i] = snakeBody[i - 1] ;
       
    }

    snakeBody[0] = [snakeX, snakeY] ;

    snakeX += movementX ;
    snakeY += movementY ;

    if(snakeX <= 0 ) snakeX = 30 ;
    else if(snakeX > 30) snakeX = 0 ;
    else if(snakeY > 30) snakeY = 0 ;
    else if(snakeY > 30) snakeY = 0 ;

    for(let i = 0 ; i < snakeBody.length; i++){
        inGame += `<div class = "snake" style = "grid-area : ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div> ` ;
        if(i !== 0 && snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1] ){
            gameOver = true ;
        }
    }

    board.innerHTML = inGame ;
}
changeFoodPos() ;
intervalSet =  setInterval(Game , 125) ;
document.addEventListener("keydown" , changeDirection) ;