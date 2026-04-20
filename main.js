
let balls;
let undoStates = [];
let redoStates = [];
let moveCount = 0
let seconds = 0
let timerId = null
let intervalId;
let intervalCounter = 0

function init() {
    document.title = `Ball Game (${moveCount})`
    const undoBtn = document.querySelector(".undo-btn");
    const redoBtn = document.querySelector(".redo-btn");
    const ball6 = document.querySelector(".ball6");
    let hoverTimer = null;

    undoBtn.disabled = true
    redoBtn.disabled = true

    ball6.addEventListener("mouseenter", () => {
        hoverTimer = setTimeout(() => {
            startClickHandlers()
            intervalCounter = 0
        }, 2000);
    });

    ball6.addEventListener("mouseleave", () => {
        clearTimeout(hoverTimer);
        clearInterval(intervalId);
    });
}

init();

function onBallClick(elBall, maxDiameter) {
    saveAndUpdate()
    changeBall(elBall, maxDiameter)
}

function onBall3Click() {
    saveAndUpdate();
    const { elBall1, elBall2 } = getBalls();
    changeBall(elBall1, 300)
    changeBall(elBall2, 500)
}

function onBall4Click() {
    saveAndUpdate();
    const { elBall1, elBall2 } = getBalls();
    changeBall(elBall1, 0)
    changeBall(elBall2, 0)
}

function onBall5Click() {
    saveAndUpdate();
    const body = document.querySelector("body");
    body.style.backgroundColor = getRandomColor();
    const undoBtn = document.querySelector(".undo-btn");
    undoBtn.disabled = false
}

function onBall6Click() {
    location.reload();
    stopTimer()
    const timerLabel = document.querySelector(".timer");
    timerLabel.textContent = seconds
}

function undo(elUndo) {
    var lastState = undoStates.pop();

    if (undoStates.length === 0) {
        elUndo.disabled = true
    }
    const redoBtn = document.querySelector(".redo-btn");
    redoBtn.disabled = false
    redoStates.push(saveState())
    applyState(lastState);
}

function redo(elRedo) {
    if (redoStates.length != 0) {
        const lastState = redoStates.pop();
        elRedo.disabled = (redoStates.length === 0)
        undoStates.push(saveState())
        const undoBtn = document.querySelector(".undo-btn");
        undoBtn.disabled = (undoStates.length === 0)
        applyState(lastState);
    }
}

function saveAndUpdate() {
    undoStates.push(saveState());
    updateCounter();
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
        const timerLabel = document.querySelector(".timer");
        timerLabel.textContent = seconds
    }, 1000)
}

function stopTimer() {
    clearInterval(timerId)
    timerId = null
}

function changeBall(elBall, maxDiameter) {
    let currentWidth = parseInt(getComputedStyle(elBall).width);
    let undoBtn = document.querySelector(".undo-btn");
    undoBtn.disabled = false

    let randomNumber = getRandomInt()
    let radius = maxDiameter ? randomNumber + currentWidth : currentWidth - randomNumber
    if ((maxDiameter && radius > maxDiameter) || radius < 100)
        radius = 100;

    elBall.style.width = radius + "px";
    elBall.style.height = radius + "px";
    elBall.style.backgroundColor = getRandomColor();
}

function startClickHandlers() {
    intervalId = setInterval(() => {
        intervalCounter++
        if (intervalCounter === 10) {
            clearInterval(intervalId);
            console.log("האינטרוול נעצר", intervalCounter);
        }
        console.log("רץ כל 2 שניות", intervalCounter);
        saveAndUpdate();
        onBall3Click()
        onBall4Click()
    }, 2000);
}

function saveState() {
    const { elBall1, elBall2 } = getBalls();
    var body = document.querySelector("body");

    balls = [{ radius: parseInt(getComputedStyle(elBall1).width), backgroundColor: getComputedStyle(elBall1).backgroundColor },
    { radius: parseInt(getComputedStyle(elBall2).width), backgroundColor: getComputedStyle(elBall2).backgroundColor }
    ]
    return {
        balls: balls.map(b => ({ ...b })),
        backgroundColor: getComputedStyle(body).backgroundColor
    }
}

function applyState(state) {
    const { elBall1, elBall2 } = getBalls();

    elBall1.style.width = state.balls[0].radius + "px";
    elBall1.style.height = state.balls[0].radius + "px";
    elBall1.style.backgroundColor = state.balls[0].backgroundColor;

    elBall2.style.width = state.balls[1].radius + "px";
    elBall2.style.height = state.balls[1].radius + "px";
    elBall2.style.backgroundColor = state.balls[1].backgroundColor;

    document.body.style.backgroundColor = state.backgroundColor;
}

function getBalls() {
    return {
        elBall1: document.querySelector(".ball1"),
        elBall2: document.querySelector(".ball2")
    };
}