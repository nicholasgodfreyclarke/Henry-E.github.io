var numberSuccesses = 0;
var gameOver = false;
var wordData;
var buttonIds = ["button1", "button2", "button3", "button4"];

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

$.getJSON("examplesOfFour.json", function(json) {
    // Put logic in here as getJSON is async (or could call out to another function)

    // Randomly select a set of words
    wordData = json[Math.floor(json.length * Math.random())]

    // shuffle negative and positive words
    words = shuffle(wordData["positive words"].concat(wordData["negative words"]));
    
    // Add words to page
    $("#clue").text("Clue: " + wordData["clue"]);
    for (i = 0; i < 4; i++) {
        $("#" + buttonIds[i]).text(words[i]);
    }
});


// Button handler: set button colour after choice and check whether game over
$( ".choiceButton" ).click(function() {
    $(this).removeClass("btn-default");
    
    if ($.inArray($(this).text(), wordData["positive words"]) !== -1) {
        $(this).addClass("btn-success");
        numberSuccesses += 1;
    } else {
        // Reveal answers to buttons
        for (i = 0; i < 4; i++) {
            if ($.inArray($("#" + buttonIds[i]).text(), wordData["positive words"]) !== -1) {
                $("#" + buttonIds[i]).addClass("btn-success");
            } else {
                $($("#" + buttonIds[i])).addClass("btn-danger"); 
            }
        };

        // Game over - sorry dude
        $("#gameOutcome").text("You have lost!");
        $("#gameOutcome").css("visibility",  "visible");
        gameOver = true;
        $("#playAgainButton").css("visibility",  "visible");
    };

    if (numberSuccesses === 2 && gameOver === false) {
        $("#gameOutcome").text("You have won!");
        $("#gameOutcome").css("visibility",  "visible");
        gameOver = true;
        $("#playAgainButton").css("visibility",  "visible");
    };

})



