var gameState = 0,
  playerCount = 0;
var game, player, form;
var database, ob1, ob2, pl1, pl2, ground;
var allPlayers;
var pl;
var bullet;
var ex,
  ex1 = 1000,
  ex2 = 200;
var direc = 0;
var direc1 = 0;
var ey1 = 600;
var ey2 = 600;
var pl1mirror = 1;
var pl2mirror = -1;
var pl1yp = 500;
var pl2yp = 500;
var gs = 1;
var gs1=1;
var pl1collider = 0,pl2collider = 0;
var bulletGroup;
var bullet1x = 0;
var bullet2x = 0;
var p1side=3,p1sidegs=0;
var p2side=-3,p2sidegs=1;

function preload() {
  bg = loadImage("images/bg2.jpg");
  gr = loadImage("images/g1.png");
  ob = loadImage("images/o1.png");
  plb = loadImage("images/s1.png");
  plw = loadImage("images/s2.png");
  //bul=loadImage("images/bullet.png")
  gameOverImage = loadImage("images/gameOver.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  bullets = createSprite(100, 100, 10, 10);
  bullets1 = createSprite(100, 100, 10, 10);
  bulletGroup = createGroup();
  bulletGroup.add(bullets);
  bulletGroup.add(bullets1)
  database.ref("bullet1").on("value", (data) => {
    bullet1x = data.val().x;
  });
  database.ref("bullet2").on("value", (data) => {
    bullet2x = data.val().x;
  });
  database.ref("gs").on("value", (data) => {
    gs = data.val();
  });
  database.ref("gs1").on("value", (data) => {
    gs1 = data.val();
  });
  database.ref("p1side").on("value", (data) => {
    p1side = data.val();
  });
  database.ref("p2side").on("value", (data) => {
    p2side = data.val();
  });
  database.ref("p1sidegs").on("value", (data) => {
    p1sidegs = data.val();
  });
  database.ref("p2sidegs").on("value", (data) => {
    p2sidegs = data.val();
  });
  // database.ref("bullet2").on("value", (data) => {
  //   bullet2 = data.val().x;
  //   bullet2 = data.val().y;
  // });

  game = new Game();
  game.getState();
  game.start();

 
}

function draw() {
  //background("black")
  pl1.collide(ground);
  pl1.collide(ob1);
  pl1.collide(ob2);

  pl2.collide(ground);
  pl2.collide(ob1);
  pl2.collide(ob2);
  
  if (bulletGroup.isTouching(pl1) || bulletGroup.isTouching(pl2)) {
    var gameOver = createSprite(width / 2, height / 2, 10, 10);
    gameOver.addImage(gameOverImage);
    gameOver.scale = 0.5;
    bulletGroup.setVelocityXEach(0);
  }

  if (keyDown("space") && player.index == 1 && gs == 1) {
    database.ref("/").update({
      gs: 2,
    });
  }
  if (keyDown("space") && player.index == 2 && gs1 == 1) {
    database.ref("/").update({
      gs1: 2,
    });
  }
  database.ref("bullet1").update({
    x: bullets.x,
  });
  database.ref("bullet2").update({
    x: bullets1.x,
  });
  if (bullet1x > 1135||bullet1x<0) {
    gs = 1;
    database.ref("/").update({
      gs: 1,
    });
  }
  if (bullet2x < 0||bullet2x>1135) {
    gs1 = 1;
    database.ref("/").update({
      gs1: 1,
    });
  }
  if (gs == 1) {
    bullets.y = ey1;
    bullets.x = ex1;
  }
  if (gs == 2) {
    bullets.x = bullets.x +p1side;
  }
  if (gs1 == 1) {
    bullets1.y = ey2;
    bullets1.x = ex2;
  }
  if (gs1 == 2) {
    bullets1.x = bullets1.x+p2side;
  }
  if (playerCount == 2) {
    gameState = 1;
  }
  if (gameState == 1) {
    game.play();
  }
  if(p1sidegs==0&&gs==1){
    p1side=3
    database.ref("/").update({
      p1side: p1side,
    });
  }
  if(p1sidegs==1&&gs==1){
    p1side=-3
    database.ref("/").update({
      p1side: p1side,
    });
  }
  if(p2sidegs==0&&gs1==1){
    p2side=3
    database.ref("/").update({
      p2side: p2side,
    });
  }
  if(p2sidegs==1&&gs1==1){
    p2side=-3
    database.ref("/").update({
      p2side: p2side,
    });
  }
}
