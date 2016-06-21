var numberSuccesses = 0;
var numberFailues = 0;
var gameOver = false;
var wordJson;
var buttonIds = ["button1", "button2", "button3", "button4", "button5", "button6"];
var numberButtons;
var numberOfWins = 0;
var numberOfLosses = 0;

$( document ).ready(function() {
    getWordJson();
    numberButtons = 4;
    createGame();
});

function createGame() {

    // Reset game
    gameOver = false;
    numberSuccesses = 0;
    numberFailues = 0;
    $('#buttonDiv').html('');
    $("#gameOutcome").css("visibility",  "hidden");
    $("#playAgainButton").css("visibility",  "hidden");
    
    createButtons(numberButtons);
    updateButtonText(numberButtons, wordJson);
}

function getWordJson() {
    // Need to set async to false
    $.ajax({
      dataType: "json",
      url: "words.json",
      data: "",
      async: false,
      success: function(data) {
        wordJson = data;
      }
    });
}

function createButtons(numberButtons) {
    
    var buttonHtml = '';

    for (i = 1; i < numberButtons/2 + 1; i++) {
        buttonHtml = buttonHtml.concat('<button type="button" class="btn btn-primary choiceButton" id="button' + i + '" style="width:200px">' + i + '</button>');
    }
    buttonHtml = buttonHtml.concat('<br><br>');   
    for (i = numberButtons/2 + 1; i < numberButtons + 1; i++) {
        buttonHtml = buttonHtml.concat('<button type="button" class="btn btn-primary choiceButton" id="button' + i + '" style="width:200px">' + i + '</button>');         
    }

    $('#buttonDiv').append(buttonHtml);
};

function updateButtonText(numberButtons, json) {

        if (numberButtons === 2) {
            wordData = json["examplesOfTwo"] 
        } else if (numberButtons === 4) {
            wordData = json["examplesOfFour"]
        } else if (numberButtons === 6) {
            wordData = json["examplesOfSix"]
        }

        // Randomly select a set of words
        wordData = wordData[Math.floor(wordData.length * Math.random())];

        // shuffle negative and positive words
        words = shuffle(wordData["positive words"].concat(wordData["negative words"]));
        
        // Add words to page
        $("#clue").text("Clue: " + wordData["clue"]);
        for (i = 0; i < numberButtons; i++) {
            $("#" + buttonIds[i]).text(words[i]);
        }
}

// http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Button handler: set button colour after choice and check whether game over
// Set handler to body so it can pick up buttons added dynamically by javascript
$('body').on('click', '.choiceButton', function() {
    if (gameOver === false) {
        $(this).removeClass("btn-default");
        
        if ($.inArray($(this).text(), wordData["positive words"]) !== -1) {
            $(this).addClass("btn-success");
            numberSuccesses += 1;
        } else {
            $(this).addClass("btn-danger");
            numberFailues += 1;
        };

        if (numberSuccesses === numberButtons/2) {
            numberOfWins++;
            $("#winPercentage").text("Win percentage: " + Math.floor(numberOfWins / (numberOfWins + numberOfLosses) * 100) + "%");
            gameOver = true;
            revealAnswers();
            $("#gameOutcome").text("You have won!");
            $("#gameOutcome").css("visibility",  "visible");
            $("#playAgainButton").css("visibility",  "visible");
        } else if (numberFailues === numberButtons/2) {
            numberOfLosses++;
            $("#winPercentage").text("Win percentage: " + Math.floor(numberOfWins / (numberOfWins + numberOfLosses) * 100) + "%");
            gameOver = true;
            revealAnswers();
            $("#gameOutcome").text("You have lost!");
            $("#gameOutcome").css("visibility",  "visible");
            $("#playAgainButton").css("visibility",  "visible");
        }
    }
})

function revealAnswers() {
    for (i = 0; i < numberButtons; i++) {
        if ($.inArray($("#" + buttonIds[i]).text(), wordData["positive words"]) !== -1) {
            $("#" + buttonIds[i]).addClass("btn-success");
        } else {
            $($("#" + buttonIds[i])).addClass("btn-danger"); 
        }
    }; 
}

$('body').on('click', '#playAgainButton', function() {
    createGame();
})

$('body').on('click', '.numberOfWordsButton', function() {
    var selection = $(this).text();

    if (selection === '2 words') {
        numberButtons = 2;
        createGame();
    } else if (selection === '4 words') {
        numberButtons = 4;
        createGame();
    } else if (selection === '6 words') {
        numberButtons = 6;
        createGame();
    }

})