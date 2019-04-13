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
              url: "https://deckofcardsapi.com/api/deck/new/draw/?count=1",
              dataType: "json",
              success: (data)=>{
                 console.log(data);
              },
              error: ()=>{
                      console.log('bad request');
          }
        })
    //Created a Discard Pile:
      $.ajax({
              type: "GET",
               url: "https://deckofcardsapi.com/api/deck/new/pile/discard_pile/add/?cards=AS,2S",
               dataType: "json",
               success: (data)=>{
                 console.log(data);
              },
              error: ()=>{
                      console.log('bad request');
          }
        })
    //Created a listing of discarded cards for checking win/lose condition.
        $.ajax({
                type: "GET",
                 url: "https://deckofcardsapi.com/api/deck/new/pile/discard_pile/list",
                 dataType: "json",
                 success: (data)=>{
                   console.log(data);
                },
                error: ()=>{
                        console.log('bad request');
            }
          })

});
