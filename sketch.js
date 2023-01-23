var boy, boyRunning;
var park, parkImg, checkPointSound;
var gameState = "play";
var points = 0
var ball, ballImg;
var coin, coinImg, coinSound;
var gameOver, gameOverImg;
var invisibleGround, jumpSound;

function preload() {
    boyRunning = loadAnimation("asset1.png","asset2.png","asset3.png");
    parkImg = loadImage("bg.png");
    ballImg = loadImage("ball.png");
    coinImg = loadImage("moeda.png");
    gameOverImg = loadImage("GameOver.png");

    jumpSound = loadSound("mixkit-arcade-game-jump-coin-216.wav");
    coinSound = loadSound("mixkit-melodic-gold-price-2000.wav");
    checkPointSound = loadSound("mixkit-arcade-score-interface-217.wav");

}

function setup() {
    createCanvas(600, 300);
    boy = createSprite(60,120);
    boy.addAnimation("running", boyRunning);
    boy.scale = 0.4;

    invisibleGround = createSprite(0,110,600,5);
    invisibleGround.visible = false;
    
    park = createSprite(600,300);
    park.addImage("bg", parkImg);
    park.x = park.width/2;

    gameOver = createSprite(300,100);
    gameOver.addImage("GameEnd", GameOverImg);
    gameOver.scale = 0.4;

}

function draw() {
 background("black");
 drawSprites();
 text("Pontos: "+points, 500, 0)

 if(gameState == "play"){
    console.log(gameOver);
    gameOver.visible = false;
    park.velocityX = -(3+3*points/200);
    points = points + Math.round(getFrameRate()/40);

    if (park.x < 0){
        park.x = park.width/2;
    }

    if (points > 0 && points % 200 === 0){
        checkPointSound.play()
    }

    if (keyDown("space")&& boy.y >= 150) {
        boy.velocityY = -12;
        jumpSound.play();
    }
    if (boy.isTouching(coin)) {
        points = points + 50;
    }
    if (boy.isTouching(ball)) {
        gameState = "END";
    }
    if (gameState == "END") {
        gameOver.visible = true;
        ball.velocityX = 0
        boy.velocityY = 0
        
    }

    spawnObstacle();
    spawn_coins();
 }
}

function spawnObstacle() {
    if (frameCount % Math.round(random(30,90))){
        ball.createSprite(60,130,50,50);
        ball.velocityX = -(5+score/200);

        ball.scale = 0.4;
        ball.lifetime = 180;
    }
}

function spawn_coins() {
    if (frameCount % Math.round(random(30,90))){
        coin.createSprite(60,130,25,50);
        coin.velocityX = -(5+score/200);

        coin.scale = 0.4;
        coin.lifetime = 180;
    }
}