class Game {
  constructor() {}
  getState() {
    database.ref("gameState").on("value", function (data) {
      gameState = data.val();
    });
  }
  updateState(state) {
    database.ref("/").update({
      gameState: state,
    });
  }
  start() {
    background("lightgreen");
    if (gameState === 0) {
      player = new Player();
      player.getCount();
      form = new Form();
      form.display();
    }
    ground = createSprite(windowWidth / 2, height - 20, width * 2, 20);
    //ground.addImage(gr)
    //ground.scale=10
    ob1 = createSprite(width / 4, height - 105, 60, 150);
    ob1.addImage(ob);
    ob1.debug = true;
    ob1.setCollider("rectangle", -10, 23, 100, 50);
    ob2 = createSprite((width * 3) / 4, height - 200, 200, 50);
    ob2.addImage(ob);
    ob2.debug = true;
    ob2.setCollider("rectangle", -10, 23, 100, 50);
    pl1 = createSprite(1000, 500, 50, 50);
    pl1.addImage(plb);
    pl1.scale = 0.5;
    pl1.debug = true;
    pl1.setCollider("rectangle", -150, 0, 100, 150);
    pl2 = createSprite(200, 500, 50, 50);
    pl2.addImage(plw);
    pl2.debug = true;
    pl2.setCollider("rectangle", -50, 0, 50, 100);
    pl = [pl1, pl2];

    database.ref("players/pl1").on("value", (data) => {
      ex1 = data.val().x;
    });
    database.ref("players/pl2").on("value", (data) => {
      ex2 = data.val().x;
    });
    database.ref("players/pl1").on("value", (data) => {
      ey1 = data.val().y;
    });
    database.ref("players/pl2").on("value", (data) => {
      ey2 = data.val().y;
    });
    database.ref("pl1mirror").on("value", (data) => {
      pl1mirror = data.val();
    });
    database.ref("pl2mirror").on("value", (data) => {
      pl2mirror = data.val();
    });
    database.ref("pl1collider").on("value", (data) => {
      pl1collider = data.val();
    });
    database.ref("pl2collider").on("value", (data) => {
      pl2collider = data.val();
    });
  }
  play() {
    player.getPlayerInfo();
    background(bg);
    pl1.x = ex1;
    pl2.x = ex2;
    pl1.y = ey1;
    pl2.y = ey2;
    pl1.mirrorX(pl1mirror);
    pl2.mirrorX(pl2mirror);
    pl1.setCollider("rectangle", pl1collider, 0, 100, 150);
    pl2.setCollider("rectangle", pl2collider, 0, 50, 100);
    pl1yp = pl1.y;
    pl2yp = pl2.y;
    

   
    if (allPlayers !== undefined) {
      var index = 0;
      for (var plr in allPlayers) {
        index = index + 1;
        if (plr === "pl1" && player.index === 1) {
          if (keyDown(RIGHT_ARROW)) {
            database.ref("/").update({
              pl1mirror: 1,
              pl1collider: -150,
            });

            ex1 = ex1 + 5;
            player.x = ex1;
            database.ref("players/pl1").update({
              x: ex1,
             
            });

            pl1.x = ex1;
            direc1 = 0;
           p1sidegs=0
           database.ref("/").update({
            p1sidegs: p1sidegs,
          });
          }
          if (keyDown(LEFT_ARROW)) {
            database.ref("/").update({
              pl1mirror: -1,
              pl1collider: 110,
            });
            pl1.mirrorX(pl1mirror);
            ex1 = ex1 - 5;
            player.x = ex1;

            database.ref("players/pl1").update({
              x: ex1,
            
            });
            pl1.x = ex1;
            direc1 = 1;
           p1sidegs=1
           database.ref("/").update({
            p1sidegs: p1sidegs,
          });
          }

          if (keyDown(UP_ARROW)) {
            ey1 = ey1 - 5;
            database.ref("players/pl1").update({
              y: ey1,
            
            });
          }
          if (keyDown(DOWN_ARROW)) {
            ey1 = ey1 + 5;
            database.ref("players/pl1").update({
              y: ey1,
            
            });
          }
        }
        if (plr === "pl2" && player.index === 2) {
          if (keyDown(RIGHT_ARROW)) {
            database.ref("/").update({
              pl2mirror: 1,
              pl2collider: -50,
            });

            ex2 = ex2 + 5;
            player.x = ex2;
            player.y = pl2yp;
            database.ref("players/pl2").update({
              x: ex2,
            
            });
            pl2.x = ex2;
            direc = 0;
           p2sidegs=0
           database.ref("/").update({
            p2sidegs: p2sidegs,
          });
          }
          if (keyDown(LEFT_ARROW)) {
            database.ref("/").update({
              pl2mirror: -1,
              pl2collider: 50,
            });
            pl2.mirrorX(pl2mirror);
            ex2 = ex2 - 5;
            player.x = ex2;
            player.y = pl2yp;
            console.log(ex2);
            database.ref("players/pl2").update({
              x: ex2,
              
            });
            pl2.x = ex2;
            direc = 1;
           p2sidegs=1
           database.ref("/").update({
            p2sidegs: p2sidegs,
          });
          }
          if (keyDown(UP_ARROW)) {
            ey2 = ey2 - 5;
            database.ref("players/pl2").update({
              y: ey2,
            
            });
           
          }
          if (keyDown(DOWN_ARROW)) {
            ey2 = ey2 + 5;
            database.ref("players/pl2").update({
              y: ey2,
            
            });
          }
        }

        drawSprites();
      }
    }
  }
}
