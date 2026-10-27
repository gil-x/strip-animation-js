console.log('JavaScript OK');

// Keep these
const player = document.getElementById("player");
const strip = new Image();
let intervalID;
let frame = 1;
let direction = 1;

// Parameters
const totalFrames = 24;
const FPS = 25;
const videoH = 480;

player.innerHTML = "Loading... Please wait.";

strip.onload = function() {
    console.log('All loaded!');
    player.innerHTML = "";
    play();
}

strip.onerror = function() {
    console.error(`Can't load ${strip.src}`);
}

strip.src = "media/strip_vertical.webp";

function changeFrame() {
    player.style.backgroundPosition = `0 ${videoH * (totalFrames - frame + 1)}px`;
    frame += direction;

    if (frame == 24 || frame == 1) {
        // clearInterval(intervalID);
        direction = -direction;
        console.log('(Reverse)');
    }
}

function play() {
    console.log('Play!');
    player.style.backgroundImage = `url(${strip.src})`;
    player.style.backgroundPosition = `0 ${videoH * (totalFrames - 0)}px`;
    player.classList.remove('hidden');
    intervalID = window.setInterval(changeFrame, 1000 / FPS);
}
