var database;
var dog,happyDog,foodS, foodStock;
var dogAsk;
var dose;
function preload(){

  dogAsk = loadImage("images/dogImg.png");
  happyDog = loadAnimation("images/dogImg1.png");
  
}

function setup() {
	createCanvas(1200, 600);

  database = firebase.database();

  dog = createSprite(1050,450,10,10);
  dog.addImage("DogAsking",dogAsk);
  dog.addAnimation("DogHappy", happyDog);
  dog.scale = 0.4

  foodStock = database.ref("food");
  foodStock.on("value",readStock);
}


function draw() {  

  background(46,139,87);
  console.log(foodS);
  if(keyWentDown("UP_ARROW")){

    writeStock(foodS);
    dog.changeAnimation("DogHappy", happyDog);
    

  }
  drawSprites();
  
  textSize(24);
  fill("white");
  text(" Note : Press Up Arrow to feed Cherub", 50,50);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(dose){

  if(dose <= 0){
    dose = 0
  } else{
    dose = dose - 1
  }
  database.ref("/").update({
    food : dose
  })
}



