var trex, trex_running, trex_collided, ground, invisibleground, groundimage;
var PLAY=1
var END=0
var gameState=PLAY
var cloudsGroup, cloudImage, obstacleGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score=0
var gameOver,restart
localStorage["highestScore"]=0;
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png")
  trex_collided = loadImage("trex_collided.png")
  groundimage = loadImage("ground2.png")
  cloudImage = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  gameOverImg = loadImage("gameOver.png")
  restartImg = loadImage("restart.png")                        
  
  
}
function setup() { 
  createCanvas(600,400)
  trex = createSprite(50,380,20,50);
  trex.addAnimation("running",trex_running)
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  ground = createSprite(200,380,400,20)
  ground.addImage("ground",groundimage)
  ground.x=ground.width/2
  ground.velocityX=-(6+3*score/100)
  gameOver=createSprite(300,100)
  gameOver.addImage(gameOverImg)
  restart=createSprite(300,140)
  restart.addImage(restartImg)
  gameOver.scale=0.5
  restart.scale=0.5
  gameOver.visible=false
  restart.visible=false
  invisibleground = createSprite(200,385,400,5)
  invisibleground.visible = false;
  cloudsGroup = new Group()
  obstacleGroup = new Group()
  score = 0;
}
function draw() {
  background("white")
  text("score"+score,500,50)
  if(gameState===PLAY){
    score=score+1
    ground.velocityX=-(6+3*score/100)
  if(keyDown("space") && trex.y >= 200) {
    trex.velocityY = -12;
  }
  trex.velocityY = trex.velocityY + 0.8;
   if (ground.x < 0){
      ground.x = ground.width/2;
    }
  trex.collide(invisibleground)
  SpawnClouds()
  SpawnObstacle()
  if(obstacleGroup.isTouching(trex)){
   gameState=END
  }
}
  else if(gameState===END){
    gameOver.visible=true
    restart.visible=true
    ground.velocityX=0
    trex.velocityY=0
    obstacleGroup.setVelocityXEach(0)
    cloudsGroup.setVelocityXEach(0)
    trex.changeAnimation("collided",trex_collided)
    obstacleGroup.setLifetimeEach(-1)
    cloudsGroup.setLifetimeEach(-1)
    if(mousePressedOver(restart)){
      reset()
    }
  }
    drawSprites();
}                  
function SpawnClouds() {
  if(frameCount%60==0) {
    var cloud = createSprite(600,120,40,10)
    cloud.y=Math.round(random(80,120))
    cloud.addImage(cloudImage)
    cloud.scale=0.5
    cloud.velocityX=-3
    cloud.lifetime=200
    cloud.depth=trex.depth
    trex.depth=trex.depth+1
    cloudsGroup.add(cloud)
  }
}
function SpawnObstacle() {
  if(frameCount%60===0) {
    var obstacle = createSprite(600,365,10,40)
    obstacle.velocityX=-4
    var rand = Math.round(random(1,6))
    switch(rand) {
    case 1:
    obstacle.addImage(obstacle1)
    break
    case 2:
    obstacle.addImage(obstacle2)
    break;
    case 3:
    obstacle.addImage(obstacle3)
    break;
    case 4:
    obstacle.addImage(obstacle4)
    break;
    case 5:
    obstacle.addImage(obstacle5)
    break;
    case 6:
    obstacle.addImage(obstacle6)
    break;
    default:
    break;
    }
    obstacle.scale=0.5
    obstacle.lifetime=300
    obstacleGroup.add(obstacle)
  }
}
function reset() {
  gameState=PLAY
  gameOver.visible=false
  restart.visible=false
  obstacleGroup.destroyEach()
  cloudsGroup.destroyEach()
  trex.changeAnimation("running",trex_running)
if (localStorage["highestscore"]<score)
{
  localStorage["highest score"]=score
}
  score=0
}