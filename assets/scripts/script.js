var responseTest = "";
var userInput = "";
var newArr = [];

var lastrandom = 0;
var random = 0;

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
  noRepeats()
  console.log("index/random value: "+random)
  $("#bookTitle").html(newArr[random].volumeInfo.title);
  $("#authorSpan").text(newArr[random].volumeInfo.authors);
  $("#publishedDate").text(newArr[random].volumeInfo.publishedDate);
  $("#rating").text(newArr[random].volumeInfo.averageRating);
  $("#descriptionText").text(newArr[random].volumeInfo.description);
  $("#bookCover").attr("src",newArr[random].volumeInfo.imageLinks.thumbnail);
}

function noRepeats() {
while (random === lastrandom) {
  random = Math.floor(Math.random() * newArr.length);
  }
  lastrandom = random;
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
  nextBook()
  });
}

function quotesAjax(){
  var queryURL = "https://quotes.rest/quote/random.json?api_key=c9kZNAbwJv_8tdUeQinJMQeF"
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
  nextBook()    
  });
}