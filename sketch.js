
var balloon
var balloonImage
var backgroundImg
var background
var database,position
var board,boardImg

function preload() {
  backgroundImg=loadImage("BackImg.png")
  balloonImage = loadAnimation("B1.png","B2.png","B3.png")
  boardImg=loadImage("BOARD-removebg-preview.png")
 // imgBalloon = loadImage("B1")
}
function setup() {
  createCanvas(1535, 720)
  board=createSprite(1300,598,70,100)
  board.addImage("boardIg",boardImg)
board.scale=0.3



 balloon=createSprite(100,520,100,100);
 balloon.addAnimation("back",balloonImage)
 balloon.scale=0.6
  database = firebase.database();
  
  var balloonPosition = database.ref("Balloon/Positions")

  balloonPosition.on("value", readPosition, showErr)

}

function draw() {
  background(backgroundImg);
  

  
  if (keyDown(LEFT_ARROW)) {
    balloon.x=balloon.x-5
  }

  if (keyDown(RIGHT_ARROW)) {
    balloon.x = balloon.x + 5
  }

  if (keyDown(UP_ARROW)) {
    updateHeight(0,-5)
    balloon.y = balloon.y - 5
    balloon.scale=balloon.scale-0.005
  }

  if (keyDown(DOWN_ARROW)) {
    updateHeight(0, +5)
    balloon.y = balloon.y +5
    balloon.scale = balloon.scale +0.005
  }
  drawSprites();

  textSize(18)
  fill("black")
  strokeWeight(1)
  stroke("purple")
  text("Hot Air Balloon ", 1239, 580)

  
  textSize(18)
  fill("black")
  strokeWeight(1)
  stroke("purple")
  text("Ride!", 1278, 600)

  textSize(40)
  fill(0,255,0)
  strokeWeight(5)
  stroke("yellow")
  text("Press Arrow Key To Make Balloon Fly", 100, 50)

}



function updateHeight(x, y) {
  database.ref("Balloon/Positions").set({

    x: balloon.position.x + x,
    y: balloon.position.y + y
    
  })


}

function readPosition(data) {

  position = data.val();
  balloon.x = position.x
  balloon.y = position.y


}

function showErr() {

  console.log("Error!")
}