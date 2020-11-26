var tower , towerImage
var door , doorImage , doorGroup
var climber , climberImage , climberGroup
var ghost , ghostImage 
var invisible , invisibleGroup
var gameState="play";
var spookySound



function preload(){
  
  towerImage=loadImage("tower.png")
  doorImage=loadImage("door.png")
  climberImage=loadImage("climber.png")
  ghostImage=loadImage("ghost-standing.png")
  spookySound=loadSound("spooky.wav")
  
  
  
}

function setup(){
 createCanvas(600, 600) 
  
  tower = createSprite(300, 300);
  tower.addImage(towerImage);
  tower.velocityY=5;
  
  ghost = createSprite(250, 300);
  ghost.addImage(ghostImage);
  ghost.scale=0.5
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleGroup = new Group();
}

function draw(){
  background("black")
  
  spookySound.play();
  
  if(gameState==="play"){
    
  
  
  if(tower.y>500){
    tower.y=300
  }
  
  
  if(keyDown("right")){
    ghost.x=ghost.x+3
  }
  
  if(keyDown("left")){
    ghost.x=ghost.x-3
  }
  
  if(keyDown("space")){
    ghost.velocityY=-7;
    
  }
  ghost.velocityY=ghost.velocityY+1;
  
  createdoors()
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleGroup.collide(ghost)||ghost.y>600){
    gameState="end"
    ghost.destroy();
  }
    drawSprites();
 }
  
  if(gameState==="end"){  
    fill("red")
    textSize(30);
    text("GAME OVER", 250, 250);   
  }
  
}

function createdoors(){
  
  if(frameCount%200===0){
    door = createSprite(300, 0);
    door.addImage(doorImage);
    door.velocityY=2;
    door.x=Math.round(random(100, 500));
    door.lifetime=300;
    doorGroup.add(door);
    ghost.depth=door.depth+1
    
    climber = createSprite(300, 50);
    climber.addImage(climberImage);
    climber.velocityY=2;
    climber.x=door.x;
    climber.lifetime=300;
    climberGroup.add(climber);
    
    invisible = createSprite(300, 60, climber.width, 2)
    invisible.x=door.x;
    invisible.velocityY=2;
    invisible.lifetime=300;
    invisibleGroup.add(invisible);
    invisible.visible=true
    invisible.debug=true
  }
  
}
