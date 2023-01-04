'use strict';

window.addEventListener('DOMContentLoaded', () => {

    let direction = 'right';
     
    let snakeCoords = ['0:3'];

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
                gameCell.setAttribute('data-coords', `${i}:${j}`);
                gameCell.classList.add('game__cell');
                gameRow.append(gameCell);
            }
        }
    }

    function drawSnake(activeClass) {
        const coords = document.querySelectorAll('.game__cell');

        coords.forEach(item => {         
            if (snakeCoords[0] == item.getAttribute('data-coords')) {
                item.classList.add(activeClass);
            }
        });
    }

    function move() {
        snakeCoords.shift();

        if (direction == "right") {
            snakeCoords.unshift('0:5');
        }
        
        drawSnake('active');
    }

    drawGrid();
    
    window.addEventListener('keydown', keyboardListener);

    setInterval(move, 1000);

});