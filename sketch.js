var ball;
var database;

function setup(){
    createCanvas(500,500);
    ball = createSprite(100,250,10,10);
    ball.shapeColor = "red";

    database = firebase.database();

    // .ref() - is used to refer to the location of the database we want to connect.
    // .on() - creates a listener which keeps on listening to the writes in the database.
    var locofChild = database.ref('ball/position');
    locofChild.on("value", readPosition, showError);
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

function writePosition(x,y)
{
    console.log("writePosition")
    database.ref('ball/position').set({
        'x' : ball.x + x,
        'y' : ball.y + y,
    });

}

function readPosition (data)
{
    // .val() - reades the data.
    position = data.val();
    console.log(position.x);
    ball.x = position.x;
    ball.y = position.y;
    
}

function showError()
{
    console.log("Error in reading and writing to the database");
}
