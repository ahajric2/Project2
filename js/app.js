/*
* Create a list that holds all of your cards
*/
//create array
const cardHolder = []
//set up moves counter
//loop through and get all card instances
const allCards = document.querySelectorAll('.card');
for (const card of allCards){
  cardHolder.push(card);
}
// console.log(cardHolder.length);


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

/*
* Display and Open the cards
*/
// display the card's symbol
function displayCard(card){
  //open card & show
  card.classList.add('open');
  //show card
  card.classList.add('show');
  return card;
}
/*
* Match Function, if two cards are alike, this sets match as a class
*/
function match(){
  for(card of openDeck){
    card.classList.add('match');
  }
}
/*
* Not Match Function, if two cards are not alike, remove open & show classes
*/
function unmatch(openDeck){
  setTimeout(function(){ for(card of openDeck){
    card.classList.remove('open');
    card.classList.remove('show');
  }}, 390);
}

/*
* Move Counter & stars
*/
function move_count(move_counter){
  //remove stars
  if(move_counter == 9)
  {
    const list = document.querySelector('.stars');
    list.removeChild(list.childNodes[1]);
  }
  if(move_counter == 16)
  {
    let list = document.querySelector('.stars');
    list.removeChild(list.childNodes[1]);
  }
  let moves  = document.querySelector('.moves');
  moves.textContent = move_counter;

}

/*
* Timer Function
*/
let sec = 0;
let min = 0;
let interval ="";
function timer(){
  interval = setInterval( function(){
    sec+=1;
    if (sec == 60){
      min +=1;
      sec=0;
    }
    document.getElementById("seconds").innerHTML= sec;
    document.getElementById("minutes").innerHTML= min;
  },1000);
}



//set start game equal to windowload / DOMContentLoaded
window.addEventListener('DOMContentLoaded',function(){
  startGame();
});
/*
* Place cards into list of open cards
*/
let openDeck = [];
let match_counter = 0;
let move_counter = 0;
function openCards(card){
  openDeck.push(card);
  if (openDeck.length == 2)
  {
    //check to see if two cards in array are equal
    if (openDeck[0].isEqualNode(openDeck[1]))
    {
      //set cards to open and show and add match class to classlist
      match(openDeck);
      openDeck = [];
      move_counter+=1;
      match_counter+=1;
      //start timer
      move_count(move_counter);
      if(match_counter == 8)
      {
        //modal function set to show
        modal();
      }
    }
    else {
      move_counter+=1;
      move_count(move_counter);
      unmatch(openDeck);
      openDeck = [];

    }
    if(move_counter==1)
    {
      timer();
    }
  }

}
/*
* Restart & Clear the board
*/
function restart(){
  document.querySelector(".restart").addEventListener('click', function(){
    startGame();
  });
}


/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/
//grab the element 'deck'
const deckOfCards = document.querySelector('.deck');



/*
* start of game & reset the board
*/
function startGame(array){
  //add addEventListenerfor restart funcationality
  restart();
  //take in array of cards
  const cards = shuffle(cardHolder);
  //reset all cards
  for(const card of cards){
    card.classList.remove('open');
    card.classList.remove('show');
    card.classList.remove('match');
    deckOfCards.appendChild(card);
  }
  //reset the deck
  openDeck = [];
  //reset match counter
  match_counter = 0;
  //reset move counter
  document.querySelector('.moves').textContent = 0;
  move_counter = 0;
  //reset timer
  sec = 0;
  min = 0;
  document.getElementById("seconds").innerHTML= sec;
  document.getElementById("minutes").innerHTML= min;
  clearInterval(interval);
  document.querySelector('.stars').innerHTML = '';
  const ul = document.querySelector('.stars');
  let li = document.createElement("li");
  //reset stars
  for(i = 1; i <= 3; i++)
  {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(""));
    li.setAttribute("class", "fa fa-star");
    ul.appendChild(li);
  }
}

/*
* Modal, creates pop up with winning information
*/
function modal(){
  //clear the modal and reset the Game
  document.getElementById("tryAgainButton").addEventListener('click', function(){
    startGame();
    modal.style.display = "None";
  });
  const minutes  =document.getElementById("minutes").textContent;
  const seconds  =document.getElementById("seconds").textContent;
  clearInterval(interval);
  document.getElementById("seconds").innerHTML= seconds;
  document.getElementById("minutes").innerHTML= minutes;
  //Modal// Get the modal
  const modal = document.getElementById("myModal");
  modal.style.display = "block";
  //get number of moves and append to paragraph element
  const moves_to_win = document.querySelector('.moves').textContent;
  const rating = document.querySelector('.stars').getElementsByTagName("li").length;
  document.querySelector('.finish_msg').textContent =`Congratulations! You won in ${minutes}:${seconds} seconds, with a star rating of ${rating}!`
}

//add event listeners to each card
for(const card of cardHolder){
  // console.log(card);
  //update move_counter
  //add event listener to each card
  card.addEventListener('click',function(){
    //display and show card function
    if(card.classList.contains('open')){
      //do nothing
    }
    else{
      displayCard(card);
      openCards(card);
    }
  });
}
