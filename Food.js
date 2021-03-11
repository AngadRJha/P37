class Food{
    constructor(){
        
        this.image=loadImage("Milk.png")
        this.foodStock=null
        this.lastFed=null;
    }
    washRoom(){
        dog.changeImage("washroom",washRoom)
    }
    bedRoom(){
        dog.changeImage("BedRoom",sleeping)
    }    
    garden(){
        dog.changeImage("Garden",garden)
    }
    hideInputDetails(){
        feed.hide()
        addFood.hide()
    }
    showInputDetails(){
        feed.show()
        addFood.show()
    }
    getFoodStock(){
        var foodStockRef= database.ref("Food")
        foodStockRef.on("value",(data)=>{
            this.foodStock=data.val();
        })
    }
    updateFoodStock(){
        database.ref("/").update({
            Food:this.foodStock,
            FeedTime:this.lastFed
        })
    }
    display(){
        var foodStockRef=database.ref("Food")
        foodStockRef.on("value",(data)=>{
            this.foodStock=data.val()
        })
        var x =80,y=100;
        imageMode(CENTER);
        
        if(this.foodStock!==0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=80;
                    y=y+50
                }
                image(this.image,x,y,50,50);
                x=x+30
            }
        }
        
    }
}
