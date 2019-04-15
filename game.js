//GAME LOGIC//

$(() => {

  //Getting Card API to generate and shuffle a new deck of cards.
  $.ajax({
           type: "GET",
           url: "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1",
           dataType: "json",
           success: (data)=>{
              console.log(data);
           },
           error: ()=>{
                   console.log('bad request');
       }
     })


  //Creating the various buttons that will interact with the game/provide the user with additional information.

    //Game Start Button: generates 52 cards.
    const $clickCard = $('<button>').text('Create Cards').addClass('gameButton');
    $('.gameButtons').append($clickCard);

    const $checkRules = $('<button>').text('Check Rules').addClass('gameButton');
    $('.gameButtons').append($checkRules);

    const $resetGame = $('<button>').text('Restart Game').addClass('gameButton');
    $('.gameButtons').append($resetGame);





  //Drawing a single card at random from the deck of cards.
     $.ajax({
              type: "GET",
              url: "https://deckofcardsapi.com/api/deck/new/draw/?count=52",
              dataType: "json",
              success: (data)=>{
                 console.log(data);
//Creates a for loop that appends every card image to the body, for now
            $clickCard.on('click', (event) => {
              for (let i = 0; i < data.cards.length; i++){
                const $newCard = $('<img>').addClass('gameCard').attr('src', data.cards[i].image);
                $('.gameTable').append($newCard);
                    }
                 // for (let i = 0; i < data.cards.length; i++){
                 //   const $newCard = $('<img>').attr('src', data.cards[i].image);
                 //   $clickCard.on('click',
                   // $('body').append($newCard);
               })
              },
              error: ()=>{
                      console.log('bad request');
          }
        })
    //Created a Discard Pile:
      // $.ajax({
      //         type: "GET",
      //          url: "https://deckofcardsapi.com/api/deck/new/pile/discard_pile/add/?cards=AS,2S",
      //          dataType: "json",
      //          success: (data)=>{
      //            console.log(data);
      //         },
      //         error: ()=>{
      //                 console.log('bad request');
      //     }
      //   })
    //Created a listing of discarded cards for checking win/lose condition.
        // $.ajax({
        //         type: "GET",
        //          url: "https://deckofcardsapi.com/api/deck/new/pile/discard_pile/list",
        //          dataType: "json",
        //          success: (data)=>{
        //            console.log(data);
        //         },
        //         error: ()=>{
        //                 console.log('bad request');
        //     }
        //   })


  // When the user scrolls the page, execute myFunction
    window.addEventListener('scroll', (event) => {
      myFunction();
    })

    // Get the navbar
    var navbar = document.getElementById("gameButtons");

    // Get the offset position of the navbar
    var sticky = navbar.offsetTop;

    // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
    function myFunction() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
      } else {
        navbar.classList.remove("sticky");
      }
    }

});
