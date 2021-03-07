class Form{
  constructor(){
      this.button=createButton('start');
      this.button.position(width/2,height/2);
      this.reset=createButton('reset');
      this.reset.position(width-100,40)
  }
  display(){
     this.reset.mousePressed(()=>{
         database.ref('/').update({
             gameState:0,
             playerCount:0,
             gs:1,
             gs1:1,
             p1side:3,
             p1sidegs:0,
             p2side:-3,
             p2sidegs:1,
             players:{
                 pl1:{
                     distance:500,
                     x:475,
                     y:625
                 },
                 pl2:{
                    distance:500,
                    x:1225,
                    y:505
                }
             },
             pl1mirror:1,
             pl2mirror:-1,
             pl1collider:-150,
             pl2collider:50
         })
     })
      this.button.mousePressed(()=>{
      this.button.hide();
      
      playerCount=playerCount+1;
      player.index=playerCount;
      player.update()
      player.updateCount(playerCount);
       this.greeting=createElement('h2',"wait for the other players to join") ;
        this.greeting.position(width/2,height/2);


  })
 
  }
}