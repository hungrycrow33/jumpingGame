var canvasHeight = Math.floor(window.innerHeight*0.6);
var canvasWidth = Math.floor(window.innerWidth*0.7);
var ground = 16;

const context = document.querySelector("canvas").getContext("2d");

const backgroundImg= new Image();
backgroundImg.src = 'background.png';

context.canvas.height = canvasHeight;
context.canvas.width = canvasWidth;


class Character {
    constructor(gameWidth,gameHeight){ //gameHeight= canvasHeight
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;

        this.height=80;
        this.width=80;
        this.image=document.getElementById("characterImg");

        this.x =parseInt(gameWidth/2); //center of the canvas
        this.y = gameHeight;
        this.xVelocity=0; //velocity of the character
        this.yVelocity=0;

        this.jumping=false;
        this.jumpCount=0;
        this.doubleJumping= false;
    }
    draw(ctx){
        if (this.doubleJumping){
            //move the origin of matrix to center of image
            //context.translate(character.x+character.width, character.y);
            const time = new Date();
            let centerW =this.x + this.width/2;
            let centerH = this.y + this.height/2;
            ctx.translate(centerW, centerH);
            ctx.rotate(((2 * Math.PI) / 180) * time.getMilliseconds());
            //time.getSeconds());
            // + ((2 * Math.PI) / 6000) * time.getMilliseconds());
            //(90* Math.PI / 180);
            ctx.translate(-centerW, -centerH);
           }
        ctx.drawImage(this.image, this.x, this.y,this.width, this.height);
    }
    update(ctrl){
        //jumping physics (make it jump when not)
        if (ctrl.up && this.jumping == false){
            this.yVelocity -= 20;
            this.jumping = true; 
            this.image.style.transform = 'rotate(90deg)';
            //console.log("activate jumping "+ canvasWidth+ " "+canvasHeight);
        }
        // double jumping
        if (ctrl.up && this.jumping && this.jumpCount > 1 && this.doubleJumping==false){
            this.doubleJumping = true;
            this.yVelocity -= 20;
            // console.log("double jumping");
        }
        
        //left movement
        if (ctrl.left){
            this.xVelocity -= 0.5; // 그냥 값을 설정하는 것보다 스무스하게 움직임
        } 
        //right movement
        if (ctrl.right){
            this.xVelocity += 0.5;
        }

        //gravity
        this.yVelocity += 1.5;
        //add velocity to the position
        this.x += this.xVelocity;
        this.y += this.yVelocity;
        //friction
        this.xVelocity *= 0.9; //점점 멈추는것같은 없으면 엄청 스피드 업
        this.yVelocity *= 0.9;

        //collision detection
        var groundLevel = this.gameHeight - 16 - this.height; //TODO: 16 is ground. global?
        if (this.y > groundLevel){ //hitting the ground, falling below the ground
            //when hitting the ground:
            this.jumping = false;
            this.doubleJumping = false;
            this.y = groundLevel;
            this.jumpCount = 0;
            this.yVelocity = 0; // 없으면 계속 떨어지고 있어서 위로 잘 못뛰어요
        }
        //when leftmost
        if(this.x < -this.width){ 
            this.x = this.gameWidth;
        }
        //when rightmost
        else if(this.x > this.gameWidth){
            this.x = -this.width;
        }
    }
}

class Controller {
    constructor(){
        this.left=false;
        this.right=false;
        this.up=false;
        this.turn=false;
    }
    keyListener(event){
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
}

class Background {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        //this.images = [bg1,bg2,bg3,bg4,bg5];
        this.image =backgroundImg;//document.getElementById("backgroundImg");//backgroundImg;
        
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

class Enemy {
    constructor(gameWidth,gameHeight){
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.height=80;
        this.width=80;
        this.image = document.getElementById("characterImg"); //TODO

        this.x =0; //center of the canvas
        this.y = this.gameHeight-this.height;
    }
    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y,this.width, this.height);
    }
}

function resizeWindow() {
    context.clearRect(0,0,window.innerWidth,window.innerHeight);
    canvasHeight =  Math.floor(window.innerHeight*0.6);
    canvasWidth = Math.floor(window.innerWidth*0.7);
    context.canvas.height = canvasHeight;
    context.canvas.width = canvasWidth;
}

const background = new Background(canvasWidth, canvasHeight);
const character = new Character(canvasWidth, canvasHeight);
const controller = new Controller();
const enemy1 = new Enemy(canvasWidth, canvasHeight);

function animationLoop(){//merging the controller logic with physics
    //context.clearRect(0,0,window.innerWidth,window.innerHeight);
    resizeWindow();
    // background moving
    background.draw(context);
    background.update();
    //jumping physics (make it jump when not)
    character.update(controller);
    //draw character
    character.draw(context);
   
    //draw enemy
    enemy1.draw(context);

    context.save(); //?
    context.restore();
    
    //call the loop function again when the browser is ready to draw again
    window.requestAnimationFrame(animationLoop);
};

//adding eventListener to th e window(obj)
//whenever that event is fired, exectue the controller.keyListener function
window.addEventListener("keydown", controller.keyListener);
window.addEventListener("keyup", controller.keyListener);
window.requestAnimationFrame(animationLoop);

//////////////////////////////////////////////////////////////////////
//character selection//TODO
const element = document.getElementById("char1");
element.addEventListener("click", selectCharacter);

function selectCharacter() {
  //document.getElementById("demo").innerHTML = "Hello World" + jumpCount;
  characterPng.src = 'pun.png';
}