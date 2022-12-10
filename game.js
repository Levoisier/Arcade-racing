const canvas = document.querySelector('#game');
const game =  canvas.getContext('2d');
let canvasSize;
let elementsSize;

const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

const playerPosition = {
    x: undefined,
    y: undefined,
}

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

    
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';


    const map = maps[2];
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
          }
          game.fillText(emoji, posX, posY);
        });
      });
    /* for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 10; col++) {
          game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col, elementsSize * row);
        }
      } */
    movePlayer()
    
}

function movePlayer(){
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

