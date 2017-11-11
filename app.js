'use strict';

var ctx = document.getElementById('ctx').getContext('2d');
ctx.font = '30px Arial';

var HEIGHT = 700;
var WIDTH = 700;
var NUMBLOCKS = 100;
var block = [];
var points = 0;
var lives = 3;
//var userName = prompt( 'Hey! What\'s your name');
//var userData = JSON.stringify(userName);

// Constructor for paddles
function Paddle(x, y, spdX, spdY, width, height, color) {
  this.x = x;
  this.y = y;
  this.spdX = spdX;
  this.sdpY = spdY;
  this.width = width;
  this.height = height;
  this.color = color;
}

function Ball(id, x, y, spdX, spdY) {
  this.x = x;
  this.y = y;
  this.spdX = spdX;
  this.spdY = spdY;
  this.ballSize = 10;
  this.color = '#3498db';
};

var ball = new Ball(1, 100, 200, 4, -4);

var playerTop = new Paddle(350, 5, 30, 10, 60, 10, '#2ecc71');
var playerBottom = new Paddle(350, 695, 30, 10, 60, 10, '#2ecc71');
var playerLeft = new Paddle(5, 350, 30, 10, 10, 60, '#2ecc71');
var playerRight = new Paddle(695, 350, 30, 10, 10, 60, '#2ecc71');

var updateEntity = function(something) {
  updateEntityPosition(something);
  drawEntity(something);
};

var updateEntityPosition = function(something) {
  something.x += something.spdX;
  something.y += something.spdY;
  if (something.x < 0 || something.x > WIDTH) {
    something.spdX = -something.spdX;
  }
  if (something.y < 0 || something.y > HEIGHT) {
    something.spdY = -something.spdY;
  }
};

