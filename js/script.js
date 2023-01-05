'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const gameContainer = document.querySelector('.game__container');

    let direction = 'right';
    let snakeCoords = [[0, 0], [1, 0], [2, 0]];
    let snakeFood = [];

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
                const isCellActive = snakeCoords.some(c => c[0] === cellIndex && c[1] === rowIndex);
                console.log('isCellActive:', isCellActive)
                if (isCellActive) {
                    console.log('isCellActive:', isCellActive, cell);
            }
                cell.classList.toggle('active', isCellActive);
            })
        })
    }

    function foodSnake() {
        const food = document.querySelectorAll('.game__cell');

        food.forEach(item => {
            if (snakeFood[0] == item.getAttribute('data-coords-x') &&
            snakeFood[1] == item.getAttribute('data-coords-y')) {
                item.classList.add('food');
            } else {
                item.classList.remove('food');
            }
        });

        if (snakeFood.length == 0) {
            snakeFood.push(
                Math.round(Math.random() * 10), Math.round(Math.random() * 10)
            );
            console.log(snakeFood);
        } else if (snakeCoords[0] == snakeFood[0] &&
            snakeCoords[1] == snakeFood[1]) {
                snakeFood.splice(0);
        }

    }

    function move() {
        snakeCoords.shift();

        const snakeHeadCoords = snakeCoords[snakeCoords.length - 1];
        const [headX, headY] = snakeHeadCoords;

        if (direction == "right") {
            snakeCoords.push([headX + 1, headY]);
        } else if (direction == "left") {
            snakeCoords.push([headX - 1, headY]);
        } else if (direction == "bottom") {
            snakeCoords.push([headX, headY + 1]);
        } else if (direction == "left") {
            snakeCoords.push([headX, headY - 1]);
        }

        drawSnake();
        foodSnake();
    }

    drawGrid();
    drawSnake();

    window.addEventListener('keydown', keyboardListener);

    setInterval(move, 1000);

});