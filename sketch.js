var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.5;

  invisibleBlockGroup = new Group();

  ghost.debug = true;

  ghost.setCollider("rectangle", -30, 10, 150, 300);

  spookySound.loop();


}

function draw() {
  background(200);
  

  if(gameState == "play"){
  if(tower.y > 400){
      tower.y = 300
    }


    if(keyDown("space")){
      ghost.velocityY = -5;
    }

    if(keyDown("LEFT_ARROW")){
      ghost.x += -3;
    }

    if(keyDown("RIGHT_ARROW")){
      ghost.x += 3;
    }

    ghost.velocityY += 0.8;

    spawnDoors();

 if(climbersGroup.isTouching(ghost)){
  ghost.velocityY = 0;
 }

 if(invisibleBlockGroup.isTouching(ghost)||ghost.y > 600){
  ghost.destroy();
  gameState = "end";

 }
    
    drawSprites();
}

if(gameState == "end"){
text("Game Over", 230, 250);

}
}

function spawnDoors(){

  if(frameCount%240 == 0){
    var door = createSprite(200, -50);
    door.addImage(doorImg);
    door.x = Math.round(random(120, 400));
    door.velocityY = 1;
    door.lifetime = 800;
    doorsGroup.add(door);

    var climber = createSprite(200, 10);
    climber.addImage(climberImg);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 800;
    climbersGroup.add(climber);

    ghost.depth = door.depth;
    ghost.depth += 1;


    var invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.debug = true;
    invisibleBlockGroup.add(invisibleBlock);

  }

}