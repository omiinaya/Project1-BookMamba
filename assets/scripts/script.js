var responseTest = "";
var userInput = "";
var newArr = [];

function loadPage() {
  defaultDracula()
  quotesAjax()
  enterKey()
}

function enterKey(){
  var enterText = document.getElementById("search-bar");
  enterText.addEventListener("keyup", function(event) {
    if (event.keyCode===13) {
      event.preventDefault();
      runAjax();
    }
  });
}

function ratingFilter() {
  for (var i = 0; i < responseTest.items.length; i++)
  if (responseTest.items[i].volumeInfo.averageRating >= 4) {
    newArr.push(responseTest.items[i]);
  }
  console.log(newArr);
}

function nextBook() {
  passData()
}

//declaring default value of testURL to be our URL based on titles.
function runAjax() {
  newArr = [];
  userInput = $("#search-bar").val();
  var testURL = "https://www.googleapis.com/books/v1/volumes?q="+userInput;
  $.ajax({
  url: testURL,
  method: "GET"
  }).then(function(response) {
  console.log(response)
  //assigning global variable responseTest the value of repsonse so we can use response outside of this function.
  responseTest = response;
  ratingFilter()
  passData()
  });
}

function quotesAjax(){
  var queryURL = "http://quotes.rest/quote/random.json?api_key=c9kZNAbwJv_8tdUeQinJMQeF"
  $.ajax({
  url: queryURL,
  method: "GET"
  }).then(function(response) { 
  console.log(response);
  $("#quote-author").text("-"+response.contents.author);
  $("#quote-text").text('"'+response.contents.quote+'"');
  });
}

function defaultDracula() {
var testURL = "https://www.googleapis.com/books/v1/volumes?q=Dracula";
$.ajax({
url: testURL,
method: "GET"
}).then(function(response) {
console.log(response)
responseTest = response;
ratingFilter()
passData()    
});
}

function passData() {
  var a = [Math.floor(Math.random()*newArr.length)]
    $("#bookTitle").html(newArr[a].volumeInfo.title);
    $("#authorSpan").text(newArr[a].volumeInfo.authors);
    $("#publishedDate").text(newArr[a].volumeInfo.publishedDate);
    $("#rating").text(newArr[a].volumeInfo.averageRating);
    $("#bookCover").attr("src",newArr[a].volumeInfo.imageLinks.thumbnail);
    $("#descriptionText").text(newArr[a].volumeInfo.description);
    console.log(newArr[a].volumeInfo.averageRating);
}