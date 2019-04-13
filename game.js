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
  //Drawing a single card at random from the deck of cards.
     $.ajax({
              type: "GET",
              url: "https://deckofcardsapi.com/api/deck/new/draw/?count=52",
              dataType: "json",
              success: (data)=>{
                 console.log(data);
//Creates a for loop that appends every card image to the body, for now
                 for (let i = 0; i < data.cards.length; i++){
                   const $newCard = $('<img>').attr('src', data.cards[i].image);
                   $('body').append($newCard);
               }
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

});
