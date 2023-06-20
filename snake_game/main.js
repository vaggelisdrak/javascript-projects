const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const scoreText = document.querySelector("#scoreText");
const highscoreText = document.querySelector("#highscoreText");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const boardBackground = "white";
const snakeColor = "lightgreen";
const snakeBorder = "black";
const foodColor ="red";
const unitSize = 25;
let running = false;
let xVelocity = unitSize;
let yVelocity = 0;
let foodX;
let foodY;
let score = 0;
let highscore = 0;
let snake = [
    { x: unitSize*4, y:0},
    { x: unitSize*3, y: 0 },
    { x: unitSize*2, y: 0 },
    { x: unitSize, y: 0 },
    { x: 0, y: 0 }
];

window.addEventListener("keydown", changeDirection);
resetBtn.addEventListener("click", resetGame);

gameStart();
createFood();
drawFood();

function gameStart(){
    running = true;
    scoreText.textContent = score;
    createFood();
    drawFood();
    nextTick();
}

function nextTick() {
    if(running){
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 75);
    }else{
        displayGameOver();
    }
}

function clearBoard() {
    ctx.fillStyle = boardBackground;
    ctx.fillRect(0,0,gameWidth,gameHeight);
}

function createFood() {
    function randomFood(min,max){
        const randNum = Math.round((Math.random() * (max-min) + min)/unitSize) * unitSize;
        return randNum;
        console.log(randNum);
    }

    foodX = randomFood(0, gameWidth - unitSize)
    foodY = randomFood(0, gameWidth - unitSize)
}

function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(foodX,foodY,unitSize,unitSize)
}

function moveSnake() {
    const head = {x: snake[0].x + xVelocity,
                    y: snake[0].y + yVelocity};
    snake.unshift(head) //expand snake head continuesly

    // if snake eats food update score else make it smaller 
    if(snake[0].x == foodX && snake[0].y == foodY){
        score+=1;
        scoreText.textContent = score;
        if(score >= highscore){
            highscore = score;
            highscoreText.textContent = highscore;
        }
        createFood();
    }else{
        //reduce tail , so it seems like its is moving
        snake.pop()
         
    }
}

function drawSnake() {
    ctx.fillStyle = snakeColor;
    ctx.strokeStyle = snakeBorder;
    snake.forEach((snakepart)=>{
        ctx.fillRect(snakepart.x, snakepart.y, unitSize, unitSize)
        ctx.strokeRect(snakepart.x, snakepart.y, unitSize, unitSize)
    })
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    console.log(keyPressed);
    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    const goingUp = (yVelocity == -unitSize);
    const goingDown = (yVelocity == unitSize);
    const goingRight = (xVelocity == unitSize);
    const goingLeft = (xVelocity == -unitSize);

    switch(true){
        case(keyPressed == LEFT && !goingRight):
            xVelocity = -unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == UP && !goingDown):
            yVelocity = -unitSize;
            xVelocity = 0;
            break;
        case (keyPressed == RIGHT && !goingLeft):
            xVelocity = unitSize;
            yVelocity = 0;
            break;
        case (keyPressed == DOWN && !goingUp):
            yVelocity = unitSize;
            xVelocity = 0;
            break;
    }
}

function checkGameOver() {
    switch(true){
        case(snake[0].x < 0):
            running = false;
            break;
        case (snake[0].x >= gameWidth):
            running = false;
            break;
        case (snake[0].y < 0):
            running = false;
            break;
        case (snake[0].y >= gameHeight):
            running = false;
            break;
    }

    for(let i=1;i<snake.length;i++){
        if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
            running = false;
        }
    }
}

function displayGameOver() {
    ctx.font = "50px MV Boli";
    ctx.fillStyle ="black";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!",gameWidth/2,gameHeight/2);
    running = false;
}

function resetGame() {
    score = 0;
    xVelocity = unitSize;
    yVelocity = 0;
    snake = [
        { x: unitSize * 4, y: 0 },
        { x: unitSize * 3, y: 0 },
        { x: unitSize * 2, y: 0 },
        { x: unitSize, y: 0 },
        { x: 0, y: 0 }
    ];
    gameStart();
}
