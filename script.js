let time = 0;
const boardLines = 5, boardCols = 40, HUNDRED = 100, oneSecond = 1000;
let lineDino = boardLines - 1, colDino = 2;
let colObject = [boardCols - 1], lineObj = boardLines - 1;
let dinoGoesDown = 0, noObjects = 0;

generateButtons();

function generateButtons() {
    for (let i = 0; i < boardLines; ++i) {
        for (let j = 0; j < boardCols; ++j) {
            const button = document.createElement("button");
            button.type = "button";
            button.id = i * HUNDRED + j;
            button.innerText = '-';
            document.body.appendChild(button);    
            if (i == boardLines - 1 && j == colDino) {
                button.style.backgroundColor = "green";
            }
            if (i == boardLines - 1 && j == colObject[noObjects]) { 
                button.style.backgroundColor = "red";
            }
            if (j == boardCols - 1 ) {
                document.body.appendChild(document.createElement("br"));
            }
        }  
    } 
}

function startStopWatch() {
    document.getElementById('Score-text').innerHTML = '0';
    setInterval(increaseTimeAndAddMoreObjects, oneSecond);
    setInterval(moveObjectsLeft, oneSecond / 10);
}

function increaseTimeAndAddMoreObjects() {
    for (let i = 0; i <= noObjects; ++i) {
        if (lineDino == lineObj && colDino == colObject[i]) {
            return time;
        }
    }
    ++time;
    if (time % 2 == 0) {
        colObject[++noObjects] = boardCols - 1;
    }
    document.getElementById('Score-text').innerHTML = time;
}

function moveObjectsLeft() {
    for (let i = 0; i <= noObjects; ++i) {
        if (lineDino == lineObj && colDino == colObject[i]) {
            return;
        }
        if (colObject[i] >= 0) {
            const strangeObject = document.getElementById(lineObj * HUNDRED + colObject[i]);
            strangeObject.style.backgroundColor = "red";
            if (colObject[i] != boardCols - 1) {
                const prevObject = document.getElementById(lineObj * HUNDRED + colObject[i] + 1);
                prevObject.style.backgroundColor = "gray";
            }
        }
        --colObject[i];
    }
}

dinosaurJumps();

function dinosaurJumps() {
    const input = document.querySelector("input");
    const log = document.getElementById("log");
    input.addEventListener("keydown", checkKey);

    function checkKey(e) {
        textContent = e.code;
        if (textContent == "ArrowUp") {
            dinoGoesDown = 0;
            setInterval(dinoMovesUp, oneSecond / 10);
        }
    }

    function dinoMovesUp() {
        if (dinoGoesDown == 0) {
            const dinosaur = document.getElementById((lineDino - 1) * HUNDRED + colDino);
            dinosaur.style.backgroundColor = "green";
            const prevDino = document.getElementById(lineDino * HUNDRED + colDino);
            prevDino.style.backgroundColor = "gray"; 
            --lineDino;  
        }  
        if (lineDino == 0) {
            dinoGoesDown = 1;
            setInterval(dinoMovesDown, oneSecond / 10);
        }  
    }
     
    function dinoMovesDown() {
        if (dinoGoesDown == 1) {
            const dinosaur = document.getElementById((lineDino + 1) * HUNDRED + colDino);
            dinosaur.style.backgroundColor = "green";
            const prevDino = document.getElementById(lineDino * HUNDRED + colDino);
            prevDino.style.backgroundColor = "gray";
            ++lineDino;
        }
        if (lineDino == boardLines - 1) {
            dinoGoesDown = 2;
        }
    }
}
     
