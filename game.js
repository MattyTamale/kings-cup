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

    //Check Rules button to display the rule for each card.
    const $checkRules = $('<button>').text('Check Rules').addClass('gameButton');
    $('.gameButtons').append($checkRules);

    //Reset Game button that will remove the current cards from the table.
    //Currently does not reshuffle the cards when they are removed.
    const $resetGame = $('<button>').text('Reset Game').addClass('gameButton');
    $('.gameButtons').append($resetGame);

    //An empty array for the card API data to be stored in for local use.
    const card = [];

    // The card flipping function that will activate when clicking on a single card. It will pull the data image that is linked to the 'data-id attribute' in the initial API call.
    const flipCard = () => {
      let cardId = $(event.currentTarget).attr('data-id');
      $(event.currentTarget).toggleClass('gameCard').attr('src', cards[cardId].image)
    }

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
                card.push(data.cards[i].code);
                card.push(data.cards[i].image)
                console.log(card[i]);
                const $newCard = $('<img>').addClass('gameCardBack');
                $newCard.attr('src', 'https://www.atomsindustries.com/assets/images/items/asd1743/tallyho-back.png');
                $newCard.attr('data-id', i);
                $newCard.on('click', flipCard);
                //save for later implementation:
                // $('.flipper').append($newCard);
                $('.gameTable').append($newCard);
                }
            });
          },
              error: ()=>{
                      console.log('bad request');
          }
        })


    const cardInfo = [];
   //API call for setting up the carousel.
    $.ajax({
            type: "GET",
            url: "https://deckofcardsapi.com/api/deck/new/?cards=AS,2C,3D,4H,5S,6C,7D,8H,9S,10C,JD,QH,KS",
            url: "https://deckofcardsapi.com/api/deck/new/draw/?count=13",
            dataType: "json",
            success: (data)=>{
              console.log(data);
              //,2C,3D,4H,5S,5C,6C,7D,8H,9S,0C,JD,QH,KS
         //Creates a for loop that appends every card image to the body, for now
          $checkRules.on('click', (event) => {
            for (let i = 0; i < data.cards.length; i++){
              cardInfo.push(data.cards[i])
              console.log(cardInfo[i]);
            }
               });
             },
                 error: ()=>{
                         console.log('bad request');
             }
           })



    //global variables:
  // const $images = $('<div>').addClass('carousel-images');
  // $('.carousel-container').append($images);
  // let currentImgIndex = 0;
  // let numOfImages = $('.carousel-images').children().length - 1;


        //event listeners:
        //next button:
          $('.next').on('click', () => {
            //hide the current image:
            $('.carousel-images').children().eq(currentImgIndex).hide();
            //increment the currentImgIndex
            if(currentImgIndex < numOfImages) {
              currentImgIndex++;
            } else {
              currentImgIndex = 0;
            }
            //show the next image:
            $('.carousel-images').children().eq(currentImgIndex).show();
          })

        //previous button:
        $('.previous').on('click', () => {
          //hide current image:
          $('.carousel-images').children().eq(currentImgIndex).hide();
          //decrement the currentImgIndex
          if(currentImgIndex > 0) {
            currentImgIndex--;
          } else {
            currentImgIndex = numOfImages;
          }
          //show the previous image:
          $('.carousel-images').children().eq(currentImgIndex).show();
        })

//Creating the Check Rules Modal; will eventually contain carousel.
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
