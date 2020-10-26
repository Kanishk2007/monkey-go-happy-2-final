//Global Variables
var player,player_running;
var banana,bananaImage;
var stone,obstacle_Img;
var jungle;
var invisibleGround;
var ground,groundImage
var gameOver,restart
var PLAY=1;
var END=0;
var gameState=PLAY;
var score;
var count=0;

function preload(){

backImage=loadImage("jungle2.jpg");
  
player_running=loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");


bananaImage= loadImage("banana.png");
obstacle_Img=loadImage("stone.png");

gameOverImg=loadImage("gameOver.png");
restartImg=loadImage("restart.png");
}
 
function setup() {
  createCanvas(580,400);
  score=0;  
 
 scene = createSprite(0,0,400,400);
scene.addImage(backImage);
//making background infinite.
scene.scale=1.1;
scene.velocityX=-4;
scene.x=scene.width/2;
   
 invisibleGround = createSprite(150,300,600,10);
 invisibleGround.visible = false;
 
  player=createSprite(150,300,20,50);
player.addAnimation("running",player_running);
player.scale=0.1; 
   
  bananaGroup = new Group();
  obstaclesGroup = new Group();
  
  gameOver=createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5
  gameOver.visible=false;
  
  restart=createSprite(300,140);
  restart.addImage(restartImg);
  restart.scale=0.5;
  restart.visible=false;

}

function draw(){
 background(255);
   
  stroke("white");
  textSize(20);
  fill("white");
 text("Score:"+ score, 150,300);
    
if(gameState===PLAY){
 if(scene.x<0){
    scene.x = scene.width/2;
  }

//making monkey jump
  if(keyDown("space") && player.y >=233.7){
  player.velocityY = -13;
  }
    //add gravity
    player.velocityY = player.velocityY + 0.8;
    scene.velocityX=-4;
  createFood();
  createObstacles();
  
  if(player.isTouching(bananaGroup)){
  score=score+2;
  bananaGroup.destroyEach();
  }
 
  switch(score){
    case 10: player.scale=0.12;
         break;
   case 20: player.scale=0.14;
        break;
   case 30: player.scale=0.16;
         break;
   case 40: player.scale=0.18;
         break;
  default:break;
  }
  
  if(obstaclesGroup.isTouching(player)){     
  
  if(count===1){
  gameState=END;
  }
  player.scale=0.1;
  count=1;
  
  }
  
  bananaGroup.lifetime=130;
  obstaclesGroup.lifetime=130;
 
  console.log(frameCount); 
  
  

if(gameState===END){
                               
  gameOver.visible=true;
  restart.visible=true;
  
  if(mousePressedOver(restart)) {
    reset(); 
  }
  scene.velocityX=0;
  
  player.velocityX=0;
  
   obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
}
 player.collide(invisibleGround);      
}  
  if(gameState===END){
                               
  gameOver.visible=true;
  restart.visible=true;
  
  if(mousePressedOver(restart)) {
    reset(); 
  }
  scene.velocityX=0;
  
  player.velocityX=0;
  
   obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
}
 
    player.collide(invisibleGround); 
 drawSprites(); 
   stroke("white");
  textSize(20);
  fill("white");
 text("Score:"+ score, 500,40);
} 

function createFood(){  
  if(frameCount%80===0){
  var banana = createSprite(400,random(100,100,10));
  banana.addImage(bananaImage);
 banana.velocityX=-4;
  banana.lifetime = 150;
  banana.scale=0.05;
  banana.lifetime=140; 
  
  bananaGroup.add(banana);
 
}
}
//making function for obstacle  
 function createObstacles(){
 if(frameCount%300===0){
   
   var obstacle = createSprite(400,random(275,275),10,10);
   obstacle.addImage(obstacle_Img);
  obstacle.velocityX=-3;
  obstacle.scale=0.15; 
  obstacle.lifetime=200;                      
  obstaclesGroup.add(obstacle);   
  
  }                       
} 

 function reset(){           
 gameState=PLAY;
   score=0;
   obstaclesGroup.destroyEach();
   bananaGroup.destroyEach();
   restart.visible=false;
   gameOver.visible=false;    
   scene.velocityX=-4;
   frameCount=0;
 }  