console.log('JavaScript OK');

// Keep these
const player = document.getElementById("player");
const myLoader = new LoaderJS();
let intervalID;
let frame = 1;
let direction = 1;

// Parameters
const totalFrames = 95;
let FPS = 24;
const videoH = 480;
let loop = true;
let loopReverse = false;

// Debug
const logFPS = document.getElementById("log-fps");
const logFrame = document.getElementById("log-frame");
const cmdChangeFPS = document.getElementById("cmd-change-fps");
const cmdGoToFrame = document.getElementById("cmd-go-to-frame");
const cmdLoop = document.getElementById("cmd-loop");
const cmdLoopR = document.getElementById("cmd-loop-reverse");
const cmdReverse = document.getElementById("cmd-reverse");
const cmdStop = document.getElementById("stop");
const cmdPlay = document.getElementById("play");

myLoader.whileLoading = function() {
    player.innerHTML = "Loading... Please wait.";
}

// for (let i = 1 ; i <= totalFrames ; i++) {
//     myLoader.loadImage(`img${i}`, `media/${i}.png`);
// }
myLoader.loadImage('strip', 'media/strip_vertical.png');

myLoader.whenReady = function() {
    console.log('All loaded!');
    player.innerHTML = "";
    play();
}

function changeFrame() {
    frame += direction;

    if (loop) {
        if (frame == totalFrames) {
            frame = 1;
        }
    } else if (loopReverse) {
        if (frame == totalFrames || frame == 1) {
            // clearInterval(intervalID);
            direction = -direction;
            console.log('(Reverse)');
        }
    } else if (frame == totalFrames) {
        clearInterval(intervalID);
    }

    player.style.backgroundPosition = `0 ${videoH * (totalFrames - frame + 1)}px`;
    logFPS.value = FPS;
    logFrame.value = frame;
}

function play() {
    console.log('Play!');
    player.style.backgroundImage = `url(media/strip_vertical.png)`;
    player.style.backgroundPosition = `0 ${videoH * (totalFrames - frame)}px`;
    player.classList.remove('loading');
    clearInterval(intervalID);
    intervalID = window.setInterval(changeFrame, 1000 / FPS);
}

cmdChangeFPS.addEventListener('change', (event) => {
    clearInterval(intervalID);
    FPS = parseInt(cmdChangeFPS.value);
    play();
});

cmdGoToFrame.addEventListener('change', (event) => {
    frame = parseInt(cmdGoToFrame.value);
});

cmdLoop.addEventListener('change', (event) => {
    loop = cmdLoop.checked;
    if (loop) {
        loopReverse = false;
        cmdLoopR.checked = false;
    }
});

cmdLoopR.addEventListener('change', (event) => {
    loopReverse = cmdLoopR.checked;
    if (loopReverse) {
        loop = false;
        cmdLoop.checked = false;
    }
});

cmdReverse.addEventListener('change', (event) => {
    if (cmdReverse.checked) {
        direction = -1;
    } else {
        direction = 1;
    }
});


cmdStop.addEventListener('click', (event) => {
    clearInterval(intervalID);
});

cmdPlay.addEventListener('click', (event) => {
    play();
});

window.addEventListener("DOMContentLoaded", (event) => {
    cmdLoop.checked = loop;
    cmdLoopR.checked = loopReverse;
    cmdReverse.checked = false;
    cmdGoToFrame.value = "";
    cmdChangeFPS.value = "";
});