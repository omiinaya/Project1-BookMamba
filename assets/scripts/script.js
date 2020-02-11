


//Omar's code starts here//
         
var responseTest = "";
//declaring a global variable of userInput that we can change and use from anywhere in the script.
var userInput = "";

         //works perfectly for random authors
         var queryURL = "http://quotes.rest/quote/random.json?&minlength=100&maxlength=200&api_key=c9kZNAbwJv_8tdUeQinJMQeF"
         //we bought a key, but aren't using it-----> api_key=c9kZNAbwJv_8tdUeQinJMQeF
     function quotesAjax(){
         $.ajax({
           url: queryURL,
           method: "GET"
         }).then(function(response) {
         
        console.log(response);

 //Omar's code ends here//

 //Keyla's code starts here// 

         //Putting the quotes inside the <p> tags/replacing the placeholder with actual content that entices users to read.
         $("#quote-author").text("-"+response.contents.author);
         $("#quote-text").text('"'+response.contents.quote+'"');
         });
        }
        
//Keyla's code ends here//
      
         
//Omar's code starts here//

         //declaring default value of testURL to be our URL based on titles.
         function runAjax() {
             userInput = $("#search-bar").val();
             var testURL = "https://www.googleapis.com/books/v1/volumes?q="+userInput;
             $.ajax({
             url: testURL,
             method: "GET"
             }).then(function(response) {
             console.log(response)
             responseTest = response;
  
  //Omar's code ends here//

  //Keyla's code starts here//

             //displaying book details
             console.log(response);
             var a = [Math.floor(Math.random()*responseTest.items.length)]
             if (responseTest.items[a].volumeInfo.averageRating==5){
              $("#bookTitle").html(responseTest.items[a].volumeInfo.title);
              $("#authorSpan").text(responseTest.items[a].volumeInfo.authors);
              $("#publishedDate").text(responseTest.items[a].volumeInfo.publishedDate);
              $("#rating").text(responseTest.items[a].volumeInfo.averageRating);
 
              //getting book cover image and description to display in details
              $("#bookCover").attr("src",responseTest.items[a].volumeInfo.imageLinks.thumbnail);
              $("#descriptionText").text(responseTest.items[a].volumeInfo.description);
              }
              else if (responseTest.items[a].volumeInfo.averageRating>=4){
               $("#bookTitle").html(responseTest.items[a].volumeInfo.title);
               $("#authorSpan").text(responseTest.items[a].volumeInfo.authors);
               $("#publishedDate").text(responseTest.items[a].volumeInfo.publishedDate);
               $("#rating").text(responseTest.items[a].volumeInfo.averageRating);
     
               //getting book cover image
               $("#bookCover").attr("src",responseTest.items[a].volumeInfo.imageLinks.thumbnail);
               
              //getting description to show bellow details section
               $("#descriptionText").text(responseTest.items[a].volumeInfo.description);
              }
             });
            }

            //creating function for next button to display next book using Omar's random variable (a)
        function nextBook() {
             console.log(responseTest);
             var a = [Math.floor(Math.random()*responseTest.items.length)]
             console.log(a);
             if (responseTest.items[a].volumeInfo.averageRating==5){
             $("#bookTitle").html(responseTest.items[a].volumeInfo.title);
             $("#authorSpan").text(responseTest.items[a].volumeInfo.authors);
             $("#publishedDate").text(responseTest.items[a].volumeInfo.publishedDate);
             $("#rating").text(responseTest.items[a].volumeInfo.averageRating);

             //getting book cover image and description to display in details
             $("#bookCover").attr("src",responseTest.items[a].volumeInfo.imageLinks.thumbnail);
             $("#descriptionText").text(responseTest.items[a].volumeInfo.description);
             }
             else if (responseTest.items[a].volumeInfo.averageRating>=4){
              $("#bookTitle").html(responseTest.items[a].volumeInfo.title);
              $("#authorSpan").text(responseTest.items[a].volumeInfo.authors);
              $("#publishedDate").text(responseTest.items[a].volumeInfo.publishedDate);
              $("#rating").text(responseTest.items[a].volumeInfo.averageRating);
    
              //getting book cover image
              $("#bookCover").attr("src",responseTest.items[a].volumeInfo.imageLinks.thumbnail);
              
             //getting description to show bellow details section
              $("#descriptionText").text(responseTest.items[a].volumeInfo.description);
             }
         }

            //creating a default book array to display (Dracula)
       function defaultDracula()
          {
          var testURL = "https://www.googleapis.com/books/v1/volumes?q=Dracula";
          $.ajax({
          url: testURL,
          method: "GET"
          }).then(function(response) {
          console.log(response)
          responseTest = response;
          
          //Putting the quotes inside the <p> tags/replacing the placeholder with actual content that entices users to read.
          console.log(response);
          var a = [Math.floor(Math.random()*responseTest.items.length)]

          if (response.items[a].volumeInfo.averageRating==5){
          $("#bookTitle").html(response.items[a].volumeInfo.title);
          $("#authorSpan").text(response.items[a].volumeInfo.authors);
          $("#publishedDate").text(response.items[a].volumeInfo.publishedDate);
          $("#rating").text(response.items[a].volumeInfo.averageRating);

          //getting book cover image
          $("#bookCover").attr("src",response.items[a].volumeInfo.imageLinks.thumbnail);
          
         //getting description to show bellow details section
          $("#descriptionText").text(response.items[a].volumeInfo.description);
          console.log(response.items[a].volumeInfo.averageRating);
        }
        else if (response.items[a].volumeInfo.averageRating>=4){
          $("#bookTitle").html(response.items[a].volumeInfo.title);
          $("#authorSpan").text(response.items[a].volumeInfo.authors);
          $("#publishedDate").text(response.items[a].volumeInfo.publishedDate);
          $("#rating").text(response.items[a].volumeInfo.averageRating);

          //getting book cover image
          $("#bookCover").attr("src",response.items[a].volumeInfo.imageLinks.thumbnail);
          
         //getting description to show bellow details section
          $("#descriptionText").text(response.items[a].volumeInfo.description);
        }

        
          });
        }

     function loadPage()
         {
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

    