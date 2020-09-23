var ball;
var database, position;

function setup(){
    database = firebase.database();
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    var ballPosition = database.ref("Ball/Position");
    ballPosition.on("value", readPosition, showErr);
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        writePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        writePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        writePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        writePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    ball.x = ball.x + x;
    ball.y = ball.y + y;
}

function writePosition(x, y){
    console.log(position);
    database.ref("Ball/Position").set({
        'X' : position.X + x,
        'Y' : position.Y + y
    })
}

function readPosition(data){
    position = data.val();
    ball.x = position.X;
    ball.y = position.Y;
}

function showErr(){
    console.log("Error occured");
}