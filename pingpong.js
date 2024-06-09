const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const leftScoreDisplay = document.getElementById('leftScore');
const rightScoreDisplay = document.getElementById('rightScore');

const paddleWidth = 10;
const paddleHeight = 100;
const ballRadius = 10;

let leftPaddleY = (canvas.height - paddleHeight) / 2;
let rightPaddleY = (canvas.height - paddleHeight) / 2;
let leftPaddleSpeed = 0;
let rightPaddleSpeed = 0;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5;
let ballSpeedY = 5;

let leftScore = 0;
let rightScore = 0;
let gameRunning = false;
const maxScore = 10;

const drawRect = (x, y, w, h, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
};

const drawCircle = (x, y, radius, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    ctx.fill();
};

const drawNet = () => {
    for (let i = 0; i < canvas.height; i += 40) {
        drawRect(canvas.width / 2 - 1, i, 2, 20, 'white');
    }
};

const movePaddles = () => {
    leftPaddleY += leftPaddleSpeed;
    rightPaddleY += rightPaddleSpeed;

    if (leftPaddleY < 0) {
        leftPaddleY = 0;
    } else if (leftPaddleY > canvas.height - paddleHeight) {
        leftPaddleY = canvas.height - paddleHeight;
    }

    if (rightPaddleY < 0) {
        rightPaddleY = 0;
    } else if (rightPaddleY > canvas.height - paddleHeight) {
        rightPaddleY = canvas.height - paddleHeight;
    }
};

const moveBall = () => {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY - ballRadius < 0 || ballY + ballRadius > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX - ballRadius < 0) {
        if (ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            rightScore++;
            rightScoreDisplay.textContent = rightScore;
            if (rightScore >= maxScore) {
                endGame();
            } else {
                resetBall();
            }
        }
    }

    if (ballX + ballRadius > canvas.width) {
        if (ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            leftScore++;
            leftScoreDisplay.textContent = leftScore;
            if (leftScore >= maxScore) {
                endGame();
            } else {
                resetBall();
            }
        }
    }
};

const resetBall = () => {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
};

const draw = () => {
    drawRect(0, 0, canvas.width, canvas.height, 'black');
    drawNet();
    drawRect(0, leftPaddleY, paddleWidth, paddleHeight, 'white');
    drawRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight, 'white');
    drawCircle(ballX, ballY, ballRadius, 'white');
};

const update = () => {
    movePaddles();
    moveBall();
};

const gameLoop = () => {
    if (gameRunning) {
        draw();
        update();
        requestAnimationFrame(gameLoop);
    }
};

const endGame = () => {
    gameRunning = false;
    startButton.style.display = 'block';
    startButton.textContent = 'Restart Game';
};

startButton.addEventListener('click', () => {
    gameRunning = true;
    startButton.style.display = 'none';
    leftScore = 0;
    rightScore = 0;
    leftScoreDisplay.textContent = leftScore;
    rightScoreDisplay.textContent = rightScore;
    resetBall();
    gameLoop();
});

document.addEventListener('keydown', (event) => {
    if (!gameRunning) return;

    switch (event.key) {
        case 'ArrowUp':
            rightPaddleSpeed = -10;
            break;
        case 'ArrowDown':
            rightPaddleSpeed = 10;
            break;
        case 'a':
            leftPaddleSpeed = -10;
            break;
        case 'z':
            leftPaddleSpeed = 10;
            break;
    }
});

document.addEventListener('keyup', (event) => {
    if (!gameRunning) return;

    switch (event.key) {
        case 'ArrowUp':
        case 'ArrowDown':
            rightPaddleSpeed = 0;
            break;
        case 'a':
        case 'z':
            leftPaddleSpeed = 0;
            break;
    }
});
