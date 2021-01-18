var database;
var happyDog, dog, foodCount = 10;
var button, frameCount = 0;

function preload()
{
	happyDog = loadImage("images/dogImg1.png");
  dog = loadImage("images/dogImg.png");
}

function setup()
{
	createCanvas(800, 700);
  button = createButton('feed');
  button.position(400,450);

  database = firebase.database();

  database.ref('frameCount').on("value",function(data){
    frameCount = data.val();
  })
  
  database.ref('food').on("value",function(data){
    foodCount = data.val();
  })
}


function draw() 
{  
  drawSprites();
  //add styles here

  background("white");

  frameCount++;
  updateFrameCount(frameCount);

  if(frameCount%100 == 0 && foodCount!=0)
  {
    foodCount--;
    console.log(foodCount);
    updateFood(foodCount);
  }

  if(foodCount == 0)
  {
    textSize(20);
    fill("black")
    text("feed me!",400,600);
  }

  imageMode(CENTER);
  if(foodCount<= 5)
  {
    image(dog,400,350,200,400);
  }
  else if(foodCount>5)
  {
    image(happyDog,400,350,200,400);
  }

  button.mousePressed(function(){
    foodCount++;
    updateFood(foodCount);
  })

  textSize(20);
  fill("black")
  text("food: "+foodCount,400,200);

}

function updateFood(count)
{
  database.ref('/').update({
    'food': count
  })
}

function updateFrameCount(count)
{
  database.ref('/').update({
    'frameCount': count
  })
}