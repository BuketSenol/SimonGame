var buttonColours=["red", "blue", "green", "yellow"];

var gamePattern=[];
var userClickedPattern=[];

var level=0;
var started=false;

$(document).keypress(function(){
    if (!started){
        $("#level-title").text("Level"+ level);
        nextSequence();
        started=true;
    }
})

$(".btn").on("click", function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }

    }else{
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart")
        
        setTimeout(() => {
            $("body").removeClass("game-over")
        }, 200);

        startOver();
    }

}


function nextSequence() {
    userClickedPattern=[];
    level ++;
    $("#level-title").text("LeveL"+ level);

    var randomNumber=Math.floor(Math.random()*4);
    var RandomChosenColour=buttonColours[randomNumber];
    gamePattern.push(RandomChosenColour);
    
    $("#"+ RandomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(RandomChosenColour);
    
}

function playSound(name){
    var audio=new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function animatePress(currenColour){
    $("#"+ currenColour).addClass("pressed");

    setTimeout(() => {
        $("#"+currenColour).removeClass("pressed")
    }, 1000);
}


function startOver(){
    level=0;
    gamePattern=[];
    started=false
}

