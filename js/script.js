'use strict';

window.addEventListener('DOMContentLoaded', () => {

    function initGame() {
        drawGrid();
        direction = INITIAL_SNAKE_KEYBOARD;
        snakeCoords = INITIAL_SNAKE_COORDS;
        snakeFood = INITIAL_SNAKE_FOOD;
        drawSnake();
        foodSnake();
        window.addEventListener('keydown', keyboardListener);
        setInterval(move, 1000);
    }

    const INITIAL_SNAKE_COORDS = [[0, 0], [1, 0], [2, 0]],
          INITIAL_SNAKE_FOOD = [[Math.round(Math.random() * 10), Math.round(Math.random() * 10)]],
          INITIAL_SNAKE_KEYBOARD = 'right',
          gameContainer = document.querySelector('.game__container');

    let direction, snakeCoords, snakeFood;

    const keyboardListener = (e) => {
        if (e.key == "ArrowUp") {
            direction = 'up';
        } else if (e.key == "ArrowDown") {
            direction = 'down';
        } else if (e.key == "ArrowLeft") {
            direction = 'left';
        } else if (e.key == "ArrowRight") {
            direction = 'right';
        }
    };

    function drawGrid() {
        for (let i = 0; i < 10; i++) {
            let gameRow = document.createElement('div');
            gameRow.classList.add('game__row');
            gameContainer.append(gameRow);

            for (let j = 0; j < 10; j++) {
                let gameCell = document.createElement('div');
                gameCell.setAttribute('data-coords-x', j);
                gameCell.setAttribute('data-coords-y', i);
                gameCell.classList.add('game__cell');
                gameRow.append(gameCell);
            }
        }
    }

    function drawSnake() {
        const rows = document.querySelectorAll('.game__row');

        rows.forEach((row, rowIndex) => {
            const cells = row.querySelectorAll('.game__cell');
            cells.forEach((cell, cellIndex) => {
                const isCellActive = snakeCoords.some(
                    c => c[0] === cellIndex && c[1] === rowIndex
                );
                cell.classList.toggle('snake', isCellActive);
            });
        });
    }

    function foodSnake() {
        const foodRows = document.querySelectorAll('.game__row');

        foodRows.forEach((row, rowIndex) => {
            const foodCells = row.querySelectorAll('.game__cell');
            foodCells.forEach((cell, cellIndex) => {
                const isFoodCellActive = snakeFood.some(
                    c => c[0] === cellIndex && c[1] === rowIndex
                );
                cell.classList.toggle('food', isFoodCellActive);
            });
        });
    }

    function move() {
        const snakeHeadCoords = snakeCoords[snakeCoords.length - 1],
              [headX, headY] = snakeHeadCoords,
              snakeFoodCoords = snakeFood[snakeFood.length -1],
              [foodX, foodY] = snakeFoodCoords;
        
        if (direction == "right") {
            snakeCoords.push([headX + 1, headY]);
        } else if (direction == "left") {
            snakeCoords.push([headX - 1, headY]);
        } else if (direction == "down") {
            snakeCoords.push([headX, headY + 1]);
        } else if (direction == "up") {
            snakeCoords.push([headX, headY - 1]);
        }

        snakeCoords.shift();

        if (headX == foodX && headY == foodY) {
            snakeFood.shift();
            snakeFood.push(
                [Math.round(Math.random() * 10), Math.round(Math.random() * 10)]
            );
        }

        drawSnake();
        foodSnake();
    }

    initGame();

});