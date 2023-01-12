'use strict';

window.addEventListener('DOMContentLoaded', () => {

    function start() {
        drawGrid();
        snakeCoords = START_SNAKE_COORDS;
        snakeFood = START_SNAKE_FOOD;
        direction = START_DIRECTION;
        window.addEventListener('keydown', keyboardListener);
    }

    const START_SNAKE_COORDS = [[0, 0], [1, 0], [2, 0]],
          START_SNAKE_FOOD = [[rnd(3, 9), rnd(0, 9)]],
          START_DIRECTION = 'right';

    let snakeCoords, snakeFood, direction;

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

    function drawFood() {
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

    function rnd(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }

    function move() {   
        const snakeHeadCoords = snakeCoords[snakeCoords.length - 1],
              [headX, headY] = snakeHeadCoords,
              snakeFoodCoords = snakeFood[snakeFood.length -1],
              [foodX, foodY] = snakeFoodCoords;               
    
        if (headX === foodX && headY === foodY) {
            snakeCoords.unshift([foodX, foodY]); 
            snakeFood.shift();

            let newFoodCoords = [];
            for (let key in snakeCoords) {
                let [xS, yS] = snakeCoords[key],
                    [xR, yR] = [rnd(0, 9), rnd(0, 9)];
                
                if (xS != xR && yS != yR) {
                    newFoodCoords = [xR, yR];     
                }
            }
            snakeFood.push(newFoodCoords);
        }     
        
        drawSnake();
        drawFood();

        if (direction == 'right') {
            // snakeCoords.push(
            //     [headX > 9 ? 0 : headX < 0 ? 9 : headX + 1, headY]
            // );
            snakeCoords.push([headX + 1, headY]);            
        } else if (direction == 'left') {
            // snakeCoords.push(
            //     [headX > 9 ? 0 : headX < 0 ? 9 : headX - 1, headY]
            // );
            snakeCoords.push([headX - 1, headY]);
        } else if (direction == 'down') {
            // snakeCoords.push(
            //     [headX, headY > 9 ? 0 : headY < 0 ? 9 : headY + 1]
            // );
            snakeCoords.push([headX, headY + 1]);
        } else if (direction == 'up') {
            // snakeCoords.push(
            //     [headX, headY > 9 ? 0 : headY < 0 ? 9 : headY - 1]
            // );
            snakeCoords.push([headX, headY - 1]);
        }
        snakeCoords.shift();

        let hit = [];
        hit = snakeCoords.filter((bah) => {
            return hit[bah] || !(hit[bah] = !0);
        });
    
        if (headX > 9 || headY > 9 || headX < 0 || headY < 0 || hit != '') {
            clearInterval(stop);
        }
    }

    start();

    let stop = setInterval(move, 500);

});