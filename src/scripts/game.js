let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

// Game Start code: KEYBOARD
$(document).on("keydown", function(event){
    // console.log(event.key);

    // debugger
    // If started is false, !started will be true, so the code inside the if block will run (e.g., starting the game).
	// Once the game starts and started is set to true, !started will now be false, and the code inside the if block will not run anymore.
    if (!started) {

        $("#level-title").text("Level " + level);
        nextSequence();
        // console.log("set to " +started);
        started = true;
        // console.log(started);
    }
});

// Game Start code: TOUCHSCREEN
$(document).on("touchstart", function(event){
    // console.log(event.key);

    // debugger
    // If started is false, !started will be true, so the code inside the if block will run (e.g., starting the game).
	// Once the game starts and started is set to true, !started will now be false, and the code inside the if block will not run anymore.
    if (!started) {

        $("#level-title").text("Level " + level);
        nextSequence();
        // console.log("set to " +started);
        started = true;
        // console.log(started);
    }
});


// Click Functionality
$('.btn').on('click', function(){

    // console.log(this)
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    // console.log(userClickedPattern);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1)

});


function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        // console.log('success');
        // console.log("user "+userClickedPattern)
        // console.log("game "+gamePattern)
    
        if (userClickedPattern.length === gamePattern.length){

            // Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
            nextSequence();
            }, 1000);
            // level ++;

        } 

    } else {
        // console.log("wrong");
        playSound("wrong");

        
        console.log("game pattern "+gamePattern)
        console.log("user pattern "+userClickedPattern)
    
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        // Call startOver() if the user gets the sequence wrong.
        startOver();
    }

}


function nextSequence(){
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4); 
    // console.log(randomNumber);
    let randomChosenColor = buttonColors[randomNumber];
    // console.log(randomChosenColor);
    gamePattern.push(randomChosenColor);

    // sound and animation
    $('#'+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100)
        
    // animatePress(randomChosenColor);
    playSound(randomChosenColor);

    // level++;
}

function playSound(name){
    let sound = new Audio("src/assets/sounds/"+name+".mp3");
    sound.play(); 
    
}

function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");
    
    setTimeout(() => {
        $("#"+currentColor).removeClass("pressed");
    }, 100);

    // $('.'+currentColor).fadeIn(100).fadeOut(100).fadeIn(100)
    // $('button').addClass(".pressed");
    // var delayInMilliseconds = 100; //1 second

    // setTimeout(function() {
    // // your code to be executed after 1 second
    // }, delayInMilliseconds);
    // $('button').removeClass(".pressed");
}


function startOver(){
    
    level = 0;
    gamePattern = [];
    // userClickedPattern = [];
    started = false;

}
