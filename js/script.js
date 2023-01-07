'use strict';

window.addEventListener('DOMContentLoaded', () => {

    function initGame() {
        drawGrid();
        direction = INITIAL_SNAKE_KEYBOARD;
        snakeCoords = INITIAL_SNAKE_COORDS;
        snakeFood = INITIAL_SNAKE_FOOD;
        foodSnake();
        drawSnake();
        window.addEventListener('keydown', keyboardListener);
        setInterval(move, 1000);
    }

    const INITIAL_SNAKE_COORDS = [[0, 0], [1, 0], [2, 0]],
          INITIAL_SNAKE_FOOD = [[rndCoordsFood(0, 9), rndCoordsFood(0, 9)]],
          INITIAL_SNAKE_KEYBOARD = 'right';

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
        const gameContainer = document.querySelector('.game__container');

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

    function rndCoordsFood(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
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

    function move() {
        const snakeHeadCoords = snakeCoords[snakeCoords.length - 1],
              [headX, headY] = snakeHeadCoords,
              snakeFoodCoords = snakeFood[snakeFood.length -1],
              [foodX, foodY] = snakeFoodCoords;

        let countHeadX = headX === 9 ? -1 : headX < 0 ? 9 : headX,
            countHeadY = headY === 9 ? -1 : headY < 0 ? 9 : headY;

        if (headX == foodX && headY == foodY) {
            snakeFood.shift();
            snakeCoords.push([foodX, foodY]);   
            snakeFood.push([rndCoordsFood(0, 9), rndCoordsFood(0, 9)]);
        }

        if (direction == 'right') {
            snakeCoords.push([countHeadX + 1, countHeadY]);
        } else if (direction == 'left') {
            snakeCoords.push([countHeadX - 1, countHeadY]);
        } else if (direction == 'down') {
            snakeCoords.push([countHeadX, countHeadY + 1]);
        } else if (direction == 'up') {
            snakeCoords.push([countHeadX, countHeadY - 1]);
        }
        snakeCoords.shift();

        foodSnake();
        drawSnake();
    }

    initGame();

});