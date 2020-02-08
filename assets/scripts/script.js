//Keyla's code starts here//

         //works perfectly for random authors
         var queryURL = "http://quotes.rest/quote/random.json?api_key=c9kZNAbwJv_8tdUeQinJMQeF"



         //Keyla's code ends here//
         
         
         //omars code starts here
         
         var responseTest = "";
         //declaring a global variable of userInput that we can change and use from anywhere in the script.
         var userInput = "";
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
             //$("#quote-author").text(response.contents.author);
             //$("#quote-text").text(response.contents.quote);
             $("#bookTitle").html(response.items[0].volumeInfo.title);
             //$("#bookDetails").text(response.)
             });
         }
         function testNext() {
             console.log(responseTest);
             var a = [Math.floor(Math.random()*responseTest.items.length)]

//keyla's code starts here
             console.log(responseTest.items[a].volumeInfo.title);
             console.log(responseTest.items[a].volumeInfo.author);
         }