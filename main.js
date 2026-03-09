init();
var balls;
var undoStates = [];
var redoStates = [];
let moveCount = 0

function onBallClick(elBall, maxDiameter, index) {
    undoStates.push(saveState())
    changeBall(elBall,maxDiameter,index)
}
 

function changeBall(elBall, maxDiameter, index) {

    var currentWidth = parseInt(getComputedStyle(elBall).width);
    // var currentBackground = getComputedStyle(elBall).backgroundColor
    // balls[index].backgroundColor = currentBackground
    // balls[index].radius = currentWidth
    // undoStates.push({
    //     balls: balls.map(b => ({ ...b })),
    //     backgroundColor: getComputedStyle(document.querySelector("body")).backgroundColor
    // })
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

    // balls[index].backgroundColor = background
    // balls[index].radius = radius
    // moveCount++
}

function onBall3Click() {
    undoStates.push(saveState())
    var elBall1 = document.querySelector(".ball1");
    var elBall2 = document.querySelector(".ball2");
    changeBall(elBall1, 300, 0)
    changeBall(elBall2, 500, 1)
}

function onBall4Click() {
    undoStates.push(saveState())
    var elBall1 = document.querySelector(".ball1");
    var elBall2 = document.querySelector(".ball2");
    changeBall(elBall1, 0, 0)
    changeBall(elBall2, 0, 1)
}

function onBall5Click() {
    var body = document.querySelector("body");
    body.style.backgroundColor = getRandomColor();
    undoStates.push(saveState())
    const undoBtn = document.querySelector(".undo-btn");
    undoBtn.disabled = false
}

function onBall6Click() {
    location.reload();
}
let intervalId;
function init() {
    const undoBtn = document.querySelector(".undo-btn");
    undoBtn.disabled = true
    const redoBtn = document.querySelector(".redo-btn");
    redoBtn.disabled = true
    // var elBall1 = document.querySelector(".ball1");
    // var elBall2 = document.querySelector(".ball2");
    // balls = [{ radius: parseInt(getComputedStyle(elBall1).width), backgroundColor: getComputedStyle(elBall1).backgroundColor },
    // { radius: parseInt(getComputedStyle(elBall2).width), backgroundColor: getComputedStyle(elBall2).backgroundColor }
    // ]
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

    // redoStates.push(lastState)
    console.log(balls)
    // redoStates.push({
    //     balls: balls.map(b => ({ ...b })),
    //     backgroundColor: getComputedStyle(body).backgroundColor
    // })
    if (undoStates.length === 0) {
        elUndo.disabled = true
    }
    const redoBtn = document.querySelector(".redo-btn");
    redoBtn.disabled = false
    var elBall1 = document.querySelector(".ball1");
    var elBall2 = document.querySelector(".ball2");
    var body = document.querySelector("body");

    // balls = [{ radius: parseInt(getComputedStyle(elBall1).width), backgroundColor: getComputedStyle(elBall1).backgroundColor },
    // { radius: parseInt(getComputedStyle(elBall2).width), backgroundColor: getComputedStyle(elBall2).backgroundColor }
    // ]
    // redoStates.push({
    //     balls: balls.map(b => ({ ...b })),
    //     backgroundColor: getComputedStyle(body).backgroundColor
    // })
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
        // balls = [{ radius: parseInt(getComputedStyle(elBall1).width), backgroundColor: getComputedStyle(elBall1).backgroundColor },
        // { radius: parseInt(getComputedStyle(elBall2).width), backgroundColor: getComputedStyle(elBall2).backgroundColor }
        // ]
        // undoStates.push({
        //     balls: balls.map(b => ({ ...b })),
        //     backgroundColor: getComputedStyle(body).backgroundColor
        // })
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