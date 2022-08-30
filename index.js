// var start = 0;
// var pressedArray = [];
// var clickPressedArray = []
// var saveArray = [];
// $("body").on("keypress", function(){

//     incrementStart(start);
//     pickRandomBox();
    
//     // alert("#"+random);
// });

// $(".btn").on("click",function(event){
//     if(event.target.id == "green"){
//         $(".class_"+1).addClass("pressed");
//         clickPressedArray.push(1);
//         // console.log(event.target.id);
//         comapreArray(1);
//     }

//     if(event.target.id == "red"){
//         $(".class_"+2).addClass("pressed");
//         clickPressedArray.push(2);
//         // console.log(event.target.id);
//         comapreArray(2);
//     }

//     if(event.target.id == "yellow"){
//         $(".class_"+3).addClass("pressed");
//         clickPressedArray.push(3);
//         // console.log(event.target.id);
//         comapreArray(3);
//     }

//     if(event.target.id == "blue"){
//         $(".class_"+4).addClass("pressed");
//         clickPressedArray.push(4);
//         // console.log(event.target.id);
//         comapreArray(4);
//     }
// });

// function comapreArray(number){
//     // alert(pressedArray)
//     // alert(clickPressedArray)
//     // alert();
//     // for(var i =0; i < clickPressedArray.length; i++)
//     // {
//         console.log("compare array");
//         console.log("pressed array:"+pressedArray);
//         console.log("pressed array length -1 :"+pressedArray[pressedArray.length-1]);
//         console.log("click pressed array:"+clickPressedArray);
//         console.log("click pressed array 0 index:"+clickPressedArray[0]);
//         console.log(JSON.stringify(pressedArray));
//         console.log(JSON.stringify(clickPressedArray));
//         if(JSON.stringify(pressedArray) == JSON.stringify(clickPressedArray))
//         {
//             // pressedArray.push(number);
//             incrementStart(clickPressedArray.length);
//             pickRandomBox();
//         }
//         else
//         {
//             console.log("else else else");
//             console.log("pressed array:"+pressedArray);
//             console.log("pressed array length -1 :"+pressedArray[pressedArray.length-1]);
//             console.log("click pressed array:"+clickPressedArray);
//             console.log("click pressed array 0 index:"+clickPressedArray[0]);
//         }
//     // }
// }


// function pickRandomBox(){

//     var random = Math.floor((Math.random()) * 4) + 1;
//     console.log("step 1 pick random");
//     console.log("#"+random);
//     $(".class_"+random).addClass("pressed");
//         pressedArray.push(random);
//         console.log("show value of random nnumber & pressed array");
        
//         console.log(random);
//         console.log(pressedArray);
        
//         setTimeout(() => {
//             if(random == 1)
//             {
//                 var green = new Audio("sounds/green.mp3");
//                 green.play();
//                 $(".class_"+random).removeClass("pressed");
//             }
//             else if(random == 2)
//             {
//                 var red = new Audio("sounds/red.mp3");
//                 red.play();
//                 $(".class_"+random).removeClass("pressed");
//             }
//             else if(random == 3)
//             {
//                 var yellow = new Audio("sounds/yellow.mp3");
//                 yellow.play();
//                 $(".class_"+random).removeClass("pressed");
//             }
//             else if(random == 4)
//             {
//                 var blue = new Audio("sounds/blue.mp3");
//                 blue.play();
//                 $(".class_"+random).removeClass("pressed");
//             }
//         }, 10);
    
// }

// function incrementStart(start){

//     start = start + 1;
//     $("h1").text("Level " +start);
// }




//////////////////////////////////////////////////////////////////////
var buttonColor = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
function nextSequence(){
    userClickedPattern = [];
    level = level +1;
    $("#level-title").text("Level " + level);
    var random = Math.floor((Math.random()) * 4);
    var randomChosenColour = buttonColor[random];
    gamePattern.push(randomChosenColour);
    // console.log(gamePattern);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
    var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();

}

$(document).keypress(function() {
    if (!started) {
        $("h1").text("level "+level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click",function(event){
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    console.log(userClickedPattern);
    animatePress(userChosenColor);
    checkAnswer((userClickedPattern.length - 1));
})

function animatePress(currentColor)
{
    $("#"+currentColor).addClass('pressed');
    setTimeout(() => {
        $("#"+currentColor).removeClass('pressed');
    }, 100);
}

function checkAnswer(currentLevel){
    console.log(gamePattern);
    console.log(currentLevel);
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel])
    {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }
    else
    {
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over"); 
        setTimeout(() => {
            $("body").removeClass("game-over"); 
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart.");
        startOver();
    }
}

function startOver()
{
    level = 0;
    gamePattern = [];
    started = false;
}