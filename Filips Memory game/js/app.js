/*
 * Created a list that holds all cards/"icons"
 */
const icons = ["fa fa-diamond", "fa fa-diamond", "fa fa-paper-plane-o",
    "fa fa-paper-plane-o", "fa fa-anchor", "fa fa-anchor", "fa fa-bolt",
    "fa fa-bolt", "fa fa-cube", "fa fa-cube", "fa fa-leaf",
    "fa fa-leaf", "fa fa-bicycle", "fa fa-bicycle", "fa fa-bomb", "fa fa-bomb"
]

const cardsContainer = document.querySelector(".deck");

let openedCards = [];
let matchedCards = [];


/*
* initialize the game
*/

function init() {
  for (let i = 0; i < icons.length; i++) {
      const card = document.createElement("li");
      card.classList.add("card");
      card.innerHTML = `<i class= "${icons[i]}"> </i>`;
      cardsContainer.appendChild(card);

      // Add click event to each card
      click(card);
  }
}


/*
* Click event
*/
function click(card) {
  card.addEventListener("click", function() {

      const currentCard = this;
      const previousCard = openedCards[0];

      // Alreay 1 opened card before the click
      if (openedCards.length === 1) {

          card.classList.add("open", "show", "disable");
          openedCards.push(this);

          // Then Compares the 2 cards
          compare (currentCard, previousCard);

      /*
      * Don't have any open card yet
      */
    }else {
          card.classList.add("open", "show", "disable");
          openedCards.push(this);
      }
  });}


/*
* Compare the 2 cards
*/
function compare (currentCard, previousCard) {
  if (currentCard.innerHTML === previousCard.innerHTML) {

      /// The card Matched
      currentCard.classList.add("match");
      previousCard.classList.add("match");

      matchedCards.push(currentCard, previousCard);

      openedCards = []; //Makes the the card array empty again.

      isOver(); // Checks if all cards have been matched.

  } else {
      /*
      * The card didn't match
      */
      setTimeout(function() { // Delayes the function
          currentCard.classList.remove("open", "show", "disable");
          previousCard.classList.remove("open", "show", "disable");
      }, 600);

      openedCards = []; //Makes the the card array empty again.
    }

    /// add new move
    addMove();
}



 /*
 * Check if game is over
 */
function isOver() {
    if (matchedCards.length === icons.length) {
        alert("GAME OVER");
    }
}

/*
* Moves function
*/
const movesContainer = document.querySelector(".moves");
let moves = 0;
function addMove() {
     moves++;
movesContainer.innerHTML = moves;

// set the rating
rating();
}


/*
* Stars rating
*/

const starsContainer = document.querySelector(".stars");
const star = `<li><i class="fa fa-star"></i></li>`;
starsContainer.innerHTML = star + star + star;
function rating () {
  if(moves < 10) {
    starsContainer.innerHTML = star + star + star;
  } else if(moves < 15) {
    starsContainer.innerHTML = star + star;
  } else {
    starsContainer.innerHTML = star;
  } }


/*
* Restart Game function
*/
 const restartButton = document.querySelector(".restart");

 restartButton.addEventListener("click", function (){
 // delete all cards
 cardsContainer.innerHTML = "";
 //reset moves
 moves = 0;
 movesContainer.innerHTML = moves;
 // reset stars to 3
 starsContainer.innerHTML = star + star + star;

 // call init to create new cards
 init();
 // Reset matchedCards
 matchedCards = [];
 });


/// start the game
init();















/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
