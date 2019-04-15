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

    const $resetGame = $('<button>').text('Reset Game').addClass('gameButton');
    $('.gameButtons').append($resetGame);

    const cards = [];

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
                // const $newCard = $('<img>').addClass('gameCard').attr('src', data.cards[i].image);
                // $('.gameTable').append($newCard);
                //     }
                cards.push(data.cards[i]);
                console.log(cards[0]);
                    const $newCard = $('<img>').addClass('gameCardBack').attr('src', 'https://www.atomsindustries.com/assets/images/items/asd1743/tallyho-back.png');
                    $('.gameTable').append($newCard);
                        }
                 // for (let i = 0; i < data.cards.length; i++){
                 //   const $newCard = $('<img>').attr('src', data.cards[i].image);
                 //   $clickCard.on('click',
                   // $('body').append($newCard);
               })
               $(event.target).on('click', (event) => {
                 $(event.target).changeClass('gameCard').attr('src', data.cards[i].image);
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

const $modal = $('#modal');
const $closeBtn = $('#close');

//Handlers
const openModal = () => {
  $modal.css('display', 'block');
}
const closeModal = () => {
  $modal.css('display', 'none');
}

//Listeners
$checkRules.on('click', openModal);

$closeBtn.on('click', closeModal);

//removes all existing cards from the gameTable.
$resetGame.on('click', (event) => {
  $('.gameCardBack').remove();
  $('.gameCard').remove();
})

});
