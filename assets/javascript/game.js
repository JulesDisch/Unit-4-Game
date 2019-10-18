$(document).ready(function () {
    // global variables

    var crystalPics = [
        "octogon.png", "square.png", "quartz.png", "teardropped.png"];
    var counter = 0;
    var wins = 0;
    var losses = 0;
    var targetNumber;

    // create target number
    function newTarget() {
        targetNumber = Math.floor(Math.random() * 100) + 19;
        $("#number-to-guess").text(targetNumber);
        console.log(targetNumber);
    }
    // clear the divs
    function clear() {
        $("#number-to-guess").empty();
        $("#crystals").empty();
        $("#crystal-score").empty();
    }
    // restart the game
    function reset() {
        clear();
        newTarget();
        crystalNumbers();
        counter = 0;
    }
    // create the number options for the crystals that don't repeat
    function crystalNumbers() {
        var numberOptions = new Array(4);
        var j = 0;
        var min = 1;
        var max = 12;
        while (j < numberOptions.length) {
            var randnum = Math.floor(Math.random() * (max - min + 1) + min);
            var found = false;
            for (var i = 0; i < numberOptions.length; i++) {
                if (numberOptions[i] === randnum) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                numberOptions[j] = randnum;
                j++;
            }
        }
        console.log(numberOptions);

        // Next we create a for loop to create crystals for every numberOption.
        for (var i = 0; i < numberOptions.length; i++) {

            // For each iteration, we will create an imageCrystal
            var imageCrystal = $("<img>");
            imageCrystal.addClass("crystal-image");

            // Each imageCrystal will be given a src link to the crystal image
            imageCrystal.attr("src", "assets/images/" + crystalPics[i]);
            // Each imageCrystal will be given a data attribute called data-crystalValue.
            // This data attribute will be set equal to the array value.
            imageCrystal.attr("data-crystalvalue", numberOptions[i]);
            // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
            $("#crystals").append(imageCrystal);
        }


        // function for modal to work
        function countModal() {
            var countModal = document.getElementById("counter");
            var contBtn = document.getElementById("continue");
            var quitBtn = document.getElementById("quit");
            countModal.style.display = "block";
            contBtn.onclick = function () {
                countModal.style.display = "none";
                reset();
            }
            quitBtn.onclick = function () {
                countModal.style.display = "none";
                $(".crystal-image").off("click");
                $("#number-to-guess").empty();
                $("#crystal-score").empty();
            }
        }

        $(".crystal-image").on("click", function () {
            var crystalValue = ($(this).attr("data-crystalvalue"));
            crystalValue = parseInt(crystalValue);
            counter += crystalValue;
            $("#crystal-score").text(counter);
            if (counter === targetNumber) {
                $("#winOrLose").text("You win!");
                countModal();
                wins++;
                $("#winsText").text(wins);
            }
            else if (counter >= targetNumber) {
                $("#winOrLose").text("You lose!");
                countModal();
                losses++;
                $("#lossesText").text(losses);
            }
        })
    };
    reset();
});
