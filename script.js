const MAX_BOARD_LINES = 5, MAX_BOARD_COLS = 40, ONE_SECOND = 1000;
let time = 0;
let lineDino = MAX_BOARD_LINES - 1;
let colDino = 2;
let colObject = [MAX_BOARD_COLS - 1];
let lineObj = MAX_BOARD_LINES - 1;
let dinoGoesDown = false;
let noObjects = 0;
let movingUp, movingDown;
let gameOver = false;
let jumping = false;

function generateButtons() {
    for (let i = 0; i < MAX_BOARD_LINES; ++i) {
        for (let j = 0; j < MAX_BOARD_COLS; ++j) {
            const button = document.createElement("button");
            button.type = "button";
            button.id = i + "-" + j;
            button.innerText = '-';
            document.body.appendChild(button);    
            if (i === MAX_BOARD_LINES - 1 && j === colDino) {
                button.style.backgroundColor = "green";
            }
            if (i === MAX_BOARD_LINES - 1 && j === colObject[noObjects]) { 
                button.style.backgroundColor = "red";
            }
            if (j === MAX_BOARD_COLS - 1 ) {
                document.body.appendChild(document.createElement("br"));
            }
        }  
    } 
}

generateButtons();

function startStopWatch() {
    document.getElementById('Score-text').innerHTML = '0';
    setInterval(increaseTimeAndAddMoreObjects, ONE_SECOND);
    setInterval(moveObjectsLeft, ONE_SECOND / 10);
}

function dinoColided() {
    for (let i = 0; i <= noObjects; ++i) {
        if (lineDino === lineObj && colDino === colObject[i]) {
            gameOver = true;
        }
    }
}

function increaseTimeAndAddMoreObjects() {
    dinoColided();
    if (gameOver === false) {
        ++time;
        if (time % 2 === 0) {
            colObject[++noObjects] = MAX_BOARD_COLS - 1;
        }
    }
    document.getElementById('Score-text').innerHTML = time;
}

function moveObjectsLeft() {
    dinoColided();
    for (let i = 0; i <= noObjects && gameOver === false; ++i) {
        if (colObject[i] >= 0 && gameOver === false) {
            const object = document.getElementById(lineObj + "-" + colObject[i]);
            object.style.backgroundColor = "red";
            if (colObject[i] != MAX_BOARD_COLS - 1) {
                const prevObject = document.getElementById(lineObj + "-" + (colObject[i] + 1));
                prevObject.style.backgroundColor = "gray";
            }
        }
        --colObject[i];
    }
}

function dinosaurJumps() {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowUp' && gameOver === false && dinoGoesDown === false 
            && lineDino === MAX_BOARD_LINES - 1 && jumping === false) {
            movingUp = setInterval(dinoMovesUp, ONE_SECOND / 10);     
        }
        jumping = true;
    });
}

dinosaurJumps();

function dinoMovesUp() {
        const dinosaur = document.getElementById((lineDino - 1) + "-" + colDino);
        dinosaur.style.backgroundColor = "green";
        const prevDino = document.getElementById(lineDino + "-" + colDino);
        prevDino.style.backgroundColor = "gray"; 
        --lineDino;
    if (lineDino === 0 && dinoGoesDown === false) {
        clearInterval(movingUp);
        dinoGoesDown = true;
        movingDown = setInterval(dinoMovesDown, ONE_SECOND / 10);
    }  
}
     
function dinoMovesDown() {
        const dinosaur = document.getElementById((lineDino + 1) + "-" + colDino);
        dinosaur.style.backgroundColor = "green";
        const prevDino = document.getElementById(lineDino + "-" + colDino);
        prevDino.style.backgroundColor = "gray";
        ++lineDino;
    if (lineDino === MAX_BOARD_LINES - 1 && dinoGoesDown === true) {
        clearInterval(movingDown);
        dinoGoesDown = false;
        jumping = false;
    }
}