var drawEntity = function(something) {
  ctx.save();
  ctx.fillStyle = something.color;
  ctx.fillRect(something.x - something.width / 2, something.y - something.height / 2, something.width, something.height);
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
var Blocks = function(x, y) {
  this.x = x;
  this.y = y;
};

var generateBlocks = function() {
  //  for (var b = 0; b < NUMBLOCKS; b++){
  // var x = Math.floor((Math.random() * 500) + 100);
  // var y = Math.floor((Math.random() * 500) + 100);
  // // check to see if candidate new block is close to existing Blocks
  // // for loop through all existing blocks.  Loop should not run the first time, when block[] is empty
  // // b will advance even if a block is too close, leaving less than NUMBLOCKS blocks
  // if (block.length > 0){
  //   for (var prob = 0; prob < block.length; prob++){
  //     console.log('Inside of for prob: prob, block.length, x = ',prob, block.length, x);
  //     if (Math.abs(x - block[prob].x) > 100 && Math.abs(y - block[prob].y) > 100){
  //       block [b] = new Blocks(x, y);
  //     }
  //     else {
  //       block [b] = new Blocks(x, y);
  //       console.log('blocks were too close');
  //     } // end if
  //   } // next prob
  // } // end if block.length
  // else { // create first block to get the ball rolling
  //
  //   //console.log('created first block');
  // }
  //} // next b
  var count = 0;
  for (var i = 100; i < 600; i = i + 30) {
    for (var j = 100; j < 600; j = j + 30) {
      if ((Math.floor(Math.random() * 10) < 5)) {
        console.log('New block at ', i, j);
        block[count] = new Blocks(i, j);
        count++;
      } // end if
    } // next j
  } // next i
};
generateBlocks();

var drawBlocks = function() {
  for (var b = 0; b < block.length; b++) {
    ctx.fillStyle = 'white';
    ctx.fillRect(block[b].x, block[b].y, 20, 20);
  }
};

// Provisional ball/brick colision detection:
var getDistanceBetweenEntity = function(entity1, entity2) { //return distance (number)
  var vx = entity1.x - entity2.x;
  var vy = entity1.y - entity2.y;
  return Math.sqrt(vx * vx + vy * vy);
};

var testCollisionEntity = function(entity1, entity2) { //return if colliding (true/false)
  var distance = getDistanceBetweenEntity(entity1, entity2);
  return distance < 15;
};

var updateCollisionBlock = function() {
  for (var key = 0; key < block.length; key++) {
    var isColliding = testCollisionEntity(ball, block[key]);
    //console.log('key, isColliding =', key, isColliding);
    if (isColliding) {
      // Ccode for redirecting ball direction
      // Ball needs to bounce in a logical way off blocks.  If ball is approaching from side, reverse ball.spdX. If ball is approaching from top or bottom, reverse ball.spdY
      // If the difference between the two entitys' xs is lower than the two entitys' ys, then the ball and the brick are on or close to the same x plane, and must be bounced horizontally, aka reverse ball.spdX
      var xDiff = Math.abs(ball.x - block[key].x);
      var yDiff = Math.abs(ball.y - block[key].y);
      if (xDiff < yDiff) { // reverse ball's horizontal direction
        ball.spdX = -ball.spdX;
      } else { // reverse vertically
        ball.spdY = -ball.spdY;
      }

      // In our code, remove block[key]
      // To do this, block[key] = block[key+1], block[key+1] = block[key+2], etc. then  block.pop()
      for (var r = key; r < block.length; r++) {
        block[r] = block[r + 1];
      }
      block.pop();
      //console.log('after block.pop(): key, block.length, ',key, block.length);
      points++;
      console.log(points);
    }
  }
};

document.onkeydown = function(event) {
  if (event.keyCode === 68 || event.keyCode === 39) { //d or Right arrow
    playerBottom.pressingRight = true;
    playerTop.pressingRight = true;
  } else if (event.keyCode === 83 || event.keyCode === 40) { //s or Down arrow
    playerLeft.pressingDown = true;
    playerRight.pressingDown = true;
  } else if (event.keyCode === 65 || event.keyCode === 37) { //a or Left arrow
    playerBottom.pressingLeft = true;
    playerTop.pressingLeft = true;
  } else if (event.keyCode === 87 || event.keyCode === 38) { // w or Up Arrow
    playerLeft.pressingUp = true;
    playerRight.pressingUp = true;
  }
};

document.onkeyup = function(event) {
  if (event.keyCode === 68 || event.keyCode === 39) { //d or Right arrow
    playerBottom.pressingRight = false;
    playerTop.pressingRight = false;
  } else if (event.keyCode === 83 || event.keyCode === 40) { //s or Down arrow
    playerLeft.pressingDown = false;
    playerRight.pressingDown = false;
  } else if (event.keyCode === 65 || event.keyCode === 37) { //a or Left arrow
    playerBottom.pressingLeft = false;
    playerTop.pressingLeft = false;
  } else if (event.keyCode === 87 || event.keyCode === 38) { // w or Up Arrow
    playerLeft.pressingUp = false;
    playerRight.pressingUp = false;
  }
};

var updatePlayerBottomPosition = function() {
  if (playerBottom.pressingRight)
    playerBottom.x += 10;
  if (playerBottom.pressingLeft)
    playerBottom.x -= 10;
  //ispositionvalid
  if (playerBottom.x < playerBottom.width / 2)
    playerBottom.x = playerBottom.width / 2;
  if (playerBottom.x > WIDTH - playerBottom.width / 2)
    playerBottom.x = WIDTH - playerBottom.width / 2;
};

var updatePlayerTopPosition = function() {
  if (playerTop.pressingRight)
    playerTop.x += 10;
  if (playerTop.pressingLeft)
    playerTop.x -= 10;
  //ispositionvalid
  if (playerTop.x < playerTop.width / 2)
    playerTop.x = playerTop.width / 2;
  if (playerTop.x > WIDTH - playerTop.width / 2)
    playerTop.x = WIDTH - playerTop.width / 2;
};

var updatePlayerLeftPosition = function() {
  if (playerLeft.pressingDown)
    playerLeft.y += 10;
  if (playerLeft.pressingUp)
    playerLeft.y -= 10;
  //ispositionvalid
  if (playerLeft.y < playerLeft.height / 2)
    playerLeft.y = playerLeft.height / 2;
  if (playerLeft.y > HEIGHT - playerLeft.height / 2)
    playerLeft.y = HEIGHT - playerLeft.height / 2;
};

var updatePlayerRightPosition = function() {
  if (playerRight.pressingDown)
    playerRight.y += 10;
  if (playerRight.pressingUp)
    playerRight.y -= 10;
  //ispositionvalid
  if (playerRight.y < playerRight.height / 2)
    playerRight.y = playerRight.height / 2;
  if (playerRight.y > HEIGHT - playerRight.height / 2)
    playerRight.y = HEIGHT - playerRight.height / 2;
};

var updateBallPosition = function() {
  if (ball.x < ball.ballSize) {
    //if(ball.y > playerLeft.x && ball.y < playerLeft.y + playerLeft.height) {
    if (ball.y > playerLeft.y - (playerLeft.height / 2) && ball.y < playerLeft.y + (playerLeft.height / 2) && ball.x > playerLeft.x - playerLeft.width) {
      ball.spdX = -ball.spdX;
      console.log('bounce!');
    } else {
      lives--;
      ball.x = WIDTH / 2;
      ball.y = HEIGHT - 30;
      ball.spdX = 4;
      ball.spdY = -4;
      if (!lives) {
        alert("GAME OVER");
        document.location.reload();
      }
    }
  }
  if (ball.x > WIDTH - ball.ballSize) {
    if (ball.y > playerRight.y - (playerRight.height / 2) && ball.y < playerRight.y + (playerRight.height / 2) && ball.x < playerRight.x + playerRight.width) {
      ball.spdX = -ball.spdX;
      console.log('bounce!');
    } else {
      lives--;
      ball.x = WIDTH / 2;
      ball.y = HEIGHT - 30;
      ball.spdX = 4;
      ball.spdY = -4;
      if (!lives) {
        alert('GAME OVER');
        document.location.reload();
      }
    }
  }
  if (ball.y < ball.ballSize) {
    if (ball.x > playerTop.x - (playerTop.width / 2) && ball.x < playerTop.x + (playerTop.width / 2) && ball.y < playerTop.y + playerTop.height) {
      ball.spdY = -ball.spdY;
      console.log('bounce!');
    } else {
      lives--;
      ball.x = WIDTH / 2;
      ball.y = HEIGHT - 30;
      ball.spdX = 4;
      ball.spdY = -4;
      if (!lives) {
        alert('GAME OVER');
        document.location.reload();
      }
    }
  }
  if (ball.y > HEIGHT - ball.ballSize) {
    if (ball.x > playerBottom.x - (playerBottom.width / 2) && ball.x < playerBottom.x + (playerBottom.width / 2) && ball.y > playerBottom.y - playerBottom.height) {
      ball.spdY = -ball.spdY;
      console.log('bounce!');
    } else {
      lives--;
      ball.x = WIDTH / 2;
      ball.y = HEIGHT - 30;
      ball.spdX = 4;
      ball.spdY = -4;
      if (!lives) {
        alert('GAME OVER');
        document.location.reload();
      }
    }
  }
  ball.x += ball.spdX;
  ball.y += ball.spdY;
};
function drawLives() {
  ctx.fillText(lives + ' lives', 600, 30);
}

var update = function() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.fillText(points + ' Points', 0, 30);
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
  drawLives();
  drawBlocks();
  updateCollisionBlock();
};

//window.localStorage.clear();
//window.localStorage.setItem('User data', userData);
setInterval(update, 40);
