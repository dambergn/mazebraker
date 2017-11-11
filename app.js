'use strict';

var ctx = document.getElementById('ctx').getContext('2d');
ctx.font = '30px Arial';

var HEIGHT = 700;
var WIDTH = 700;
var block = [];

var playerTop = {
  x:350,
  y:5,
  spdX:30,
  spdY:10,
  width:60,
  height:10,
  color:'green',
};

var playerBottom = {
  x:350,
  y:695,
  spdX:30,
  spdY:10,
  width:60,
  height:10,
  color:'green',
};

var playerLeft = {
  x:5,
  y:350,
  spdX:30,
  spdY:10,
  width:10,
  height:60,
  color:'green',
};

var playerRight = {
  x:695,
  y:350,
  spdX:30,
  spdY:10,
  width:10,
  height:60,
  color:'green',
};

var ball = {
  x:100,
  y:200,
  spdX:4,
  spdY:-4,
  ballSize:10,
  color:'#3498db',
};

var updateEntity = function (something){
  updateEntityPosition(something);
  drawEntity(something);
};

var updateEntityPosition = function(something){
  something.x += something.spdX;
  something.y += something.spdY;
  if(something.x < 0 || something.x > WIDTH){
    something.spdX = -something.spdX;
  }
  if(something.y < 0 || something.y > HEIGHT){
    something.spdY = -something.spdY;
  }
};

var drawEntity = function(something){
  ctx.save();
  ctx.fillStyle = something.color;
  ctx.fillRect(something.x - something.width / 2,something.y - something.height / 2,something.width,something.height);
  ctx.restore();
};

var drawBall = function() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.ballSize, 0, Math.PI * 2);
  ctx.fillStyle = '#3498db';
  ctx.fill();
  ctx.closePath();
};
//Create Blocks
var Blocks = function(blockX, blockY){
  this.blockX = blockX;
  this.blockY = blockY;
};

var generateBlocks = function(){
  for (var b = 0; b < 10; b++){
    var blockX = Math.floor((Math.random() * 250) + 225);
    var blockY = Math.floor((Math.random() * 250) + 225);
    block [b] = new Blocks(blockX, blockY);
  }
};
generateBlocks();

var drawBlocks = function(){
  for (var b = 0; b < 10; b++){
    ctx.fillStyle = 'white';
    ctx.fillRect(block[b].blockX, block[b].blockY, 10, 10);
    //console.log('New Blocks at ', block[b].blockX, block[b].blockY);
  }
};

//left arrow	37.
//up arrow	38
//right arrow	39
//down arrow	40

document.onkeydown = function(event){
  if(event.keyCode === 68 || event.keyCode === 39){ //d or Right arrow
    playerBottom.pressingRight = true;
    playerTop.pressingRight = true;
  }else if(event.keyCode === 83 || event.keyCode === 40){ //s or Down arrow
    playerLeft.pressingDown = true;
    playerRight.pressingDown = true;
  }else if(event.keyCode === 65 || event.keyCode === 37){ //a or Left arrow
    playerBottom.pressingLeft = true;
    playerTop.pressingLeft = true;
  }else if(event.keyCode === 87 || event.keyCode === 38){ // w or Up Arrow
    playerLeft.pressingUp = true;
    playerRight.pressingUp = true;
  }
};

document.onkeyup = function(event){
  if(event.keyCode === 68 || event.keyCode === 39){ //d or Right arrow
    playerBottom.pressingRight = false;
    playerTop.pressingRight = false;
  }else if(event.keyCode === 83 || event.keyCode === 40){ //s or Down arrow
    playerLeft.pressingDown = false;
    playerRight.pressingDown = false;
  }else if(event.keyCode === 65 || event.keyCode === 37){ //a or Left arrow
    playerBottom.pressingLeft = false;
    playerTop.pressingLeft = false;
  }else if(event.keyCode === 87 || event.keyCode === 38){ // w or Up Arrow
    playerLeft.pressingUp = false;
    playerRight.pressingUp = false;
  }
};

var updatePlayerBottomPosition = function(){
  if(playerBottom.pressingRight)
    playerBottom.x += 10;
  if(playerBottom.pressingLeft)
    playerBottom.x -= 10;
  //ispositionvalid
  if(playerBottom.x < playerBottom.width / 2)
    playerBottom.x = playerBottom.width / 2;
  if(playerBottom.x > WIDTH - playerBottom.width / 2)
    playerBottom.x = WIDTH - playerBottom.width / 2;
};

var updatePlayerTopPosition = function(){
  if(playerTop.pressingRight)
    playerTop.x += 10;
  if(playerTop.pressingLeft)
    playerTop.x -= 10;
  //ispositionvalid
  if(playerTop.x < playerTop.width / 2)
    playerTop.x = playerTop.width / 2;
  if(playerTop.x > WIDTH - playerTop.width / 2)
    playerTop.x = WIDTH - playerTop.width / 2;
};

var updatePlayerLeftPosition = function(){
  if(playerLeft.pressingDown)
    playerLeft.y += 10;
  if(playerLeft.pressingUp)
    playerLeft.y -= 10;
  //ispositionvalid
  if(playerLeft.y < playerLeft.height / 2)
    playerLeft.y = playerLeft.height / 2;
  if(playerLeft.y > HEIGHT - playerLeft.height / 2)
    playerLeft.y = HEIGHT - playerLeft.height / 2;
};

var updatePlayerRightPosition = function(){
  if(playerRight.pressingDown)
    playerRight.y += 10;
  if(playerRight.pressingUp)
    playerRight.y -= 10;
  //ispositionvalid
  if(playerRight.y < playerRight.height / 2)
    playerRight.y = playerRight.height / 2;
  if(playerRight.y > HEIGHT - playerRight.height / 2)
    playerRight.y = HEIGHT - playerRight.height / 2;
};

var updateBallPosition = function(){
  if(ball.x + ball.spdX > WIDTH - ball.ballSize || ball.x + ball.spdX < ball.ballSize) {
    ball.spdX = -ball.spdX;
  }
  if(ball.y + ball.spdY > HEIGHT - ball.ballSize || ball.y + ball.spdY < ball.ballSize) {
    ball.spdY = -ball.spdY;
  }
  ball.x += ball.spdX;
  ball.y += ball.spdY;
};

var update = function(){
  ctx.clearRect(0,0,WIDTH,HEIGHT);
  updatePlayerTopPosition();
  drawEntity(playerTop);
  updatePlayerBottomPosition();
  drawEntity(playerBottom);
  updatePlayerLeftPosition();
  drawEntity(playerLeft);
  updatePlayerRightPosition();
  drawEntity(playerRight);
  updateBallPosition();
  drawBall();
  drawBlocks();
};

setInterval(update,40);
