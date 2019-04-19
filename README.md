# king's-cup
Digital card game for the popular drinking game: King's Cup


Technologies used: 
1) HTML
2) CSS
3) Javascript and JQuery for DOM manipulation
4) AJAX call from Deck of Cards API: https://deckofcardsapi.com/

Approach:

  I decided to choose the creation of a card game based off two reasons: building games and game logic have been, for me, the most challenging and enjoyable assignments through GA so far, and the game I chose to model my app after is very fun to play but not everyone has a deck of cards lying around to play it. 
  I began by creating a wireframe for how I wanted my site to appear and how I wanted my cards to be laid out. This changed constantly but the end result was very satisfactory. The goal was to make all elements responsive and mobile ready. To achieve this my primary objective was to set all elements using 'em' measurements and percentages. This allowed them to maintain shape and style no matter what size the screen is set to.
  Once I had the groundwork set I then proceeded to set up the API call from the Deck of Cards API. In order to do this I would need to make two calls; one would generate and shuffle a new deck of 52 cards when making the request. The second call will be for creating the array of various cards drawn at random that I will build the rest of my logic off of. For this separate call I created a for loop that would iterate over the amount of cards listed in the array and push the data into an empty array that I established with global scale. I then created a 'clickCard' event attached to a 'create deck' button that would generate all 52 cards with their main image set as a cardback that I had found through Google images. These cards would then be appended to the gameTable div that I had created and would be the basis for playing the game. 
  Upon generating the 52 images I then created a global flipCard function that would take the cardback image and toggle on a separate class and image that would have the card show the appropriate face value. I tailored this to an $(event.currentTarget) as to make it only flip the clard that was clicked on versus all cards displayed. With this made I had the core of my game up and running.
  The next step was to create the card information/rules that the players would be able to check in order to become familiar with the rules designated to each card. In order to do this I created a separate event within the AJAX card array call and bound it to a 'check rules' button. Upon clicking the button, the the event utilizes a for loop to iterate through the available crds once more and binds their images to a new variable. This variable will be used in the carousel that I will eventually build. The design for the carousel will be modeled after the 'corgi carousel' exercise we performed but will use the images from the API call rather than through predefined images. A difficulty arose when trying to only display specific cards in the carousel as there is no need to list four copies of one card since they all share the same rule. To do this I set up 13 conditionals to pull cards Ace through King respectively based off of one of the values from the data array, their card 'code'. This would allow me to pull very specific cards versus multiple copies of the same value. With these conditionals in place I then appended the image associated with each card code in order to fill my carousel. 
  Since I pulled 13 cards specifically I needed to make sure that when clicking through the cards I would be able to loop through just those cards. In order for this to work I needed to adjust the number of images from the original 52 down to just thirteen by letting numOfImages = data.cards.length - 40. With this I know displayed the correct images I required for my carousel, albeit randomly since the deck is randomly generated each time. Upon doing this I then created a seperate 'rule' object that would be referenced to display the card rule when the card image is clicked on. When clicking on the button that will either proceed or reverse cards the previous rule will be removed and the new one displayed when clicked. This concluded the necessary logic for my game.
  After all the logic was finalized I then proceeded to add additional style and animations to the various elements of my app in order to make it more eye-catching and appealing. I dabbled with applying a win condition and a flip animation to the various cards but due to the random nature of the deck being generated each time it made it exceptionally difficult to have them operational in time.
  



Link to the live site: https://mattytamale.github.io/kings-cup/


Installation Instructions: 
-Click the link above then begin interacting with the game by either checking the rules or creating the cards. The reset button will clear the game table of all cards. When in the check rules modal, click on the various cards in order to see the rules associated with them. They will be in random order.

Unsolved Problems:
-Due to the deck and cards being randomly generated each time it made many features I would have liked to add be tremendous tasks on their own. The card flipping animation that I was working on would flip all of the cards 180 degrees but without the actual animation, just one moment it is facing you correctly then the next it is on the opposite site. The win condition will also be difficult as it will need to be storing which cards were picked when clicked on then checking those cards to see if all four kings were picked. I got pretty close, but instead had the win condition listed in the description within the Check Rules and King card rule.

Future Additions:
-Instead of doing a carousel for the application requirement I thought it would be a better idea to instead have it that when the user clicks on the card a second time it displays the rule associated with the card.
-Another implementation I would have liked would be to have the cards displayed in a circle as that is the traditional means in which they should be displayed.
