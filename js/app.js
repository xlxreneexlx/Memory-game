/*
 * Create a list that holds all of your cards
 */
const deck = document.querySelector('.deck');
let toggledCards = [];
let moves = 0;
let clockOff = true;
let time = 0;
let clockId;
let matched = 0;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

deck.addEventListener('click', event => {
	const clickTarget = event.target;

	if (isClickValid(clickTarget)) {
		if (clockOff) {
			startClock();
			clockOff = false;
		}
	
		toggleCard(clickTarget);
		addToggleCard(clickTarget);

	if (toggledCards.length === 2) {
			addMove();
			checkForMatch(clickTarget);
			checkScore();
		}
	}
})

function toggleCard(card) {
		card.classList.toggle('open');
		card.classList.toggle('show');
}

function isClickValid(clickTarget) {
	return (clickTarget.classList.contains('card') &&
			!clickTarget.classList.contains('match') &&
			toggledCards.length < 2 &&
			!toggledCards.includes(clickTarget));
}

function addToggleCard(clickTarget) {
	toggledCards.push(clickTarget);
	console.log(toggledCards);
}

function checkForMatch() {
   if (
     toggledCards[0].firstElementChild.className ===
     toggledCards[1].firstElementChild.className
   ) {
     toggledCards[0].classList.toggle("match");
     toggledCards[1].classList.toggle("match");
     toggledCards = [];
     matched++;
         if (matched === 8) {
     		checkWin();
     	}
      }
    else {
     setTimeout(() => {
     	toggleCard(toggledCards[0]);
     	toggleCard(toggledCards[1]);
     	toggledCards = [];
   		}, 1000);
   	}
}

function shuffleDeck() {
	const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
	const shuffledCards = shuffle(cardsToShuffle);
	for (card of shuffledCards) {
		deck.appendChild(card);
	}
}
shuffleDeck();

function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;
	console.log(moves);
}

function checkScore() {
	if (moves === 20 || moves === 25) {
		hideStar();
	}
}


function hideStar() {
	const starList = document.querySelectorAll('.stars li');
	for (star of starList) {
		if (star.style.display != 'none') {
			star.style.display = 'none';
			break;
		}
	}
}

function startClock() {
		clockId = setInterval(() => {
		time++;
		displayTime();
	}, 1000);
}

function displayTime() {
	const clock = document.querySelector('.clock');
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	if (seconds < 10) {
		clock.innerHTML = `${minutes}:0${seconds}`;
	} else {
		clock.innerHTML = `${minutes}:${seconds}`;
	}
}

function stopClock() {
	clearInterval(clockId);
}

function getStars() {
	stars = document.querySelectorAll('.stars li');
	starCount = 0;
	for (star of stars) {
		if (star.style.display != 'none') {
			starCount++;
		}
	}
return starCount;
}

function toggleModal() {
	const modal = document.querySelector('.modal__background');
	modal.classList.toggle('hide');
}

function writeModalStats() {
	const timeStat = document.querySelector('.modal__time');
	const clockTime = document.querySelector('.clock').innerHTML;
	const movesStat = document.querySelector('.modal__moves');
	const starsStat = document.querySelector('.modal__stars');
	const stars = getStars();

	timeStat.innerHTML = `Time = ${clockTime}`;
	movesStat.innerHTML = `Moves = ${moves}`;
	starsStat.innerHTML = `Stars = ${stars}`;
}


document.querySelector('.modal__cancel').addEventListener('click', toggleModal);

document.querySelector('.modal__replay').addEventListener('click', replayGame);

document.querySelector('.modal__replay').addEventListener('click', resetGame);

document.querySelector('.restart').addEventListener('click', resetGame);

function resetGame() {
	resetClockAndTime();
	resetMoves();
	resetStars();
    toggledCards = [];
    shuffleDeck();
    matched = 0;
}

function replayGame() {
	resetGame();
	toggleModal();
	resetCards();
	resetStars();
	resetMoves();
}

function resetCards() {
	const cards = document.querySelectorAll('.deck li');
	for (let card of cards) {
		card.className = 'card';
	}
}

function resetClockAndTime() {
	stopClock();
	clockOff = true;
	time = 0;
	displayTime();
}

function resetMoves() {
	moves = 0;
	document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
	stars = 0;
	const starList = document.querySelectorAll('.stars li');
	for (star of starList) {
		star.style.display = 'inline';
	}
}

function checkWin() {
    gameOver();
};

function gameOver() {
	stopClock();
	writeModalStats();
	toggleModal();
}




/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */



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
