$(function() {


    if ($("#logButton")) {
        $("#logButton").on("click", function() {
            var namex = $("#userHtml").val();
            var passex = $("#passHtml").val();
            localStorage.username = namex;
            localStorage.password = passex;
            window.location = "index.html";
        });
    }

    if ($("#cancelButton")) {
        $("#cancelButton").click(function() {
            window.location = "index.html";
        });
    }

    var name = localStorage.username;
    if (name) {
        var welcome = document.createTextNode("Hello " + name);
        //$("#login").text(welcome);
        $("#question").css({
            "display": "none"
        });
    }

    if (counter > 0) {
        $("#login").style.display = "none";
    }

    var allQuestions = [{
        "question": "Who's the Boss?",
        "choices": ["Tony Danza (hint: this is correct)", "Lumberg", "Charles/Scott Baio", "Not this one"],
        "correctAnswer": 0
    }, {
        "question": "Where were the 2014 Winter Olympics held?",
        "choices": ["America", "Florida", "THE United States of America", "Sochi, Russia", "Jamaica!", "Argentina"],
        "correctAnswer": 3
    }, {
        "question": "Where is the World Cup being held during summer 2014?",
        "choices": ["USA", "Qatar", "Brazil", "Argentina"],
        "correctAnswer": 2
    }, {
        "question": "What color are Bob Costa's eyes when he has pink eye?",
        "choices": ["White", "Blue", "Pink", "Translucent"],
        "correctAnswer": 2
    }, {
        "question": "Who won Superbowl XLVIII (played 2/2/2014)?",
        "choices": ["Denver Broncos", "Seattle Seahawks", "Omaha", "Troy Aikman"],
        "correctAnswer": 1
    }];
    /*(function () {
    allQuestions = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "questions.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    return json;
})(); */
    //make a counter and a score
    var counter = 0;
    var arrayScore = [];
    var totals = 0;
    //hide back button
    if (counter < 1) {
        $("#backButton").css({
            "display": "none"
        });
    }

    function fill() {
        $("#visibleForm").fadeOut(200);

        if (allQuestions[counter - 1]) {
            //fill question
            $("#question").text(allQuestions[counter - 1].question);
            //fill inputs
            $("#choices").empty();
            for (var i = 0, k = allQuestions[counter - 1].choices.length; i < k; i++) {
                var choicey = document.createTextNode(allQuestions[counter - 1].choices[i]);
                var labeley = document.createElement("label");
                labeley.appendChild(choicey);
                $("#choices").append("<input type='radio' class='radioButton' name='onechoice' val='+i+'>").append(labeley).append("<br>");
            }

            $(":radio").click(function() {
                arrayScore[counter - 1] = $(this).next().text();
            });

            if (counter > 1) {
                $("#backButton").css({
                    "display": "inline"
                });
            }

        }
        //alert(arrayScore[counter - 2]);

        $("#visibleForm").fadeIn(200);
    }




    //make a function that runs when you hit next
    function next() {
        $("#question").css({
            "display": "inline"
        });
        $("#login").css({
            "display": "none"
        });

        console.log(counter);

        //if last question has a checked radio, increment counter
        if (counter > 0) {
            if (arrayScore[counter - 1]) {
                counter++;
            }

        }
        //if last question has been shown, show score
        if (counter - 1 == allQuestions.length) {
            $("#choices").empty();
            for (var i = 0, k = allQuestions.length; i < k; i++) {
                if (arrayScore[i] === allQuestions[i].correctAnswer) {
                    totals++;
                }
            }
            $("#question").text(totals + " " + "out of" + " " + allQuestions.length + " " + "isn't bad!");
            $("#nextButton").css({
                "display": "none"
            });
            totals = 0;
        }
        if (counter === 0) {
            counter++;
        }

        fill();
    }


    $("#backButton").click(function() {
        alert("back it up!");
        counter--;
        // console.log("back prefill counter: " + counter);
        //console.log("back prefill arrayScore[counter-1] value: " + arrayScore[counter - 1]);
        fill();
        $("#nextButton").css({
            "display": "inline"
        });
    });


    $("#nextButton").click(next);
}); //ready