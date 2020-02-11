//Omar's code starts here//
var responseTest = "";
var userInput = "";
var queryURL = "http://quotes.rest/quote/random.json?api_key=c9kZNAbwJv_8tdUeQinJMQeF"

function quotesAjax(){
  $.ajax({
  url: queryURL,
  method: "GET"
  }).then(function(response) { 
  console.log(response);
  //Omar's code ends here
  //
  //Keyla's code starts here
  //
  //Putting the quotes inside the <p> tags/replacing the placeholder with actual content that entices users to read.
  $("#quote-author").text("-"+response.contents.author);
  $("#quote-text").text('"'+response.contents.quote+'"');
  });
}
//Keyla's code ends here//
//       
//Omar's code starts here//
//
//declaring default value of testURL to be our URL based on titles.
function runAjax() {
  userInput = $("#search-bar").val();
  var testURL = "https://www.googleapis.com/books/v1/volumes?q="+userInput;
  $.ajax({
  url: testURL,
  method: "GET"
  }).then(function(response) {
  console.log(response)
  //assigning global variable responseTest the value of repsonse so we can use response outside of this function.
  responseTest = response;
  //Omar's code ends here//
  //
  //Keyla's code starts here//
  //
  //displaying book details
  passData()
  });
}
//creating function for next button to display next book using Omar's random variable (a)
function nextBook() {
  passData()
}

function defaultDracula() {
var testURL = "https://www.googleapis.com/books/v1/volumes?q=Dracula";
$.ajax({
url: testURL,
method: "GET"
}).then(function(response) {
console.log(response)
responseTest = response;
passData()    
});
}

function loadPage() {
  defaultDracula()
  quotesAjax()
  enterKey()
}

//triggering enter key on search-bar button
function enterKey(){
var enterText = document.getElementById("search-bar");
enterText.addEventListener("keyup", function(event)
{
  if (event.keyCode===13)
  {
    event.preventDefault();
    runAjax();
  }
});
}
//Keyla's code ends here//

function passData() {
  var a = [Math.floor(Math.random()*responseTest.items.length)]
  if (responseTest.items[a].volumeInfo.averageRating==5) {
    $("#bookTitle").html(responseTest.items[a].volumeInfo.title);
    $("#authorSpan").text(responseTest.items[a].volumeInfo.authors);
    $("#publishedDate").text(responseTest.items[a].volumeInfo.publishedDate);
    $("#rating").text(responseTest.items[a].volumeInfo.averageRating);
    $("#bookCover").attr("src",responseTest.items[a].volumeInfo.imageLinks.thumbnail);
    $("#descriptionText").text(responseTest.items[a].volumeInfo.description);
    console.log(responseTest.items[a].volumeInfo.averageRating);
  }
  else if (responseTest.items[a].volumeInfo.averageRating>=4) {
    $("#bookTitle").html(responseTest.items[a].volumeInfo.title);
    $("#authorSpan").text(responseTest.items[a].volumeInfo.authors);
    $("#publishedDate").text(responseTest.items[a].volumeInfo.publishedDate);
    $("#rating").text(responseTest.items[a].volumeInfo.averageRating);
    $("#bookCover").attr("src",responseTest.items[a].volumeInfo.imageLinks.thumbnail);
    $("#descriptionText").text(responseTest.items[a].volumeInfo.description);
  }     
}
    