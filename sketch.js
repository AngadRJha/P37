//Create variables here
var database;
  var dog
var foodSS
var foodObj
var lastFed
function preload()
{
  garden=loadImage("virtual pet images/Garden.png")
  dogImg= loadImage("dogImg.png")
  dogImg1= loadImage("dogImg1.png")
  sleeping=loadImage("virtual pet images/Bed Room.png")
  washRoom=loadImage("virtual pet images/Wash Room.png")
	//load images here
}

function setup() {
  createCanvas(800, 500);
  database = firebase.database();
  var dbDataRef = database.ref("Food");
  dbDataRef.on("value",readStock,showError);
  readState= database.ref("gameState")
  readState.on("value",function (data){
    gameState=data.val()
  })
  currentTime= database.ref("currenTTime")
  currentTime.on("value",function (data){
    currenTTime=data.val()
  })
  
  dog=createSprite(500,350,20,20)
  dog.addImage("ghost",dogImg)
  dog.addImage("Garden",garden)
  dog.addImage("BedRoom",sleeping)
  dog.addImage("washroom",washRoom)
  dog.scale=0.4
  

  feed=createButton("feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood=createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
  
  foodObj = new Food()
}


function draw() {  
  background(46, 139, 87)
  
  drawSprites();
  
  //add styles here
  currentTime=hour()
  database.ref('/').update({
    currenTTime:currentTime
  })
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodSS)

  }
  fill("black")
  textSize(30)
  text("Food: "+foodSS,50,50)
  if(foodSS<=0){
       
    dog.changeImage("host",dogImg1);
  }
  if(foodSS==0){
       dog.changeImage("ghost",dogImg);
}
  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
    lastFed = data.val()
  })
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: "+lastFed%12+" PM",350,30)
  }
  else if(lastFed==0){
    text("lastFeed: 12 AM",350,30)
  }
  else {
    text("Last feed: "+ lastFed+"AM",350,30)
  }
  foodObj.display()
  text("X: "+mouseX+" Y: "+mouseY,mouseX,mouseY)
  if(currentTime>=12){
  text("Current Time is "+currentTime%12+" PM",50,100)
  }
  else if(currentTime==0){
    text("Current Time is 12 AM",50,100)
  }
  else{
    text("Current Time is "+currentTime+"AM",50,100)
  }
  
  if(currentTime==(lastFed+1)){
    foodObj.garden()
    foodObj.hideInputDetails()
    }
    else if(currentTime==(lastFed+2)){
      foodObj.bedRoom()
      foodObj.hideInputDetails()
    }
    else if(currentTime==(lastFed+3)){
      foodObj.washRoom()
      foodObj.hideInputDetails()
    }
    else if(currentTime<=(lastFed+4)){
      foodObj.showInputDetails()
      dog.changeImage("ghost",dogImg)
    }
    
}
function readStock(data){
  foodSS = data.val();
}
function writeStock(x){
  
      
      if(x<=0){
        x=0
        
      }
      else{
        x=x-1
      }
  database.ref("/").update({
    Food:x
  })
}



function showError(){
  console.log("no data")
}
function feedDog(){
  //first check if there is food in stock/database
  console.log(foodObj.foodStock)
  dog.addImage("h",dogImg1)
    dog.changeImage("h",dogImg1)
  //if food is available(>0), only then we feed the dog
  if(foodObj.foodStock>0){
    //happy dog
    
    //deduct the food
    foodObj.foodStock = foodObj.foodStock - 1;
    //capture the feed time
    foodObj.lastFed = hour();
    //update the foodStock and feedtime
    foodObj.updateFoodStock()
  }
}
function addFoods(){
  
  foodSS=foodSS+1
  database.ref('/').update({
    Food:foodSS
    
  })
}

