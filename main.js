function onBallClick(elBall, maxDiameter) {
   
    var currentWidth = parseInt(getComputedStyle(elBall).width);
    var randomNumber = getRandomInt()
    var radius =maxDiameter? randomNumber + currentWidth:currentWidth-randomNumber
    if ((maxDiameter && radius > maxDiameter)||radius<100)
        radius = 100;
    
    console.log(randomNumber, radius, maxDiameter)
    elBall.style.width = radius + "px";
    elBall.style.height = radius + "px";

    elBall.style.backgroundColor = getRandomColor();

}

function onBall3Click() {
    var elBall1 = document.querySelector(".ball1");
    var elBall2 = document.querySelector(".ball2");
    onBallClick(elBall1, 300)
    onBallClick(elBall2, 500)
}

function onBall4Click() {
     var elBall1 = document.querySelector(".ball1");
    var elBall2 = document.querySelector(".ball2");
    onBallClick(elBall1, 0)
    onBallClick(elBall2, 0)
}

function onBall5Click() {
     var body = document.querySelector("body");
    body.style.backgroundColor = getRandomColor();
}

function onBall6Click(){
    location.reload();
}