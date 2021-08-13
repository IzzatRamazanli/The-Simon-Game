var buttonColours =['red','blue','green','yellow'];

var gamePattern =[];
var userClickedPattern=[];

var started=false;

var level=0;

$(document).keydown(function(){
    if(!started){
      nextSequence();
      $('#level-title').text('Level '+level);
      started=true;  
    }
})

$('.btn').click(function () {
   var userChosenColour=$(this).attr('id');
   userClickedPattern.push(userChosenColour);
   
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log('success');
        
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    
    else{
        var wrongSound=new Audio('sounds/wrong.mp3');
        wrongSound.play();

        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over')
        },200);

        $('h1').text('Game Over, Press Any Key to Restart');
        startOver();
    }
}

function nextSequence() {
    userClickedPattern=[];

    level++;
    $('#level-title').text('Level '+level);
    var randomNumber=Math.round(Math.random()*3);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $('#'+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);
    
}

function playSound(name) {
    
    var audio = new Audio("sounds/"+ name+ ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $('#'+currentColour).addClass('pressed');
    setTimeout(function(){$('#'+currentColour).removeClass('pressed')},90);
    
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}



