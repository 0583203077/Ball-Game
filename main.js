function onBallClick(elBall, maxDiameter) {
    // var elBall = document.querySelector(".ball");
    var currentWidth = parseInt(getComputedStyle(elBall).width);
    var randomNumber = getRandomInt()
    var radius = randomNumber + currentWidth
    if (radius > maxDiameter)
        radius = 100;
    console.log(randomNumber,radius,maxDiameter)
    elBall.style.width = radius + "px";
    elBall.style.height = radius + "px";

    elBall.style.backgroundColor = getRandomColor();
}