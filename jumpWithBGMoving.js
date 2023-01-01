var canvasHeight = Math.floor(window.innerHeight*0.6);
var canvasWidth = Math.floor(window.innerWidth*0.7);
var ground = 16;
var gameOver = false;

var game={
    over:false,
    reset:false,
    score: 0,
    lastScore: 0
}

const context = document.querySelector("canvas").getContext("2d");

const charImg= new Image();
charImg.src = './src/characters/eyes.png';

const backgroundImg= new Image();
backgroundImg.src = 'newbg.png';

const enemyImg= new Image();
enemyImg.src = './src/characters/enemySS.png';

context.canvas.height = canvasHeight;
context.canvas.width = canvasWidth;

var enemies =[];

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
class Character {
    constructor(gameWidth,gameHeight){ //gameHeight= canvasHeight
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;

        this.height=100;
        this.width=100;
        this.image=charImg//document.getElementById("characterImg");

        this.x = this.width*2//parseInt(gameWidth/2); //center of the canvas
        this.y = gameHeight;
        this.xVelocity=0; //velocity of the character
        this.yVelocity=0;

        this.jumping=false;
        this.jumpCount=0;
        this.doubleJumping= false;
    }
    draw(ctx){
        //for collision detection
        // context.strokeStyle='white';
        // context.strokeRect(this.x, this.y, this.width, this.height);

        if (this.doubleJumping){
            //move the origin of matrix to center of image
            //context.translate(character.x+character.width, character.y);
            const time = new Date();
            let centerW =this.x + this.width/2;
            let centerH = this.y + this.height/2;
            ctx.save();
            ctx.translate(centerW, centerH);
            ctx.rotate(((2 * Math.PI) / 180) * time.getMilliseconds());
            //time.getSeconds());
            // + ((2 * Math.PI) / 6000) * time.getMilliseconds());
            //(90* Math.PI / 180);
            
            
            ctx.translate(-centerW, -centerH);
            
           }
        ctx.drawImage(this.image, this.x, this.y,this.width, this.height);
        ctx.restore();
    }
    update(ctrl, enemies){
        //collision detection
        enemies.forEach(enem =>{
            var dx = enem.x -this.x;//(enem.x + enem.width/2) - (this.x + this.width/2);
            var dy = enem.y -this.y;//(enem.y + enem.height/2) - (this.y + this.height/2);
            var distance = Math.sqrt(dx*dx + dy*dy);
            if (distance <enem.width/2 +this.width/2) {
            game.over =true;
            }
        })
        

        //jumping physics (make it jump when not)
        if (ctrl.up && this.jumping == false){
            this.yVelocity -= 25;
            this.jumping = true; 
            //this.image.style.transform = 'rotate(90deg)';
            //console.log("activate jumping "+ canvasWidth+ " "+canvasHeight);
        }
        // double jumping
        if (ctrl.up && this.jumping && this.jumpCount > 1 && this.doubleJumping==false){
            this.doubleJumping = true;
            this.yVelocity -= 30;
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
        this.yVelocity += 1.0;
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
    reset(){
        // reset to initial state
        this.x = 20;
        this.y =this.gameHeight; 
        this.jumping=false;
        this.jumpCount=0;
        this.doubleJumping= false;
    }
}
class Background {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        //this.images = [bg1,bg2,bg3,bg4,bg5];
        this.image =backgroundImg;//document.getElementById("backgroundImg");//backgroundImg;
        
        this.x = 0;
        this.y = 0;
        this.width = 1000;
        this.height = 600;
        this.speed = 6;
    }
    draw(ctx){
        ctx.drawImage(this.image, 0,0,1000,600,this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, 0,0,1000,600,this.x+this.width - this.speed, this.y, this.width, this.height);
        ctx.drawImage(this.image, 0,0,1000,600,this.x+this.width*2 - this.speed, this.y, this.width, this.height);
        // ctx.drawImage(this.images[1], this.x+this.width*2 +50- this.speed, this.y, this.width, this.height);
        // ctx.drawImage(this.images[3], this.x+this.width*3+50 - this.speed, this.y, this.width, this.height);
        // ctx.drawImage(this.images[4], this.x+this.width*4 - this.speed, this.y, this.width, this.height);
    }
    update(){
        if (game.lastScore == 0 && game.score >= 30 ){
            this.speed =this.speed*1.5;
            game.lastScore = game.score;
            console.log("updated: me ", this.speed);
        }
        else if (game.lastScore != 0 && game.score > game.lastScore*2){
            this.speed =this.speed*1.5;
            game.lastScore = game.score;
            console.log("updated: ", this.speed);
        }
        this.x-= this.speed;
        if(this.x < 0 -this.width) this.x=0;
    }
    reset(){
        this.x = 0;
        this.y = 0;
    }
}
class Enemy {
    constructor(gameWidth,gameHeight,type){
        this.gameWidth=gameWidth;
        this.gameHeight=gameHeight;
        this.height=60;
        this.width=60;
        this.image = enemyImg;//document.getElementById("characterImg"); //TODO
        this.type = type; // number of enemies
        this.shape = Math.floor(Math.random() * 2); //0:horizontal, 1:vertical


        this.x =gameWidth; //center of the canvas
        this.y = this.gameHeight - this.height - 16;
        this.collisionX=this.x;
        this.collisionY=this.y;
        this.xVelocity=0; //velocity of the character
        this.yVelocity=0;
        this.speed=6;
        this.randSpeed = (Math.floor(Math.random() * 4+1))*0.1+1.4; //1.1,1.2,1.3,1.4

        this.frameX = 0;
        this.maxFrame = 6;
        this.fps = 1;
        this.frameTimer = 0;
        this.frameInterval = 1000/this.fps;
        this.markDelete = false;

        if (this.type == 2 && this.shape==0){
            this.collisionX=this.x+this.width;
        }else if(this.type==2 && this.shape==1){
            this.collisionY=this.y - this.height;
        }else if(this.type==3){
            this.collisionY=this.y - this.height*2;
        }    
    }
    draw(ctx){
        //for collision detection
        // context.strokeStyle='white';
        // context.strokeRect(this.x, this.y, this.width, this.height);
        if (this.type == 1){
            ctx.drawImage(this.image, this.frameX*300, 0, 300, 300, this.x, this.y,this.width, this.height);
        }else if(this.type ==2){
            if (this.shape){
                ctx.drawImage(this.image, this.frameX*300, 0, 300, 300, this.x, this.y,this.width, this.height);
                ctx.drawImage(this.image, this.frameX*300, 0, 300, 300, this.x+this.width, this.y,this.width, this.height);
            }else{
                ctx.drawImage(this.image, this.frameX*300, 0, 300, 300, this.x, this.y,this.width, this.height);
                ctx.drawImage(this.image, this.frameX*300, 0, 300, 300, this.x, this.y-this.height,this.width, this.height);
            }
            
        }else{
            ctx.drawImage(this.image, this.frameX*300, 0, 300, 300, this.x, this.y,this.width, this.height);
            ctx.drawImage(this.image, this.frameX*300, 0, 300, 300, this.x, this.y-this.height,this.width, this.height);
            ctx.drawImage(this.image, this.frameX*300, 0, 300, 300, this.x, this.y-this.height*2,this.width, this.height);
        }
        
    }
    update(){
        //if (this.frameTimer > this.frameInterval){
            if (this.frameX >= this.maxFrame){
                this.frameX=0;
            }else{
                this.frameX ++;
            }
        //}
    
        this.x -= this.speed*this.randSpeed;
        if (game.lastScore == 0 && game.score >= 30 ){
            this.speed =this.speed*1.5;
            game.lastScore = game.score;
            console.log("updated: me ", this.speed);
        }
        else if (game.lastScore != 0 && game.score > game.lastScore*2){
            this.speed =this.speed*1.5;
            game.lastScore = game.score;
            console.log("updated: ", this.speed);
        }

        if(this.x < 0-this.width){
            this.markDelete = true;
            game.score += this.type*5;
        }
    }
    reset(){
        this.x =gameWidth; //center of the canvas
        this.y = this.gameHeight-this.height;
    }
}


// setInterval(displayHello, 1000);

// function displayHello() {
//   document.getElementById("demo").innerHTML += "Hello";
// }

function handleEnemies(){

    if (enemyTimer > enemyInterval+randomInterval){
        let randType = Math.floor(Math.random() * 9);
        if(randType <4){
            enemies.push(new Enemy(canvasWidth, canvasHeight,1));
        } else if(4 <= randType&& randType <=6){
            enemies.push(new Enemy(canvasWidth, canvasHeight,2));
        }else{
            enemies.push(new Enemy(canvasWidth, canvasHeight,3));
        }
        
        enemyTimer=0;
        randomInterval = Math.random()*1000+500;
    enemyInterval = Math.random()*500+1000;
        
    } else{
        enemyTimer += 16; //deltaTime
    }
    // Math.floor(Math.random() * 10);
    enemies.forEach(enemy =>{
        enemy.draw(context);
        enemy.update();
        
    })
    enemies =enemies.filter(en =>!en.markDelete);
}

function displayStatusText(ctx){
    ctx.fillStyle = 'white';
    ctx.font = '30px Gerogia'
    ctx.fillText ('Score: '+game.score, this.canvasWidth-200,50);

    if(game.over){
        ctx.fillStyle='black';
        ctx.fillRect( 0, 100, canvasWidth, 120);
        ctx.textAlign ='center';

        ctx.fillStyle='red';
        ctx.font = '50px Gerogia'
        ctx.fillText ('GAME OVER', this.canvasWidth/2,150);
        ctx.font = '20px Gerogia'
        ctx.fillText ('press SPACE to restart              스페이스바를 누르세요', this.canvasWidth/2,200);
        //ctx.fillText ('', this.canvasWidth/2,210);
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
enemies.push(new Enemy(canvasWidth, canvasHeight,1));

let lastTime = 0;
let enemyTimer = 0;
let enemyInterval = 2000;
let randomInterval = Math.random()*1000+500;

function animationLoop(){//merging the controller logic with physics
    //const deltaTime = timeStamp - lastTime;


    //context.clearRect(0,0,window.innerWidth,window.innerHeight);
    resizeWindow();
    // background moving
    background.draw(context);
    background.update();
    //jumping physics (make it jump when not)
    character.update(controller, enemies);
    //draw character
    character.draw(context);
   
    //draw enemy
    // enemy1.draw(context);
    // enemy1.update();
    handleEnemies();
    context.save(); //?
    context.restore();

    displayStatusText(context);
    
    // if (game.reset){
    //     character.reset();
    //     enemy1.reset();
    //     background.reset();
    // }

    //call the loop function again when the browser is ready to draw again
    if (!game.over){
        window.requestAnimationFrame(animationLoop);
    }
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

function restartGame(){
    game.reset = true;
    game.over= false;
    location.reload();
    //window.requestAnimationFrame(animationLoop);
}

function selectCharacter() {
  //document.getElementById("demo").innerHTML = "Hello World" + jumpCount;
  characterPng.src = 'pun.png';
}