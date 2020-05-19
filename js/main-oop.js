class Player {

    constructor (
        id='player',
        parent=document.body,
        strip='strip',
        videoH, FPS=24,
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
            '001', '002',
        ];

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


        let dlProgress = 0;

        for (let index = 0; index < this.rolls.length; index++) {
            console.log(`loading media/strip_${this.rolls[index]}.png ${this.rolls.length}`);
            let img = new Image();
            img.src = `media/strip_${this.rolls[index]}.png`;

            img.onload = function() {
                
                if (dlProgress == this.rolls.length) {
                    console.log('All loaded!');
                    this.play();
                }
            }.bind(this)
        }


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

        

        if (this.frame >= this.imgPerRoll * (this.currentRoll + 1)) {
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
        console.log('changeRoll');
        this.currentRoll += 1;
        if (this.currentRoll > this.rollNumber - 1) {
            this.currentRoll = 0;
        }
    }


    play() {

        this.player.style.backgroundImage = `url(https://demo1.gil-web.com/media/strip_${this.rolls[this.currentRoll]}.png)`;
        this.player.style.backgroundPosition = `0 ${this.videoH * (this.imgNumber - (this.frame - this.imgPerRoll * this.currentRoll))}px`;
        this.player.classList.remove('loading');
        clearInterval(this.intervalID);
        this.intervalID = window.setInterval(this.changeFrame.bind(this), 1000 / this.FPS);

    }

    
}
// (id, strip, videoH, imgNumber, rollNumber, imgPerRoll, firstImg, loop=true, loopR)
const myPlayer = new Player(
    id='player',
    parent=document.getElementById('container'),
    strip='strip',
    videoH=480,
    FPS=24,
    imgNumber=94,
    rollNumber=2,
    imgPerRoll=47,
    firstImg=1,
    loop=true,
    loopR=false,
    debug=false,
    );
// const myPlayer = new Player( 'player', 'strip', 121, 2, 61, 1, true, false );




// myPlayer.play();
// myPlayer.loadImages();

let loader = new LoaderJS();
loader.loadImage('media/strip_001.png', 'media/strip_002.png');

loader.whenReady = function() {
    console.log('All loaded!');
    myPlayer.play();
}
