const canvas = document.querySelector('#game');
const gameOverScreen= document.getElementById('gameover-screen');
const game =  canvas.getContext('2d');
let canvasSize;
let elementsSize;

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
let spanLives = document.querySelector('#lives')
let spanTime = document.querySelector('#time')



let flag = true;
let level = 0;
let lives = 3; 

const playerPosition = {
    x: undefined,
    y: undefined,
}

const giftPosition = {
    x: undefined,
    y: undefined,
}

let firePosition = [];
let deaths = [];

window.addEventListener('load',setCanvasSize);
window.addEventListener('resize',setCanvasSize);

/* RENDER IMAGES */


function setCanvasSize(){
    

    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
    } else {
        canvasSize = window.innerHeight * 0.7;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);


    elementsSize = canvasSize/10;

    startGame();

}

function startGame() {

    if (lives <= 0) {
        
        gameOver()
        
    } else{

        

        showLives();
    
        game.font = elementsSize + 'px Verdana';
        game.textAlign = 'end';

        const map = maps[level];
        if(!map){
        winner();
        return;
        }

        /* if(lives = 0){
        gameOverScreen.style.display = "inline"; 
        return;
        } */
        const mapRows =  map.trim().split('\n');
        const mapRowCols = mapRows.map(row => row.trim().split(''));

        game.clearRect(0, 0, canvasSize, canvasSize);
        mapRowCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
          const emoji = emojis[col];
          const posX = elementsSize * (colI + 1);
          const posY = elementsSize * (rowI + 1);

          if (col == 'O'){
            if (!playerPosition.x && !playerPosition.y){
            playerPosition.x = posX;
            playerPosition.y = posY;
            }
          } else if (col == 'I'){
                giftPosition.x = posX;
                giftPosition.y = posY;

          } else if (col == 'X' && flag) {
            firePosition.push({
                x: posX,
                y: posY,
            });
            }

          game.fillText(emoji, posX, posY);

        });
      });
    
        movePlayer()    
        flag = false;
       

    }
}


function movePlayer(){
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    const giftCollision = giftCollisionX && giftCollisionY;

    if(giftCollision){
        levelWin();
    }

    const enemyCollision = firePosition.find(fire => {
        const fireCollisionX = fire.x.toFixed(3) == playerPosition.x.toFixed(3);
        const fireCollisionY = fire.y.toFixed(3) == playerPosition.y.toFixed(3);
        return fireCollisionX && fireCollisionY;
    });

    if(enemyCollision){
        deaths.push({
            x: playerPosition.x.toFixed(3),
            y: playerPosition.y.toFixed(3),
        });
        levelFail();
    }

    game.fillText(emojis['PLAYER'],playerPosition.x,playerPosition.y);
    
}
/* CONTROLS */

btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);


function moveUp(){
    if(playerPosition.y > elementsSize) {
        playerPosition.y -= elementsSize;
        startGame();
        
    }
   

   
    
}
function moveLeft(){
    if(playerPosition.x > elementsSize){
        playerPosition.x -= elementsSize;
        startGame();
    }
}
function moveRight(){
    if(playerPosition.x < canvasSize){
        playerPosition.x += elementsSize;
        startGame();
    }
}
function moveDown(){
    if(playerPosition.y < canvasSize) {
        playerPosition.y += elementsSize;
        startGame();
    }
}

window.addEventListener('keydown', moveByKey);

function moveByKey(event) {
   
    if(event.key==="ArrowUp") moveUp();
        else if (event.key==="ArrowLeft") moveLeft();
            else if (event.key==="ArrowRight") moveRight();
                else if (event.key==="ArrowDown") moveDown();
    
}

function levelWin(){
    flag = true;
    firePosition.length = 0;
    level++;
    startGame();
}
function winner (){
    alert('GG !!!')

}

function levelFail(){

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    lives--;
    showLives();
    startGame();
}

function showLives() {
    spanLives.innerHTML = emojis['HEART'].repeat(lives)
  }

function showTime(){
    
}

function gameOver(){

    document.getElementById('gameover-screen').style.display = 'inline';
    
}

function gameReload(){
    level = 0;
    lives = 3;
    flag = true;
    firePosition.length = 0;
    document.getElementById('gameover-screen').style.display = 'none';
    startGame()
    
}