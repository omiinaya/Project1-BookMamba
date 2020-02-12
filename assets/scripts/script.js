var responseTest = "";
var userInput = "";
var newArr = [];

var lastrandom = 0;
var random = 0;
//k
function loadPage() {
  defaultDracula()
  topSellersAjax()
  quotesAjax()
  enterKey()
}
//k
function enterKey(){
  var enterText = document.getElementById("search-bar");
  enterText.addEventListener("keyup", function(event) {
    if (event.keyCode===13) {
      event.preventDefault();
      runAjax();
    }
  });
}
//o
function ratingFilter() {
  for (var i = 0; i < responseTest.items.length; i++)
  if (responseTest.items[i].volumeInfo.averageRating >= 4) {
    newArr.push(responseTest.items[i]);
  }
  console.log(newArr);
}
//k
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
//o
function noRepeats() {
while (random === lastrandom) {
  random = Math.floor(Math.random() * newArr.length);
  }
  lastrandom = random;
}
//o
function runAjax() {
  newArr = [];
  userInput = $("#search-bar").val();
  var queryURL = "https://www.googleapis.com/books/v1/volumes?q="+userInput;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    //assigning global variable responseTest the value of repsonse so we can use response outside of this function.
    responseTest = response;
    ratingFilter()
    nextBook()
  });
}
//o
function quotesAjax(){
  var queryURL = "https://quotes.rest/quote/random.json?api_key=c9kZNAbwJv_8tdUeQinJMQeF"
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) { 
    $("#quote-spinner").hide();
    $("#quote-author").text("-"+response.contents.author);
    $("#quote-text").text('"'+response.contents.quote+'"');
    $("#book-section").show();
    $("#nyTimes").show();
  });
}
//k
function defaultDracula() {
  var queryURL = "https://www.googleapis.com/books/v1/volumes?q=Dracula";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response)
    responseTest = response;
    ratingFilter()
    nextBook()    
  });
}
//o
function topSellersAjax() {
  var queryURL = "https://api.nytimes.com/svc/books/v3/lists/current/Combined%20Print%20and%20E-Book%20Fiction.json?api-key=6ad84e249d054efeaefe1abb8f89df5b"
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response)
  });
}