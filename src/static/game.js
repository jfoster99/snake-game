const SNAKE_SIZE = 20;
const SCREEN_WIDTH = 800;
const SCREEN_HEIGHT = 600;
const SNAKE_SPEED = 15;

class Snake {
    constructor() {
        this.body = [{x: SCREEN_WIDTH / 2, y: SCREEN_HEIGHT / 2}];
        this.direction = {x: SNAKE_SIZE, y: 0};
        this.growPending = false;
    }

    move() {
        const head = this.body[0];
        const newHead = {
            x: head.x + this.direction.x,
            y: head.y + this.direction.y
        };

        if (newHead.x < 0 || newHead.x >= SCREEN_WIDTH ||
            newHead.y < 0 || newHead.y >= SCREEN_HEIGHT) {
            return false;
        }

        if (this.body.slice(1).some(segment => 
            segment.x === newHead.x && segment.y === newHead.y)) {
            return false;
        }

        this.body.unshift(newHead);
        if (!this.growPending) {
            this.body.pop();
        } else {
            this.growPending = false;
        }
        return true;
    }

    grow() {
        this.growPending = true;
    }

    collidesWith(food) {
        const head = this.body[0];
        return head.x === food.x && head.y === food.y;
    }

    draw(ctx) {
        ctx.fillStyle = '#00FF00';
        this.body.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, SNAKE_SIZE - 2, SNAKE_SIZE - 2);
        });
    }
}

class Food {
    constructor() {
        this.spawn();
    }

    spawn() {
        this.x = Math.floor(Math.random() * (SCREEN_WIDTH / SNAKE_SIZE)) * SNAKE_SIZE;
        this.y = Math.floor(Math.random() * (SCREEN_HEIGHT / SNAKE_SIZE)) * SNAKE_SIZE;
    }

    draw(ctx) {
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(this.x, this.y, SNAKE_SIZE - 2, SNAKE_SIZE - 2);
    }
}

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let snake = new Snake();
let food = new Food();
let gameOver = false;

document.addEventListener('keydown', (event) => {
    if (gameOver) return;
    
    switch(event.key) {
        case 'ArrowLeft':
            if (snake.direction.x === 0) snake.direction = {x: -SNAKE_SIZE, y: 0};
            break;
        case 'ArrowRight':
            if (snake.direction.x === 0) snake.direction = {x: SNAKE_SIZE, y: 0};
            break;
        case 'ArrowUp':
            if (snake.direction.y === 0) snake.direction = {x: 0, y: -SNAKE_SIZE};
            break;
        case 'ArrowDown':
            if (snake.direction.y === 0) snake.direction = {x: 0, y: SNAKE_SIZE};
            break;
    }
});

function gameLoop() {
    if (gameOver) {
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '48px Arial';
        ctx.fillText('Game Over!', SCREEN_WIDTH/2 - 100, SCREEN_HEIGHT/2);
        return;
    }

    if (!snake.move()) {
        gameOver = true;
        return;
    }

    if (snake.collidesWith(food)) {
        snake.grow();
        food.spawn();
    }

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    snake.draw(ctx);
    food.draw(ctx);
}

setInterval(gameLoop, 1000 / SNAKE_SPEED);