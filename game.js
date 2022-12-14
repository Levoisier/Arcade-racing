const canvas = document.querySelector('#game');
const gameOverScreen= document.getElementById('gameover-screen');
const game =  canvas.getContext('2d');
let canvasSize;
let elementsSize;

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
let spanLives = document.querySelector('#lives');
let spanTime = document.querySelector('#time');
let spanRecord = document.querySelector('#record');
let pResult = document.querySelector('#result');



let flag = true;
let level = 0;
let lives = 3; 

let timeStart;
let playerTime;
let timeInterval;





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

        if(!timeStart){
            timeStart = Date.now();
            timeInterval = setInterval(showTime, 100);
            showRecord();
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

    document.getElementById('record-win').innerHTML = formatTime(Date.now()-timeStart);
    document.getElementById('winner-screen').style.display = 'inline';
    clearInterval(timeInterval);

    const playerTime = Date.now()-timeStart;
    const recordTime = localStorage.getItem('record_time')

    if(recordTime){
        const playerTime = Date.now()-timeStart;
        if(recordTime >= playerTime){
            localStorage.setItem('record_time', playerTime);
            console.log('record superado')
        }else{
            console.log('no superaste el record')
        }
    }else{
        localStorage.setItem('record_time', playerTime)
    }
    console.log(recordTime,playerTime);

    document.getElementById('record-final-win').innerHTML = formatTime(localStorage.getItem('record_time'));
    

}

function levelFail(){

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    lives--;
    showLives();
    startGame();
}

function showLives() {
    spanLives.innerHTML = emojis['HEART'].repeat(lives);
  }

function showTime(){
    spanTime.innerHTML = formatTime(Date.now()-timeStart);
}

function gameOver(){

    document.getElementById('record-lose').innerHTML = formatTime(Date.now()-timeStart);
    document.getElementById('record-final').innerHTML = formatTime(localStorage.getItem('record_time'));
    document.getElementById('gameover-screen').style.display = 'inline';
    clearInterval(timeInterval);

}

function gameReload(){
    level = 0;
    lives = 3;
    timeStart = undefined;
    flag = true;
    firePosition.length = 0;
    document.getElementById('gameover-screen').style.display = 'none';
    document.getElementById('winner-screen').style.display = 'none';
    startGame()
    
}

function formatTime(ms){
    const cs = parseInt(ms/10) % 100
    const seg = parseInt(ms/1000) % 60
    const min = parseInt(ms/60000) % 60
    const csStr = `${cs}`.padStart(2,"0")
    const segStr = `${seg}`.padStart(2,"0")
    const minStr = `${min}`.padStart(2,"0")
    return`${minStr}:${segStr}:${csStr}`
}

function showRecord(){
    spanRecord.innerHTML = formatTime(localStorage.getItem('record_time'));
}