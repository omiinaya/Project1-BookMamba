//declaring a global variable of userInput that we can change and use from anywhere in the script.
var userInput = "";
//declaring default value of testURL to be our URL based on titles.
var testURL = "https://www.googleapis.com/books/v1/volumes?q="+ userInput;

function setChoice() {
    if (document.querySelector('input[id="title-button"]:checked')) {
        $("#search-bar").attr("placeholder","Please enter the book title.") //changes placeholder
        testURL = "http://openlibrary.org/search.json?title="+userInput; //sets URL
        console.log(testURL);
    }
    if (document.querySelector('input[id="keyword-button"]:checked')) {
        $("#search-bar").attr("placeholder","Please enter the keywords.")
        testURL = "http://openlibrary.org/search.json?q="+userInput;
        console.log(testURL);
    }
    if (document.querySelector('input[id="author-button"]:checked')) {
        $("#search-bar").attr("placeholder","Please enter the name of the author.")
        testURL = "http://openlibrary.org/search.json?author="+userInput;
        console.log(testURL);
    }
    if (document.querySelector('input[id="category-button"]:checked')) {
        $("#search-bar").attr("placeholder","Please enter the desired category.")
        testURL = "http://openlibrary.org/subjects/"+userInput+".json";
        console.log(testURL);
    }
}

function runAjax() {
    //variable to store user input used to craft URLs
    userInput = $("#search-bar").val();
    //runs set choice so the right URL will be passed to the AJAX function below.
    setChoice()
    //ajax call that returns a JSON response based on the link provided.
    $.ajax({
    url: testURL,
    method: "GET"
    }).then(function(response) {
    console.log(response)
    });
}
