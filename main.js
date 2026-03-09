
var balls;
var undoStates = [];
var redoStates = [];
let moveCount = 0
let seconds = 0
let timerId = null

init();

function onBallClick(elBall, maxDiameter) {
    undoStates.push(saveState())
    changeBall(elBall, maxDiameter)
    updateCounter()
}

function updateCounter() {
    if (moveCount === 0) {
        startTimer()
    }
    moveCount++
    document.title = `Ball Game (${moveCount})`
}

function startTimer() {
    if (timerId !== null) return

    timerId = setInterval(function () {
        seconds++
        console.log(seconds)
        const timerLabel = document.querySelector(".timer");
        timerLabel.textContent = seconds
    }, 1000)
}

function stopTimer() {
    clearInterval(timerId)
    timerId = null
}

function changeBall(elBall, maxDiameter) {
    var currentWidth = parseInt(getComputedStyle(elBall).width);
    console.log(undoStates)
    const undoBtn = document.querySelector(".undo-btn");
    undoBtn.disabled = false

    var randomNumber = getRandomInt()
    var radius = maxDiameter ? randomNumber + currentWidth : currentWidth - randomNumber
    if ((maxDiameter && radius > maxDiameter) || radius < 100)
        radius = 100;

    console.log(randomNumber, radius, maxDiameter)
    elBall.style.width = radius + "px";
    elBall.style.height = radius + "px";
    var background = getRandomColor();
    elBall.style.backgroundColor = background
}

function onBall3Click() {
    updateCounter()
    undoStates.push(saveState())
    var elBall1 = document.querySelector(".ball1");
    var elBall2 = document.querySelector(".ball2");
    changeBall(elBall1, 300)
    changeBall(elBall2, 500)
}

function onBall4Click() {
    updateCounter()
    undoStates.push(saveState())
    var elBall1 = document.querySelector(".ball1");
    var elBall2 = document.querySelector(".ball2");
    changeBall(elBall1, 0)
    changeBall(elBall2, 0)
}

function onBall5Click() {
    updateCounter()
    var body = document.querySelector("body");
    body.style.backgroundColor = getRandomColor();
    undoStates.push(saveState())
    const undoBtn = document.querySelector(".undo-btn");
    undoBtn.disabled = false
}

function onBall6Click() {
    // undoStates.push(saveState())
    // moveCount++
    // document.title = `Ball Game (${moveCount})`

    location.reload();
    stopTimer()
const timerLabel = document.querySelector(".timer");
        timerLabel.textContent = seconds
}
let intervalId;
function init() {
    document.title = `Ball Game (${moveCount})`
    const undoBtn = document.querySelector(".undo-btn");
    undoBtn.disabled = true
    const redoBtn = document.querySelector(".redo-btn");
    redoBtn.disabled = true
    const ball6 = document.querySelector(".ball6");
    let hoverTimer = null;

    ball6.addEventListener("mouseenter", () => {
        hoverTimer = setTimeout(() => {
            console.log("Hover מעל 2 שניות");
            startClickHandlers()
            intervalCounter = 0
        }, 2000);
    });

    ball6.addEventListener("mouseleave", () => {
        clearTimeout(hoverTimer);
        clearInterval(intervalId);
    });
}

let intervalCounter = 0



function startClickHandlers() {
    intervalId = setInterval(function () {
        intervalCounter++
        if (intervalCounter === 10) {
            clearInterval(intervalId);
            console.log("האינטרוול נעצר", intervalCounter);
        }
        console.log("רץ כל 2 שניות", intervalCounter);
        updateCounter()
        undoStates.push(saveState())
        onBall3Click()
        onBall4Click()
    }, 2000);
}

function saveState() {
    var elBall1 = document.querySelector(".ball1");
    var elBall2 = document.querySelector(".ball2");
    var body = document.querySelector("body");

    balls = [{ radius: parseInt(getComputedStyle(elBall1).width), backgroundColor: getComputedStyle(elBall1).backgroundColor },
    { radius: parseInt(getComputedStyle(elBall2).width), backgroundColor: getComputedStyle(elBall2).backgroundColor }
    ]
    return {
        balls: balls.map(b => ({ ...b })),
        backgroundColor: getComputedStyle(body).backgroundColor
    }
}

function undo(elUndo) {
    var lastState = undoStates.pop();
    var body = document.querySelector("body");

    console.log(balls)

    if (undoStates.length === 0) {
        elUndo.disabled = true
    }
    const redoBtn = document.querySelector(".redo-btn");
    redoBtn.disabled = false
    var elBall1 = document.querySelector(".ball1");
    var elBall2 = document.querySelector(".ball2");
    var body = document.querySelector("body");

    redoStates.push(saveState())
    console.log("currentWidth " + getComputedStyle(elBall1).width)
    console.log("lastState " + lastState.balls[0].radius)
    elBall1.style.width = lastState.balls[0].radius + "px";
    elBall1.style.height = lastState.balls[0].radius + "px"
    elBall1.style.backgroundColor = lastState.balls[0].backgroundColor
    elBall2.style.width = lastState.balls[1].radius + "px";
    elBall2.style.height = lastState.balls[1].radius + "px"
    elBall2.style.backgroundColor = lastState.balls[1].backgroundColor
    body.style.backgroundColor = lastState.backgroundColor

    console.log(lastState)
}

function redo(elRedo) {
    if (redoStates.length != 0) {
        var lastState = redoStates.pop();
        elRedo.disabled = (redoStates.length === 0)

        var elBall1 = document.querySelector(".ball1");
        var elBall2 = document.querySelector(".ball2");
        var body = document.querySelector("body");

        undoStates.push(saveState())
        const undoBtn = document.querySelector(".undo-btn");
        undoBtn.disabled = (undoStates.length === 0)

        console.log("currentWidth " + getComputedStyle(elBall1).width)
        console.log("lastState " + lastState.balls[0].radius)
        elBall1.style.width = lastState.balls[0].radius + "px";
        elBall1.style.height = lastState.balls[0].radius + "px"
        elBall1.style.backgroundColor = lastState.balls[0].backgroundColor
        elBall2.style.width = lastState.balls[1].radius + "px";
        elBall2.style.height = lastState.balls[1].radius + "px"
        elBall2.style.backgroundColor = lastState.balls[1].backgroundColor
        body.style.backgroundColor = lastState.backgroundColor
        console.log(lastState)
    }
}