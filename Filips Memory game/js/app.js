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

// Shuffle the cards
shuffle(icons);

/*
 * Click event
 */

// checks if its the first time clicked
let isFirstClick = true;

function click(card) {
    card.addEventListener("click", function() {

         /*
         * At the first click "isFirstClick" will be true and start the timer.
         * when this is done the "isFirstClick" will change to false,
         * so it doesn't start once more.
         */
        if (isFirstClick) {
            // Timer starts
            startTimer();
            // Changes isFirstClick to false
            isFirstClick = false;
        }

        const currentCard = this;
        const previousCard = openedCards[0];

        // Alreay 1 opened card before the click
        if (openedCards.length === 1) {

            card.classList.add("open", "show", "disable");
            openedCards.push(this);

            // Then Compares the 2 cards
            compare(currentCard, previousCard);


            // Don't have any open card yet

        } else {
            card.classList.add("open", "show", "disable");
            openedCards.push(this);
        }
    });
}

/*
 * Compare the 2 cards
 */
function compare(currentCard, previousCard) {
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
        // Ends the timer
        var endTime = document.getElementById('ENDTIME');
        var lastStars = document.getElementById('starRating');

        const lastTime = totalSeconds + 's';
        stopTimer();
        endTime.innerHTML = "Time:" + " " + lastTime;
        lastStars.innerHTML = "Stars" + starsContainer.innerHTML;
        popUp();
    };
}

/*
 * Moves functio
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

function rating() {
    if (moves < 10) {
        starsContainer.innerHTML = star + star + star;
    } else if (moves < 15) {
        starsContainer.innerHTML = star + star;
    } else {
        starsContainer.innerHTML = star;
    }
}


/*
 * Timer
 */
const timerContainer = document.querySelector(".timer");
let liveTimer,
    totalSeconds = 0;

// Adds the letter "s" after the seconds value.
timerContainer.innerHTML = totalSeconds + 's';

/*
 * We call starTimer to start our function,
 * This function starts when the user click on the first card.
 */
function startTimer() {
    liveTimer = setInterval(function() {
        // Increase the totalSeconds by 1
        totalSeconds++;
        // Update the HTML Container with the new time
        timerContainer.innerHTML = totalSeconds + 's';
    }, 1000);
}

/// Our timer do not stop until we call stopTimer

function stopTimer() {
    clearInterval(liveTimer);
}



/*
 * Restart Game function
 */
const restartButton = document.querySelector(".restart");

restartButton.addEventListener("click", function() {
    // delete all cards
    cardsContainer.innerHTML = "";
    //reset moves
    moves = 0;
    movesContainer.innerHTML = moves;
    // reset stars to 3
    starsContainer.innerHTML = star + star + star;
    // call shuffle function
    shuffle(icons);
    // call init to create new cards
    init();
    // Reset matchedCards
    matchedCards = [];
    // resets the timer to 0 and starts again at the first click
    stopTimer();
    isFirstClick = true;
    totalSeconds = 0;
    timerContainer.innerHTML = totalSeconds + "s";
});

/// start the game
init();




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




// Get the modal
var modal = document.getElementById('myModal');
// When the users done, the modal opens
popUp = function() {
    modal.style.display = "block";
}
// Play again button
function reLoad() {
    location.reload();
}
