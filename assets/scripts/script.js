//Omar's code starts here//

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

//Omar's code ends here//









//Keyla's code starts here//

//researching working APIs

            //quotes by author or image quotes//----> not working
  //var queryUrl = "https://quote-garden.herokuapp.com/quotes/author/:j.k.rowling"
  //var queryURL = "http://quotes.rest/quote/image/search.json?api_key=c9kZNAbwJv_8tdUeQinJMQeF?author=<JeanineCummins>"
  //var queryURL = "http://quotes.rest/quote/image/search.json?author=JeanineCumminsapi_key=c9kZNAbwJv_8tdUeQinJMQeF"
  //var queryURL = "http://quotes.rest/quote/image/search.json?author=JeanineCummins&api_key=c9kZNAbwJv_8tdUeQinJMQeF"

              //books by author---->doesn't work
  //var queryURL= "http://quotes.rest/quote/search.json?author=tolkien&api_key=c9kZNAbwJv_8tdUeQinJMQeF"
 //var queryURL ="http://openlibrary.org/search.json?author=tolkien"

          //with images----->doesn't work
//var queryURL = "http://quotes.rest/quote/image/search.json"

        //works well
//this one is lame ----> var queryURL = "http://quotes.rest/qod.json"

         //works perfectly for random authors
var queryURL = "http://quotes.rest/quote/random.json?api_key=c9kZNAbwJv_8tdUeQinJMQeF"

//we bought a key, but aren't using it-----> api_key=c9kZNAbwJv_8tdUeQinJMQeF


$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {

//What to do with the quotes {code here}
//Put in Div

//console.log(response);

$("#quote-author").text(response.contents.author);
$("#quote-text").text(response.contents.quote);


});





//Keyla's code ends here//