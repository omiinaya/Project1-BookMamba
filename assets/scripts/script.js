


//omars code starts here
         
var responseTest = "";
//declaring a global variable of userInput that we can change and use from anywhere in the script.
var userInput = "";


//Keyla's code starts here//

         //works perfectly for random authors
         var queryURL = "http://quotes.rest/quote/random.json?api_key=c9kZNAbwJv_8tdUeQinJMQeF"
         //we bought a key, but aren't using it-----> api_key=c9kZNAbwJv_8tdUeQinJMQeF
         function quotesAjax(){
         $.ajax({
           url: queryURL,
           method: "GET"
         }).then(function(response) {
         
         console.log(response);
         //Putting the quotes inside the <p> tags/replacing the placeholder with actual content that entices users to read.
         $("#quote-author").text("-"+response.contents.author);
         $("#quote-text").text('"'+response.contents.quote+'"');
         });
        }
//Keyla's code ends here//
         
         
         
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
             //Putting the quotes inside the <p> tags/replacing the placeholder with actual content that entices users to read.
             console.log(response);
             $("#bookTitle").html(response.items[0].volumeInfo.title);
             $("#authorSpan").text(response.items[0].volumeInfo.authors);
             $("#publishedDate").text(response.items[0].volumeInfo.publishedDate);
             $("#rating").text(response.items[0].volumeInfo.averageRating);

             //getting book cover image
             $("#bookCover").attr("src",response.items[0].volumeInfo.imageLinks.thumbnail);

             });
            }

            //creating function for next button to display next book using Omar's random variable (a)
        function nextBook() {
             console.log(responseTest);
             var a = [Math.floor(Math.random()*responseTest.items.length)]
             $("#bookTitle").html(responseTest.items[a].volumeInfo.title);
             $("#authorSpan").text(responseTest.items[a].volumeInfo.authors);
             $("#publishedDate").text(responseTest.items[a].volumeInfo.publishedDate);
             $("#rating").text(responseTest.items[a].volumeInfo.averageRating);

             //getting book cover image and description to display in details
             $("#bookCover").attr("src",responseTest.items[a].volumeInfo.imageLinks.thumbnail);
             $("#descriptionText").text(responseTest.items[a].volumeInfo.description);

         }


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
          $("#bookTitle").html(response.items[a].volumeInfo.title);
          $("#authorSpan").text(response.items[a].volumeInfo.authors);
          $("#publishedDate").text(response.items[a].volumeInfo.publishedDate);
          $("#rating").text(response.items[a].volumeInfo.averageRating);

          //getting book cover image
          $("#bookCover").attr("src",response.items[a].volumeInfo.imageLinks.thumbnail);
          
         //getting description to show bellow details section
          $("#descriptionText").text(response.items[a].volumeInfo.description);


          });
        }

         function loadPage()
         {
          defaultDracula()
          quotesAjax()
         }
//keyla's code starts here

    