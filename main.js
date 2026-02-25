function onBallClick() {
    var elBall = document.querySelector(".ball");
    var currentWidth = parseInt(getComputedStyle(elBall).width);
    var randomNumber = getRandomInt()
    elBall.style.width = (currentWidth + randomNumber) + "px";
    if (currentWidth + 50 > 400)
        elBall.style.width = 100 + "px"
    var currentHeight = parseInt(getComputedStyle(elBall).height);
    elBall.style.height = (currentHeight + randomNumber) + "px";
    if (currentHeight + 50 > 400)
        elBall.style.height = 100 + "px"
}