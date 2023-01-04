'use strict';

// x - вправо-влево
// y - вверх-вниз

window.addEventListener('DOMContentLoaded', () => {

    let direction = 'right';
     
    let snakeCoords = [0, 0];

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

    function drawSnake(activeClass) {
        const coords = document.querySelectorAll('.game__cell');

        coords.forEach(item => {         
            if (snakeCoords[0] == item.getAttribute('data-coords-x') &&
            snakeCoords[1] == item.getAttribute('data-coords-y')) {
                item.classList.add(activeClass);
            } else {
                item.classList.remove(activeClass);
            }
        });
    }

    function move() {
        const snakeHeadCoords = snakeCoords[snakeCoords.length - 1];

        if (direction == "right") {
            snakeCoords.push(snakeHeadCoords + 1);
        } else if (direction == "left") {
            snakeCoords.push(snakeHeadCoords - 1);
        }
        
        snakeCoords.shift();
    
        drawSnake('active');

        console.log(snakeCoords);
    }

    drawGrid();
    
    window.addEventListener('keydown', keyboardListener);

    setInterval(move, 1000);

});