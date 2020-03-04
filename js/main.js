console.log('JavaScript OK');

// Keep these
const player = document.getElementById("player");
const myLoader = new LoaderJS();
let intervalID;
let frame = 1;
let direction = 1;

// Parameters
const totalFrames = 24;
const FPS = 25;
const videoH = 480;

myLoader.whileLoading = function() {
    player.innerHTML = "Loading... Please wait.";
}

for (let i = 1 ; i <= totalFrames ; i++) {
    myLoader.loadImage(`img${i}`, `media/${i}.png`);
}

myLoader.whenReady = function() {
    console.log('All loaded!');
    player.innerHTML = "";
    play();
}

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
    player.style.backgroundImage = `url(media/strip_vertical.png)`;
    player.style.backgroundPosition = `0 ${videoH * (totalFrames - 0)}px`;
    player.classList.remove('hidden');
    intervalID = window.setInterval(changeFrame, 1000 / FPS);
}
