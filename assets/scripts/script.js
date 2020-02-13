var userInput = "";
var newArr = [];
var authorName="";
var titleName="";

var bookResponse = "";
var nyResponse = "";
var quoteResponse = "";

var lastrandom = 0;
var random = 0;

//k
function loadPage() {
  topSellersAjax()
  quotesAjax()
  enterKey()
  buyNow()
  ExpandQuote()
  ExpandDescription()
}

function enterKey(){
  var enterText = document.getElementById("search-bar");
  enterText.addEventListener("keyup", function(event) {
    if (event.keyCode===13) {
      event.preventDefault();
      searchAjax();
    }
  });
}
//o
function ratingFilter() {
  for (var i = 0; i < bookResponse.items.length; i++)
  if (bookResponse.items[i].volumeInfo.averageRating >= 4) {
    newArr.push(bookResponse.items[i]);
  }
  console.log(newArr);
}
text_truncate = function(str, length, ending) {
  if (length == null) {
    length = 100;
  }
  if (ending == null) {
    ending = '..." Read More';
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};
//k
function bookData() { //used to be called nextBook. renamed for readability.
  noRepeats()
  console.log("index/random value: "+random)
  authorName = newArr[random].volumeInfo.authors;
  titleName = newArr[random].volumeInfo.title;
  $("#bookTitle").html(newArr[random].volumeInfo.title);
  $("#authorSpan").text(newArr[random].volumeInfo.authors);
  $("#publishedDate").text(newArr[random].volumeInfo.publishedDate);
  $("#rating").text(newArr[random].volumeInfo.averageRating);
  shortenDescription()

  if (typeof newArr[random].volumeInfo.imageLinks == "undefined") { //in case the JSON does not return a thumbnail to display.
    $("#bookCover").attr("src","assets/images/128x176_placeholder.png"); //shows placeholder if no thumbnail.
  } else {
    $("#bookCover").attr("src",newArr[random].volumeInfo.imageLinks.thumbnail); 
  }
}
//o
function shortenQuote() {
  truncatedQuote = text_truncate('"'+quoteResponse.contents.quote+'"', 125); //creates a trimmed version of the quote received from JSON.
  fullQuote = '"'+quoteResponse.contents.quote+'"';
  if (quoteResponse.contents.quote.length > 125) {
    $("#quote-text").text(truncatedQuote);
  } else {
    $("#quote-text").text(fullQuote);
  }
}

function shortenDescription() {
  truncatedDescription = text_truncate('"'+newArr[random].volumeInfo.description, 200);
  fullDescription = '"'+newArr[random].volumeInfo.description+'"';
  var testDescription = newArr[random].volumeInfo.description;
  if (typeof testDescription != "undefined") {
    if (testDescription.length > 200) {
    fullDescription = '"'+newArr[random].volumeInfo.description+'"';
    $("#descriptionText").text(truncatedDescription)
    } else {
      $("#descriptionText").text(fullDescription)
    }
  } else {
    $("#descriptionText").text('"A book description was not provided."')
  }
}

function ExpandQuote() {
  $("#quote-text").click(function() {
    if ($("#quote-text").text() == truncatedQuote) { //if it's already trimmed, 
      $("#quote-text").text(fullQuote) //show full quote.
    } else {
      $("#quote-text").text(truncatedQuote) //otherwise, trim quote.
    }
  });
}

function ExpandDescription() {
  $("#descriptionText").click(function() {
    if ($("#descriptionText").text() == truncatedDescription) {
      $("#descriptionText").text(fullDescription)
    } else {
      $("#descriptionText").text(truncatedDescription)
    }
  });
}

function noRepeats() { //makes sure there are no repeated random numbers. (the same title wont show up again when pressing next.)
while (random === lastrandom) {
  random = Math.floor(Math.random() * newArr.length);
  }
  lastrandom = random;
}

function searchAjax() { //used to be called runAjax. renamed for readability.
  newArr = [];
  userInput = $("#search-bar").val();
  var queryURL = "https://www.googleapis.com/books/v1/volumes?q="+userInput;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    //assigning global variable bookResponse the value of repsonse so we can use response outside of this function.
    bookResponse = response;
    console.log(bookResponse);
    ratingFilter()
    $("#book-section").show();
    bookData()
    console.log(authorName);

  });
}

function quotesAjax(){
  var queryURL = "https://quotes.rest/quote/random.json?api_key=c9kZNAbwJv_8tdUeQinJMQeF"
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) { 
    quoteResponse = response;
    console.log(quoteResponse);
    shortenQuote()
    $("#quote-spinner").hide();
    $("#quote-author").text("-"+response.contents.author);
    $("#nyTimes").show();
  });
}
//k
function topSellersAjax() {
  var queryURL = "https://api.nytimes.com/svc/books/v3/lists/current/Combined%20Print%20and%20E-Book%20Fiction.json?api-key=6ad84e249d054efeaefe1abb8f89df5b"
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    nyResponse = response;
    console.log(nyResponse);
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
//giving buy now button functionality
function buyNow() {
  $("#buyNowBtn").click(function() {
  window.open("http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords="+titleName+authorName);
  });
}