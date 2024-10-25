const MAX_BOARD_LINES = 5, MAX_BOARD_COLS = 40, HUNDRED = 100, ONE_SECOND = 1000;
let time = 0;
let lineDino = MAX_BOARD_LINES - 1;
let colDino = 2;
let colObject = [MAX_BOARD_COLS - 1];
let lineObj = MAX_BOARD_LINES - 1;
let dinoGoesDown = 0;
let noObjects = 0;
let movingUp, movingDown;

function generateButtons() {
    for (let i = 0; i < MAX_BOARD_LINES; ++i) {
        for (let j = 0; j < MAX_BOARD_COLS; ++j) {
            const button = document.createElement("button");
            button.type = "button";
            button.id = i * HUNDRED + j;
            //button.id = i + "-" + j;
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

function increaseTimeAndAddMoreObjects() {
    for (let i = 0; i <= noObjects; ++i) {
        if (lineDino === lineObj && colDino === colObject[i]) {
            //return time;
            return;
        }
    }
    ++time;
    if (time % 2 === 0) {
        colObject[++noObjects] = MAX_BOARD_COLS - 1;
    }
    document.getElementById('Score-text').innerHTML = time;
}

function moveObjectsLeft() {
    for (let i = 0; i <= noObjects; ++i) {
        if (lineDino === lineObj && colDino === colObject[i]) {
            return;
        }
        if (colObject[i] >= 0) {
            const strangeObject = document.getElementById(lineObj * HUNDRED
                + colObject[i]);
            strangeObject.style.backgroundColor = "red";
            if (colObject[i] != MAX_BOARD_COLS - 1) {
                const prevObject = document.getElementById(lineObj * HUNDRED 
                    + colObject[i] + 1);
                prevObject.style.backgroundColor = "gray";
            }
        }
        --colObject[i];
    }
}

function dinosaurJumps() {
    const input = document.querySelector("input");
    input.addEventListener("keydown", checkKey);

    function checkKey(e) {
        textContent = e.code;
        if (textContent === "ArrowUp") {
            dinoGoesDown = 0;
            movingUp = setInterval(dinoMovesUp, ONE_SECOND / 10);
        }
    }

    function dinoMovesUp() {
        if (dinoGoesDown === 0) {
            const dinosaur = document.getElementById((lineDino - 1) * HUNDRED + colDino);
            dinosaur.style.backgroundColor = "green";
            const prevDino = document.getElementById(lineDino * HUNDRED + colDino);
            prevDino.style.backgroundColor = "gray"; 
            --lineDino;  
        }  
        if (lineDino === 0) {
            clearInterval(movingUp);
            dinoGoesDown = 1;
            movingDown = setInterval(dinoMovesDown, ONE_SECOND / 10);
        }  
    }
     
    function dinoMovesDown() {
        if (dinoGoesDown === 1) {
            const dinosaur = document.getElementById((lineDino + 1) * HUNDRED + colDino);
            dinosaur.style.backgroundColor = "green";
            const prevDino = document.getElementById(lineDino * HUNDRED + colDino);
            prevDino.style.backgroundColor = "gray";
            ++lineDino;
        }
        if (lineDino === MAX_BOARD_LINES - 1) {
            clearInterval(movingDown);
            dinoGoesDown = 0;
        }
    }
}

dinosaurJumps();
     
