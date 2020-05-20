class Player {

    constructor (
        id='player',
        parent=document.body,
        strip='strip',
        videoW,
        videoH,
        FPS=24,
        imgNumber,
        rollNumber=1,
        imgPerRoll,
        firstImg=1,
        loop=true,
        loopR=false,
        debug=false,
        ) {

        this.player;
        
        // Parameters
        this.strip = strip;
        this.imgNumber = imgNumber;
        this.rollNumber = rollNumber; 
        this.imgPerRoll = imgPerRoll;
        // this.firstImg = firstImg;
        this.loop = loop;
        this.loopR = loopR;
        this.debug = debug;

        // Internal
        this.intervalID;
        this.frame = firstImg;
        this.direction = 1;
        // this.reverse = loopR ? 1 : 0;
        this.FPS = FPS;
        this.videoW = videoW;
        this.videoH = videoH;

        // UI
        this.element = this.buildDOM();
        this.id = id;

        // Create DOM element
        parent.appendChild(this.element);
        // this.setEventListeners();

        this.burn = false;
        this.currentRoll = 0;
        this.rolls = [
            '001', '002', '003', '004'
        ];

        this.imagesFiles = [];

    }

    loadImages() {
        // let loader = new LoaderJS();

        // let toLoad = [];

        // for (let index = 0; index < this.rolls.length; index++) {
        //     toLoad.push(`media/strip_${this.rolls[index]}.png`);
        //     loader.loadImage(`media/strip_${this.rolls[index]}.png`);
        // }

        // loader.loadImage('media/strip_001.png');



        // loader.whenReady = function() {
        //     console.log('All loaded!');
        //     this.play();
        // }.bind(this)

        // loader.loadImage(toLoad);


        // let dlProgress = 0;

        let imagesURL = [];
        // let images = [];

        function loadImage(url) {
            // console.log(`loading ${url}...`)

            return new Promise((resolve, reject) => {
                let img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = url;
            });
            
            // img.onload = function() {
            //     console.log(`${url} loaded`);
            //     return img;
            // }
            // return 'img';
        }

        for (let index = 0; index < this.rolls.length; index++) {
            // console.log('hu?');
            imagesURL[index] = `media/stripX4/strip_${this.rolls[index]}.png`;
        }

        // for (let index = 0; index < imagesURL.length; index++) {
        //     console.log('what?');
        //     images[index] = loadImage(imagesURL[index]);
        // }

        const sayhello = (images) => {
            // console.log(`hello!\n${images}`);
            this.imagesFiles = [...images];
            this.play();
        }

        async function loadAllImages() {
            let images = []
            for (let index = 0; index < imagesURL.length; index++) {
                // console.log('what?');
                images[index] = await loadImage(imagesURL[index]);
                let imgX = await loadImage('https://picsum.photos/1920/1080');
                let imgY = await loadImage('https://picsum.photos/1920/2160');
                let imgZ = await loadImage('https://picsum.photos/2160/1080');
            }
            return sayhello(images);
        }

        loadAllImages();

        // for (let index = 0; index < this.rolls.length; index++) {
        //     console.log(`loading media/strip_${this.rolls[index]}.png ${this.rolls.length}`);
        //     let img = new Image();
        //     img.src = `${window.location}/media/stripX4/strip_${this.rolls[index]}.png`;

        //     console.log(`window.location: ${window.location}`);

        //     img.onload = function() {
        //         console.log('One image loaded')
                
        //         if (dlProgress == this.rolls.length) {
        //             console.log('All loaded!');
        //             this.play();
        //         }
        //     }.bind(this)
        // }


    }

    buildDOM() {

        this.player = document.createElement('div');
        this.player.id = "player";

        if (this.debug) {
            const dom = document.createElement('div');
            dom.id = 'container';

            dom.innerHTML = `
            <div id="commands">
                <p>
                    <label for="cmd-change-fps">Change FPS: </label>
                    <input id="cmd-change-fps">
                </p>

                <p>
                    <label for="cmd-go-to-frame">Go to frame: </label>
                    <input id="cmd-go-to-frame">
                </p>
                <p>
                    <label for="cmd-loop">Loop: </label>
                    <input id="cmd-loop" type="checkbox">
                </p>
                <p>
                    <label for="cmd-loop-reverse">Loop R: </label>
                    <input id="cmd-loop-reverse" type="checkbox">
                </p>
                <p style="justify-content: center;">
                    <label for="cmd-reverse">Reverse: </label>
                    <input id="cmd-reverse" type="checkbox">
                </p>
                <p style="justify-content: center;">
                    <button id="stop" style="display: inline-block;">Stop</button>
                </p>
                <p style="justify-content: center;">
                    <button id="play" style="display: inline-block;">Play</button>
                </p>
            </div>`;

            dom.prepend(this.player);
            return dom;

        } else {

            return this.player;

        }
    }


    changeFrame() {

        // console.log(`this.frame= ${this.frame}`);
        // console.log(`this.direction= ${this.direction}`);
        // console.log(`this.id= ${this.id}`);

        this.frame += this.direction;

        if (this.frame == this.imgPerRoll * (this.currentRoll + 1)) {
            this.burn = true;
            // this.frame += 1;
        }

        // console.log(`this.currentRoll= ${this.currentRoll}`);
        // console.log(`this.imgPerRoll * (this.currentRoll + 1)= ${this.imgPerRoll * (this.currentRoll + 1)}`);

        if (this.loop) {
            if (this.frame == this.imgNumber) {
                this.frame = 1;
                // this.currentRoll = 0;
                // this.burn = false;
                // console.log('yolo');
            }
        } else if (this.loopR) {
            if (this.frame == this.imgNumber || this.frame == 1) {
                // clearInterval(intervalID);
                this.direction = -this.direction;
            }
        } else if (this.frame == this.imgNumber) {
            clearInterval(this.intervalID);
            // this.currentRoll = 0;
        }

        this.player.style.backgroundPosition = `0 ${this.videoH * (this.imgNumber - this.frame + 1)}px`;

        if (this.burn) {
            this.changeRoll();
            this.play();
            this.burn = false;
        }
    }


    changeRoll() {
        // console.log('changeRoll');
        this.currentRoll += 1;
        if (this.currentRoll > this.rollNumber - 1) {
            this.currentRoll = 0;
        }
    }


    play() {

        // console.log(`this.imagesFiles: ${this.imagesFiles}`);

        // Change roll with many files
        // this.player.style.backgroundImage = `url(media/stripX4/strip_${this.rolls[this.currentRoll]}.png)`;
        this.player.style.backgroundImage = `url(${this.imagesFiles[this.currentRoll].src})`;
        this.player.style.backgroundPosition = `0 ${this.videoH * (this.imgNumber - (this.frame - this.imgPerRoll * this.currentRoll))}px`;

        // Change roll with one file
        // this.player.style.backgroundImage = `url(media/strip_final.png)`;
        // this.player.style.backgroundPosition = `${this.videoW * (-this.currentRoll)}px ${this.videoH * (this.imgNumber - this.frame - this.imgPerRoll % this.currentRoll) }px`;


        this.player.classList.remove('loading');
        clearInterval(this.intervalID);
        this.intervalID = window.setInterval(this.changeFrame.bind(this), 1000 / this.FPS);

    }

    
}
// (id, strip, videoH, imgNumber, rollNumber, imgPerRoll, firstImg, loop=true, loopR)
// const myPlayer = new Player(
//     id='player',
//     parent=document.getElementById('container'),
//     strip='strip',
//     videoH=480,
//     FPS=24,
//     imgNumber=94,
//     rollNumber=2,
//     imgPerRoll=47,
//     firstImg=1,
//     loop=true,
//     loopR=false,
//     debug=false,
//     );

const myPlayer = new Player(
    id='player',
    parent=document.getElementById('container'),
    strip='strip',
    videoW=720,
    videoH=480,
    FPS=24,
    imgNumber=96,
    rollNumber=4,
    imgPerRoll=24,
    firstImg=1,
    loop=true,
    loopR=false,
    debug=false,
    );


// myPlayer.play();
myPlayer.loadImages();

// let loader = new LoaderJS();

// loader.loadImage('media/strip_001.png', 'media/strip_002.png');

// loader.loadImage(
//         '_w/demo/media/death_strip/strip_001.png',
//         '_w/demo/media/death_strip/strip_002.png',
//         '_w/demo/media/death_strip/strip_003.png',
//         '_w/demo/media/death_strip/strip_004.png',
//     );

// loader.loadImage('media/strip_final.png');

// loader.whenReady = function() {
//     console.log('All loaded!');
//     myPlayer.play();
// }
