var context, controller, character, loop;
var canvasHeight = Math.floor(window.innerHeight*0.6);
var canvasWidth = Math.floor(window.innerWidth*0.7);
var ground = 16;


context = document.querySelector("canvas").getContext("2d");

var img = document.getElementById("characterImg");
const characterPng = new Image();
characterPng.src = 'soju.png';

const backgroundImg= new Image();
backgroundImg.src = 'background.png';

const bg1 = new Image();
bg1.src ="Untitled_Artwork66.png"
const bg2 = new Image();
bg2.src ="Untitled_Artwork67.png"
const bg3 = new Image();
bg3.src ="Untitled_Artwork68.png"
const bg4 = new Image();
bg4.src ="Untitled_Artwork71.png"
const bg5 = new Image();
bg5.src ="Untitled_Artwork73.png"


context.canvas.height = canvasHeight;
context.canvas.width = canvasWidth;

//background////////////////////////////////
const BUFFER = document.querySelector("canvas").getContext("2d");
const TILE_SIZE = 10;
const columns = 140;//80;//19;//parseInt(canvasWidth/TILE_SIZE);//19;
const rows = 60;//40;//14;//parseInt(canvasHeight/TILE_SIZE);//14;
 // Each tile object has a color.
 const TILES = {
    0: { color:'#1B1572' }, // blue
    1: { color:'#F9F2EF' }, // star
    2: { color:'#FFFFFF' } // star 
 }
 const PARTS = { // colums
    // each length: 30 (30 rows)
    // num of alphabets: 15 (15 columns)
    A: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    B: [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    C: [0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    D: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    E: [0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    F: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    G: [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
    H: [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    I: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    J: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    K: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
    L: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    M: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
    N: [0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    O: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],

    
    
 };
  var all= [PARTS.A,PARTS.B,PARTS.C,PARTS.D,PARTS.E,PARTS.F,PARTS.G,PARTS.H,PARTS.I,
    PARTS.J,PARTS.K,PARTS.L,PARTS.M,PARTS.N,PARTS.O,PARTS.O,PARTS.O,PARTS.O,PARTS.O,PARTS.O] //20
    var blank = Array(100).fill(PARTS.O)
    var all = all.concat(blank).concat(all) //140
 function getMultipleRandom(arr, num) {
    
    const shuffled = [...arr].sort(() => 0.63 - Math.random());
  
    return shuffled.slice(0, num);
  }

 const MAP = {
    width:   columns * TILE_SIZE,
    height:  rows * TILE_SIZE,
    // This is used during image scaling to ensure the rendered image is not skewed.
    widthHeightRatio: columns/rows, //how wide and tall the map is. scale, maintain the ratio when moving the window
    // The values in this array correspond to the keys in the TILES object.
    
    //   tiles2: [[0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    //   [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
    //   [0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    //   [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0],
    //   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]
    tiles2: getMultipleRandom(all,100) //second parameter: how many colums
};

function renderTiles(){  
    var mapIndex = 0; // represents the position in the MAP.tiles array (where we  get our tile  value from)
    // to filp the map upsidedown, just put the last index: 16*14-1 and decrement mapIdex 
  
    var numCol = all.length
    
    for (var heightIndex=0; heightIndex<MAP.tiles2.length; heightIndex+=1){

        var subArray = MAP.tiles2[heightIndex]; // sub arrays
       // console.log("colum num: "+heightIndex + "col: "+col)
        for (var tileIndex=0; tileIndex<subArray.length; tileIndex+=1){
            
            var tileValue = subArray[tileIndex]; // get tile value from the map
            var tile = TILES[tileValue]; //get the tile obj from the  TILES
           // console.log("tileIndex: "+ tileIndex+" value: "+ tileValue)
            BUFFER.fillStyle= tile.color;
            BUFFER.fillRect(heightIndex*TILE_SIZE, tileIndex*TILE_SIZE, TILE_SIZE, TILE_SIZE); 
        }
        
    }
}
/////////////////////////////////////////////////


character = {
    height:80,
    width:80,

    x:parseInt(canvasWidth/2), //center of the canvas
    y:canvasHeight,
    xVelocity:0, //velocity of the character
    yVelocity:0,

    jumping:false,
    jumpCount: 0,
    doubleJumping: false

};


controller = { //object
    left:false,
    right:false,
    up:false,
    turn:false,

    //when eventlistener is 
    keyListener: function(event){
        //check the key type
        var keyState = (event.type == "keydown")?true:false; //?왜 
        //var keyRelease = (event.type == "keyup")?true:false;
        switch(event.keyCode){
            // arrows
            case 37: // left
                controller.left=keyState;
            break;
            case 38: // up
                controller.up=keyState;
                console.log("up button pressed: "+character.jumpCount);
            break;
            case 39: // right
                controller.right=keyState;
            break;

            // others
            case 65: // a (left)
                controller.left=keyState;
            break; 
            // case 87: // w (up)
            // controller.up=keyState;
            //  break;
             case 68: // d (right)
                controller.right=keyState;
            break;
            case 32: // space
                controller.up=keyState;
                if (keyState){ // count jump only at keydown
                    character.jumpCount +=1;
                }
            break;

            case 81: //q: test turning
                controller.turn=keyState;
            break;

        } 
    }
};

class Background {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.images = [bg1,bg2,bg3,bg4,bg5];
        this.image =backgroundImg;
        
        this.x = 0
        this.y = 0;
        this.width = 1000
        this.height = 600
        this.speed = 10
    }
    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x+this.width - this.speed, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x+this.width*2 - this.speed, this.y, this.width, this.height);
        // ctx.drawImage(this.images[1], this.x+this.width*2 +50- this.speed, this.y, this.width, this.height);
        // ctx.drawImage(this.images[3], this.x+this.width*3+50 - this.speed, this.y, this.width, this.height);
        // ctx.drawImage(this.images[4], this.x+this.width*4 - this.speed, this.y, this.width, this.height);
    }
    update(){
        this.x-= this.speed;
        if(this.x < 0 -this.width) this.x=0;
    }
}
 const background = new Background(canvasWidth, canvasHeight);

loop = function(){//merging the controller logic with physics
    
    resizeWindow();
    //context.clearRect(0,0,window.innerWidth,window.innerHeight);

    // background moving
    background.draw(context);
    background.update();


    //jumping physics (make it jump when not)
    if (controller.up && character.jumping == false){
        character.yVelocity -= 20;
        character.jumping = true; 
        characterPng.style.transform = 'rotate(90deg)';
        console.log("activate jumping "+ canvasWidth+ " "+canvasHeight);
    }
    // double jumping
    if (controller.up && character.jumping && character.jumpCount > 1 && character.doubleJumping==false){
        character.doubleJumping = true;
        character.yVelocity -= 20;
        console.log("double jumping");
    }
    
    //left movement
    if (controller.left){
        character.xVelocity -= 0.5; // 그냥 값을 설정하는 것보다 스무스하게 움직임
    } 
    //right movement
    if (controller.right){
        character.xVelocity += 0.5;
    }

    // turn 360
    if (controller.turn){
        
        characterPng.style.transform = 'rotate(90deg)';
        console.log("q pressed");
         }


    //gravity
    character.yVelocity += 1.5;
    //add velocity to the position
    character.x += character.xVelocity;
    character.y += character.yVelocity;
    //friction
    character.xVelocity *= 0.9; //점점 멈추는것같은 없으면 엄청 스피드 업
    character.yVelocity *= 0.9;

    //collision detection
    var groundLevel = canvasHeight - ground - character.height;
    if (character.y > groundLevel){ //hitting the ground, falling below the ground
        //when hitting the ground:
        character.jumping = false;
        character.doubleJumping = false;
        character.y = groundLevel;
        character.jumpCount = 0;
        character.yVelocity = 0; // 없으면 계속 떨어지고 있어서 위로 잘 못뛰어요
    }

    //when leftmost
    if(character.x < -character.width){ 
        character.x = canvasWidth;
    }
    //when rightmost
    else if(character.x > canvasWidth){
        character.x = -character.width;
    }

    // every frame, do these:
    
    // paint the background 
    // context.fillStyle = "#281e82";
    // context.fillRect(0,0,canvasWidth,canvasHeight); //x,y,width,height
    // context.save();
    //renderTiles();
    //renderDisplay();

    // draw character
   
    //move the origin of matrix to center of image
    //context.translate(character.x+character.width, character.y);
    if (character.doubleJumping){
        const time = new Date();
        let centerW =character.x + character.width/2;
        let centerH = character.y + character.height/2;
        context.translate(centerW, centerH);
        context.rotate(((2 * Math.PI) / 180) * time.getMilliseconds());
        //time.getSeconds());
        // + ((2 * Math.PI) / 6000) * time.getMilliseconds());
        //(90* Math.PI / 180);
        context.translate(-centerW, -centerH);
       }
    
    context.drawImage(characterPng, character.x, character.y,character.width, character.height);
   context.save();
   
   
   
   context.restore();
    /*// draw a red square
    context.fillStyle = "#ff0000";
    context.beginPath(); 
    context.rect(character.x, character.y, character.width, character.height);
    */
    
    /* // draw the ground (red line)
    context.fill();
    context.strokeStyle = "#ff0000";
    context.lineWidth = 4;
    context.beginPath();
    context.moveTo(0,canvasHeight-ground);
    context.lineTo(canvasWidth,canvasHeight-ground);
    context.stroke(); */
   
    //call the loop function again when the browser is ready to draw again
    window.requestAnimationFrame(loop);
};

function renderDisplay(){ // one call per second , 30~60fps
    context.drawImage(BUFFER.canvas, 0,0);
}

// Set the initial width and height of the BUFFER and the DISPLAY canvases.
BUFFER.canvas.width  = context.canvas.width  = MAP.width;
BUFFER.canvas.height = context.canvas.height = MAP.height;
// To ensure there is no anti-aliasing when drawing to the canvas, set image smoothing to false on both canvases.
BUFFER.imageSmoothingEnabled = context.imageSmoothingEnabled = false;


function resizeWindow() {
  
    context.clearRect(0,0,window.innerWidth,window.innerHeight);
    canvasHeight =  Math.floor(window.innerHeight*0.6);
    canvasWidth = Math.floor(window.innerWidth*0.7);
    //character.x = parseInt(canvasWidth/2);
   // character.y = parseInt(canvasHeight-character.height);
   
    context.canvas.height = canvasHeight;
    context.canvas.width = canvasWidth;

}

 // Draw the individual tiles to the buffer.
 //renderTiles();
 // Draw the BUFFER to the DISPLAY canvas.
 //renderDisplay();

//adding eventListener to th e window(obj)
//whenever that event is fired, exectue the controller.keyListener function

window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(loop);


//////////////////////////////////////////////////////////////////////
//character selection//
//일단 캐릭터버튼별
const element = document.getElementById("char1");
element.addEventListener("click", selectCharacter);

function selectCharacter() {
  //document.getElementById("demo").innerHTML = "Hello World" + jumpCount;
  characterPng.src = 'pun.png';
}