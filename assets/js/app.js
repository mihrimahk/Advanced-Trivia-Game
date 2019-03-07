$(document).ready(function () {
//Create all guestions array
    var questions= [{
        question: "What kind of animal is a Komodo dragon?",
        choice: ["A bug","A snake","A tiger","A lizard"],
    
        answer: 3,
        image: "assets/images/lizard.jpg",
    
    },{  
        question: "What type of animal is a Mexican hairless?",
        choice: ["A cat","A dog","A lion","A fish"],
    
        answer: 1,
        image: "assets/images/dog.jpg",
    
    },{
        question: "What kind of creature is a Portuguese man o' war?",
        choice: ["A jellyfish","A eagle","A crocodile","A snake"],
    
        answer: 0,
        image: "assets/images/man-o-war1.jpg",
    
    },{ 
       question: "How many legs does a lobster have?",
       choice: ["8","6","12","10"],
    
       answer: 3,
       image: "assets/images/lobster.jpg",
    
    },{ 
       question: "What type of animal is a Flemish giant?",
       choice: ["A frog","A fish","A rabbit","A bird"],
    
       answer: 2,
       image: "assets/images/rabbit.jpg",
    },{
       question: " Which creatures produce gossamer?",
       choice: ["Bugs","Snakes","Spiders","Birds"],
    
       answer: 2,
       image: "assets/images/spider.jpg",
    },{
       question: " From which animal is mohair obtained?",
       choice: ["A lamp","A sheep","A bear","A goat"],
    
       answer: 3,
       image: "assets/images/angora.jpg",
    },{
       question: "How many arms do most starfish have?",
       choice: ["3","5","4","6"],
    
       answer: 1,
       image: "assets/images/starfish.jpg",
    },{
       question : "What is a cabbage white?",
       choice : ["A caterpillar","A butterfly","A spider","A bird"],
    
       answer: 1,
       image: "assets/images/butterfly.jpg",
    },{
       question: "Which is the largest mammal in the world?",
       choice: ["A Elephant","A shark","The blue whale","A Hippo"],
    
       answer: 2,
       image: "assets/images/whale.jpg",
	}];
// Creating variables

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 10;
var intervalId;
var userGuess ="";
var running = false;
var qCount = questions.length;
var pick;
var index;
var newArray = [];
var holder = [];

$("#reset").hide();
//click start button to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < questions.length; i++) {
	holder.push(questions[i]);
}
	})
//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer countdown
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

//time is over
	if (timer < 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}
//randomly pick question in array if not already shown
//display question and loop though and display possible choice
function displayQuestion() {
	//generate random index in array
	index = Math.floor(Math.random()*questions.length);
	pick = questions[index];

	qno = unanswerCount + wrongCount + correctCount + 1;

//iterate through answer array and display

	$("#questionblock").html("<h2>" + qno + " - " + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);
//		}
}

//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
//grab array position from userGuess
userGuess = parseInt($(this).attr("data-guessvalue"));

//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}
function hidepicture() {
	$("#answerblock").append("<img src=" + pick.image + ">");
	newArray.push(pick);
	questions.splice(index,1);
	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 10;

//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#timeleft").empty();
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over! </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 2000);
}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		questions.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})