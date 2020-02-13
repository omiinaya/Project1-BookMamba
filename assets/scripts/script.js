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
  console.log(typeof newArr[random].volumeInfo.imageLinks);
  if (typeof newArr[random].volumeInfo.imageLinks == "undefined") {
    $("#bookCover").attr("src","assets/images/128x176_placeholder.png");
  } else {
    $("#bookCover").attr("src",newArr[random].volumeInfo.imageLinks.thumbnail);
  }
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
    console.log('top sellers response full:',response)
//k
    $("#rank-one-title").html(response.results.books[0].title);
    $("#rank-one-author").text(response.results.books[0].author);
    $("#bestSellerCover").attr("src",response.results.books[0].book_image);
    if (response.results.books[0].book_review_link == "") {
      $("#bestSellerLink").attr("href",response.results.books[0].amazon_product_url);
    } else {
      $("#bestSellerLink").attr("href",response.results.books[0].book_review_link);
    }

   $("#rank-two-title").html(response.results.books[1].title);
   $("#rank-two-author").text(response.results.books[1].author);
   if (response.results.books[1].book_review_link == "") {
    $("#bestSellerLink2").attr("href",response.results.books[1].amazon_product_url);
  } else {
    $("#bestSellerLink2").attr("href",response.results.books[1].book_review_link);
  }
    
  $("#rank-three-title").html(response.results.books[2].title);
   $("#rank-three-author").text(response.results.books[2].author);
   if (response.results.books[2].book_review_link == "") {
    $("#bestSellerLink3").attr("href",response.results.books[2].amazon_product_url);
  } else {
    $("#bestSellerLink3").attr("href",response.results.books[2].book_review_link);
  }
  });
}


