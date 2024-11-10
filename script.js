const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");
const mazeSize = 10; 
const cellSize = 40; 
canvas.width = mazeSize * cellSize;
canvas.height = mazeSize * cellSize;


const maze = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const player = { x: 1, y: 1 };
const goal = { x: 8, y: 8 };
let moves = 0;


function drawMaze() {
    for (let y = 0; y < maze.length; y++) {
        for (let x = 0; x < maze[y].length; x++) {
            ctx.fillStyle = maze[y][x] === 1 ? "#333" : "#fff";
            ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
    }
    drawPlayer();
    drawGoal();
}

function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x * cellSize, player.y * cellSize, cellSize, cellSize);
}

function drawGoal() {
    ctx.fillStyle = "green";
    ctx.fillRect(goal.x * cellSize, goal.y * cellSize, cellSize, cellSize);
}


function checkVictory() {
    if (player.x === goal.x && player.y === goal.y) {
        document.getElementById("moves").innerText = `Steps: ${moves}`;
        document.getElementById("message-container").style.display = "block";
    }
}


function movePlayer(dx, dy) {
    const newX = player.x + dx;
    const newY = player.y + dy;
    if (maze[newY][newX] === 0) {
        player.x = newX;
        player.y = newY;
        moves++;
        drawMaze();
        checkVictory();
    }
}


document.addEventListener("keydown", function (e) {
    switch (e.key) {
        case "ArrowUp":
            movePlayer(0, -1);
            break;
        case "ArrowDown":
            movePlayer(0, 1);
            break;
        case "ArrowLeft":
            movePlayer(-1, 0);
            break;
        case "ArrowRight":
            movePlayer(1, 0);
            break;
    }
});


function restartGame() {
    player.x = 1;
    player.y = 1;
    moves = 0;
    document.getElementById("message-container").style.display = "none";
    drawMaze();
}


drawMaze();