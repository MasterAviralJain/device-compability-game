var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG, obstacle1Img, obstacle2Img, obstacle3Img, obstacleG, obstacle, select_oppPlayer, gameoverI,gameover;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;


function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  
  oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");
  
  oppYellow1Img=loadAnimation("opponent4.png", "opponent5.png");
  oppYellow2Img=loadAnimation("opponent6.png");
  
  oppRed1Img=loadAnimation("opponent7.png","opponent8.png");
  oppRed2Img=loadAnimation("opponent9.png");
  
  obstacle1Img=loadImage("obstacle1.png");
  obstacle2Img=loadImage("obstacle2.png");
  obstacle3Img=loadImage("obstacle3.png");
  gameoverI=loadImage("gameOver.png");
  
}


function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;

//creating boy running
mainCyclist  = createSprite(70,150, 40, 40);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.addAnimation("Sahil",mainRacerImg2);
mainCyclist.scale=0.07;
  mainCyclist.debug=true
  mainCyclist.setCollider("rectangle",0,0,mainCyclist.width,mainCyclist.height);
  pinkCG=createGroup();
  yellowCG=createGroup();
  redCG=createGroup();
  obstacleG=createGroup();
  
  gameover=createSprite(600, 100, 50, 50);
  gameover.addImage(gameoverI);
  gameover.visible=false;

  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
 
  if(gameState===PLAY){
   
    if (World.frameCount%30===0){
      obstacle();
    }
  if (obstacleG.isTouching(mainCyclist)){
    gameState=END;
  }
    var select_oppPlayer=Math.round(random(1,3));
  if (World.frameCount % 150 === 0){
    if (select_oppPlayer===1){
      playerA();
    }else if (select_oppPlayer===2){
      playerB();
    }else if (select_oppPlayer===3){
      playerC();
    }
  }
    if (pinkCG.isTouching(mainCyclist)){
      player1.changeAnimation("opponentPlayer1",oppPink2Img)
    }
  distance=distance+Math.round(getFrameRate()/50);
    path.velocityX=-(6+2*distance/150);
   
    }

    
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
  if( gameState===END){
    gameover.visible=true;
    path.velocityX=0;
    obstacle.velocityX=0;
    pinkCG.setVelocityXEach=0;
    yellowCG.setVelocityXEach=0;
    redCG.setVelociryXEach=0;
    mainCyclist.changeAnimation("Sahil",mainRacerImg2)
    if (keyDown(UP_ARROW)){
      reset();
    }
  }

}

function playerA(){
  player1=createSprite(1200, Math.round(random(50, 250)), 10, 10);
   player1.scale=0.06;
  player1.addAnimation("opponentPlayer1", oppPink1Img);
 player1.velocityX=-(6+2*distance/150);
  player1.setLifetime=170;
  pinkCG.add(player1);
}

function playerB(){
  player2=createSprite(1200, Math.round(random(50, 250)), 10, 10);
   player2.scale=0.06;
  player2.addAnimation("opponentPlayer2", oppYellow1Img);
 player2.velocityX=-(6+2*distance/150);
  player2.setLifetime=170;
  yellowCG.add(player2);
}

function playerC(){
  player3=createSprite(1200, Math.round(random(50, 250)), 10, 10);
   player3.scale=0.06;
  player3.addAnimation("opponentPlayer3", oppRed1Img);
  player3.velocityX=-(6+2*distance/150);
  player3.setLifetime=170;
 redCG.add(player3);
}
function obstacle(){
 let obstacle=createSprite(1200, Math.round(random(10, 290)), 10, 10);
  obstacle.velocityX=-(6+2*distance/150);
  obstacle.scale=0.09
  obstacle.setLifetime=170;
  var choose =Math.round(random(1,3));
  switch(choose){
      case 1: obstacle.addImage(obstacle1Img);
      break;
    case 2: obstacle.addImage(obstacle2Img);
      break;
    case 3: obstacle.addImage(obstacle3Img);
      break;
      default: break;
      
  }
  obstacleG.add(obstacle);
  
  obstacle.depth=mainCyclist.depth;
  mainCyclist.depth=mainCyclist.depth+1;
}

function reset(){
  gameState=PLAY;
  gameover.visible=false;
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  distance=0;
  mainCyclist.changeAnimation("SahilRunning",mainRacerImg1);
}

