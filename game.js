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

    //An object of all of the listed card rules. To be drawn on later.
    const cardRules = {
      ace:'Snake Eyes: If you make eye contact with the person that drew the card then you must drink. This will last until a new person draws an Ace',
      two:"2 is You: Choose someone to take a drink",
      three:"3 is Me: Self-explanatory, take a drink champ",
      four:"4 is Doors: Run and touch the nearest door; the last person to touch one must drink. Must choose a new door each time a 4 is drawn.",
      five:"5 is Drive: Thumbs up! If someone points to you and says 'Vroom' then you can do one of two things: you can say 'Vroom' and point to the person next to you or say 'Errr!' and point back to the person that 'Vroom-ed' to you. This will continue until someone messes up the order.",
      six:"Gentlemen, take a drink.",
      seven:"7 is Heaven: Raise both your hands, the last person to do so must take a drink.",
      eight:"8 is Mate: Pick a person; they are now your drinking mate and must drink every time you do, but not vice versa.",
      nine:"9 is Rhyme: Pick a word, and the person next to you must say a word that rhymes with yours. The first person to mess up or take too long to think of a word must drink. 'Orange' is forbidden.",
      ten:"10 is Categories: Pick a category of things. The person next to you must name something from that category. If you cannot think of an item or take too long to answer then you must drink.",
      jack:"Jack is Make a Rule: You must think of, and make a rule that must be followed for the rest of the game. Players who violate the rule must drink. Further Jack rules will be stacked on top of yours.",
      queen:"Queen is Question Master: The player who pulled the Queen is now the question master. Anytime another player answers a question that the question master asks must drink. This will remain until another player draws a Queen and becomes the question master.",
      king:"King: You are one step closer to finishing the game. If you pull a King you must pour as much of your current drink into an empty cup as you like. This will occur each time a king is drawn. Once the fourth King is drawn, the player who revealed it must drink what is in the King's Cup."
    };

    const $rule = $('<h5>');

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
                let currentImage = 0;
                let numOfImages = data.cards.length - 40;
                console.log(numOfImages);
                //Carousel functionality expanded upon from exercise done in class.
                $('.next').on('click', () => {
                  $rule.remove();
                  //hide the current image:
                  $('.carousel-images').children().eq(currentImage).hide();
                  //increment the currentImgIndex
                  if(currentImage < numOfImages) {
                    currentImage++;
                  } else {
                    currentImage = 0;
                  }
                  //show the next image:
                  $('.carousel-images').children().eq(currentImage).show();
                })

              //previous button:
              $('.previous').on('click', () => {
                $rule.remove();
                //takes the initial index image and hides it:
                $('.carousel-images').children().eq(currentImage).hide();
                //then decrements the current img
                if(currentImage > 0) {
                  currentImage--;
                } else {
                  currentImage = numOfImages;
                }
                //show the previous image:
                $('.carousel-images').children().eq(currentImage).show();
              })
                if (data.cards[i].code === "AS") {
                  $('.carousel-images').append($cardInfo);
                  $cardInfo.on('click', (event) => {
                    $rule.text(cardRules.ace);
                    $('.carousel-images').append($rule);
                  })
              } else if (data.cards[i].code === "2C") {
                $('.carousel-images').append($cardInfo);
                $cardInfo.on('click', (event) => {
                  $rule.text(cardRules.two);
                  $('.carousel-images').append($rule);
                })
              } else if (data.cards[i].code === "3D") {
                $('.carousel-images').append($cardInfo);
                $cardInfo.on('click', (event) => {
                  $rule.text(cardRules.three);
                  $('.carousel-images').append($rule);
                })
              } else if (data.cards[i].code === "4H") {
                $('.carousel-images').append($cardInfo);
                $cardInfo.on('click', (event) => {
                  $rule.text(cardRules.four);
                  $('.carousel-images').append($rule);
                })
              } else if (data.cards[i].code === "5S") {
                $('.carousel-images').append($cardInfo);
                $cardInfo.on('click', (event) => {
                  $rule.text(cardRules.five);
                  $('.carousel-images').append($rule);
                })
              } else if (data.cards[i].code === "6C") {
                $('.carousel-images').append($cardInfo);
                $cardInfo.on('click', (event) => {
                  $rule.text(cardRules.six);
                  $('.carousel-images').append($rule);
                })
              } else if (data.cards[i].code === "7D") {
                $('.carousel-images').append($cardInfo);
                $cardInfo.on('click', (event) => {
                  $rule.text(cardRules.seven);
                  $('.carousel-images').append($rule);
                })
              } else if (data.cards[i].code === "8H") {
                $('.carousel-images').append($cardInfo);
                $cardInfo.on('click', (event) => {
                  $rule.text(cardRules.eight);
                  $('.carousel-images').append($rule);
                })
              } else if (data.cards[i].code === "9S") {
                $('.carousel-images').append($cardInfo);
                $cardInfo.on('click', (event) => {
                  $rule.text(cardRules.nine);
                  $('.carousel-images').append($rule);
                })
              } else if (data.cards[i].code === "0C") {
                $('.carousel-images').append($cardInfo);
                $cardInfo.on('click', (event) => {
                  $rule.text(cardRules.ten);
                  $('.carousel-images').append($rule);
                })
              } else if (data.cards[i].code === "JD") {
                $('.carousel-images').append($cardInfo);
                $cardInfo.on('click', (event) => {
                  $rule.text(cardRules.jack);
                  $('.carousel-images').append($rule);
                })
              } else if (data.cards[i].code === "QH") {
                $('.carousel-images').append($cardInfo);
                $cardInfo.on('click', (event) => {
                  $rule.text(cardRules.queen);
                  $('.carousel-images').append($rule);
                })
              } else if (data.cards[i].code === "KS") {
                $('.carousel-images').append($cardInfo);
                $cardInfo.on('click', (event) => {
                  $rule.text(cardRules.king);
                  $('.carousel-images').append($rule);
                })
              }
              }
                 });
          },
              error: ()=>{
                      console.log('bad request');
          }
        })


//Creating the Check Rules Modal; will eventually contain carousel.
//Modal outline was used from the modal exercise performed in class.
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

//removes all existing cards from the gameTable but does not reshuffle the deck.
// $resetGame.on('click', (event) => {
//   $('.gameCardBack').remove();
//   $('.gameCard').remove();
// })

});
