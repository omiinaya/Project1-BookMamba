var bookResponse = "";
var nyResponse = "";
var quoteResponse = "";
var userInput = "";
var newArr = [];
var authorName="";
var titleName="";

var lastrandom = 0;
var random = 0;
//k
function loadPage() {
  topSellersAjax()
  quotesAjax()
  enterKey()
  buyNow()
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
    ending = '...';
  }
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  } else {
    return str;
  }
};
//k
function bookData() {
  noRepeats()
  console.log("index/random value: "+random)
  authorName = newArr[random].volumeInfo.authors;
  titleName = newArr[random].volumeInfo.title;
  $("#bookTitle").html(newArr[random].volumeInfo.title);
  $("#authorSpan").text(newArr[random].volumeInfo.authors);
  $("#publishedDate").text(newArr[random].volumeInfo.publishedDate);
  $("#rating").text(newArr[random].volumeInfo.averageRating);
  shortenDescription()

  console.log(typeof newArr[random].volumeInfo.imageLinks);
  if (typeof newArr[random].volumeInfo.imageLinks == "undefined") {
    $("#bookCover").attr("src","assets/images/128x176_placeholder.png");
  } else {
    $("#bookCover").attr("src",newArr[random].volumeInfo.imageLinks.thumbnail);
  }
}
//o
function shortenDescription() {
  var truncatedDescription = text_truncate(newArr[random].volumeInfo.description, 200);
  if (newArr[random].volumeInfo.description.length > 200) {
    $("#descriptionText").text('"'+truncatedDescription+'" Read More');
  } else {
    $("#descriptionText").text('"'+response.contents.description+'"');
  }
}
function shortenQuote() {
  var truncatedQuote = text_truncate(quoteResponse.contents.quote, 125);
  if (quoteResponse.contents.quote.length > 125) {
    $("#quote-text").text('"'+truncatedQuote+'" Read More');
  } else {
    $("#quote-text").text('"'+quoteResponse.contents.quote+'"');
  }
}
//o
function noRepeats() {
while (random === lastrandom) {
  random = Math.floor(Math.random() * newArr.length);
  }
  lastrandom = random;
}

function runAjax() {
  newArr = [];
  userInput = $("#search-bar").val();
  var queryURL = "https://www.googleapis.com/books/v1/volumes?q="+userInput;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    //assigning global variable bookResponse the value of repsonse so we can use response outside of this function.
    bookResponse = response;
    ratingFilter()
    $("#book-section").show();
    bookData()
    console.log(authorName);

  });
}
//o
function quotesAjax(){
  var queryURL = "https://quotes.rest/quote/random.json?api_key=c9kZNAbwJv_8tdUeQinJMQeF"
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) { 
    quoteResponse = response;
    shortenQuote()
    $("#quote-spinner").hide();
    $("#quote-author").text("-"+response.contents.author);
    $("#nyTimes").show();
  });
}

function topSellersAjax() {
  var queryURL = "https://api.nytimes.com/svc/books/v3/lists/current/Combined%20Print%20and%20E-Book%20Fiction.json?api-key=6ad84e249d054efeaefe1abb8f89df5b"
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    nyResponse = response;
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
//giving buy now button functionality
function buyNow(){
  $("#buyNowBtn").click(function() {
  window.open("http://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords="+titleName+authorName);
  });
}