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
      $(event.currentTarget).toggleClass('gameCard').attr('src', card[cardId].image)
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
                  card.push(data.cards[i]);
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
            $checkRules.on('click', (event) => {
              for (let i = 0; i < data.cards.length; i++){
                const $cardInfo = $('<img>').addClass('cardInfo').attr('src', data.cards[i].image);
                let currentImgIndex = 0;
                let numOfImages = data.cards.length - 40;
                console.log(numOfImages);
                $('.next').on('click', () => {
                  //hide the current image:
                  $('.carousel-images').children().eq(currentImgIndex).hide();
                  //increment the currentImgIndex
                  if(currentImgIndex < numOfImages) {
                    currentImgIndex++;
                    console.log(currentImgIndex);
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
                if (data.cards[i].code === "AS") {
                  $('.carousel-images').append($cardInfo);
              } else if (data.cards[i].code === "2C") {
                $('.carousel-images').append($cardInfo);
              } else if (data.cards[i].code === "3D") {
                $('.carousel-images').append($cardInfo);
              } else if (data.cards[i].code === "4H") {
                $('.carousel-images').append($cardInfo);
              } else if (data.cards[i].code === "5S") {
                $('.carousel-images').append($cardInfo);
              } else if (data.cards[i].code === "6C") {
                $('.carousel-images').append($cardInfo);
              } else if (data.cards[i].code === "7D") {
                $('.carousel-images').append($cardInfo);
              } else if (data.cards[i].code === "8H") {
                $('.carousel-images').append($cardInfo);
              } else if (data.cards[i].code === "9S") {
                $('.carousel-images').append($cardInfo);
              } else if (data.cards[i].code === "0C") {
                $('.carousel-images').append($cardInfo);
              } else if (data.cards[i].code === "JD") {
                $('.carousel-images').append($cardInfo);
              } else if (data.cards[i].code === "QH") {
                $('.carousel-images').append($cardInfo);
              } else if (data.cards[i].code === "KS") {
                $('.carousel-images').append($cardInfo);
              }
              }
                 });
          },
              error: ()=>{
                      console.log('bad request');
          }
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
