class Player{
    constructor(){
        this.rank=null
this.index=null
this.x=1000
this.y=500
this.distance=500
    }
    getRank(){
        database.ref("rank").on("value",(data)=>{
            this.rank=data.val()
        })
    }
    updateRank(rank){
    database.ref('/').update({
    rank:rank
})
    }
    getCount(){
        database.ref('playerCount').on("value",function(data){
            playerCount=data.val()
        })
    }
    updateCount(count){
        database.ref('/').update({
            playerCount:count
        })
    }
 update(){
     var playerIndex="players/pl"+this.index
     this.x=this.index*500;
     console.log(playerIndex)
     database.ref(playerIndex).update({
         x:this.x,
         y:this.y,
         
     })
 }
 getPlayerInfo(){
     database.ref("players").on("value",(data)=>{
        allPlayers=data.val()
     })
 }
}