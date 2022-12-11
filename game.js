const canvas = document.querySelector('#game');
const game =  canvas.getContext('2d');
let canvasSize;
let elementsSize;

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
let spanLives = document.querySelector('#lives')

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
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementsSize = canvasSize / 10;

    startGame();

}

function startGame() {

    showLives();
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];
    if(!map){
        winner();
        return;
    }

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
    lives--;
    showLives();
    

    spanLives.innerHTML = emojis['HEART']

    if (lives <= 0) {
        level = 0;
        lives = 3;
        flag = true;
        firePosition.length = 0;
        startGame;
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
    

}

function showLives() {
    spanLives.innerHTML = emojis['HEART'].repeat(lives)
  }

function deathsRender(){

    for (let k = 0; k < 3; k++) {
        game.fillText(emojis['GAME_OVER'],deaths[k].x,deaths[k].y)
    }
    
}