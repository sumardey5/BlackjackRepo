/*----- constants -----*/
let cards = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];
let flippedCards = [];
let dealerCards = [];  
let playerCards = []; 
let playerCardsVal = 0;
let dealerCardsVal = 0; 
let cardFlipped;
let cardsDealt = 0;
/*----- cached element references -----*/
const pile1 = document.getElementById('pile-one');
const dealerPile = document.getElementById('dealer-pile');
const playerPile = document.getElementById('player-pile');

const startBtn = document.querySelector('#startGame');
let hitBtn = document.querySelector('#hitBtn');
let newMessage = document.querySelector('h2');


/*----- event listeners -----*/
startBtn.addEventListener('click', initialDeal);
hitBtn.addEventListener('click', playerHit);

/*----- functions -----*/

function flipCard(pile, hide) {
    if (cards.length) {
    let rndIdx = Math.floor(Math.random() * cards.length);
    removedCard = cardFlipped;
    cardFlipped = cards.splice(rndIdx, 1);
    tmpCardVal = getCardVal(cardFlipped);
    if (pile === 'dealer') {
        dealerCardsVal += tmpCardVal
        dealerCards.push(cardFlipped[0])
    } else if (pile === 'player') {
        playerCardsVal += tmpCardVal
        playerCards.push(cardFlipped[0])
    }
    flippedCards.push(cardFlipped[0]);
    }
    if (hide != undefined && hide != '') {
        render(1)
    }
    else render();

    // if(hitBtn) {
    //     playerCardsVal += tmpCardVal
    //     playerCards.push(cardFlipped[0])
    // }
    // flippedCards.push(cardFlipped[0]);
}


function getCardVal(card) {
    tmpVal = card[0].slice(1);
    cardVal = 0;
    if(tmpVal === 'K' || tmpVal === 'Q' || tmpVal === 'J' || tmpVal === '10' )
        cardVal = 10;
    else if(tmpVal === '09') cardVal = 9;
    else if(tmpVal === '08') cardVal = 8;
    else if(tmpVal === '07') cardVal = 7;
    else if(tmpVal === '06') cardVal = 6;
    else if(tmpVal === '05') cardVal = 5;
    else if(tmpVal === '04') cardVal = 4;
    else if(tmpVal === '03') cardVal = 3;
    else if(tmpVal === '02') cardVal = 2;
    else if(tmpVal === 'A') cardVal = 1;

    return cardVal;
    //If there's only one thing after the if or else if statement then there is no need for brackets


}

function initialDeal() {
    newMessage.textContent = ''; //QQ Ben on this
    dealerCards = []; //keeping track 
    playerCards = []; //keeping track
    playerCardsVal = 0;
    dealerCardsVal = 0; 
    cardsDealt = 0;
    flippedCards = [];
    cards = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];
    dealerPile.innerHTML = ''
    playerPile.innerHTML = ''
     for(var i = 0; i<2; i++) {
        dealerPile.innerHTML += '<div class="card large outline" id="card_'+cardsDealt+'"></div>'
        if (i == 1) {
            flipCard('dealer', 1);
        }
        flipCard('dealer');
        cardsDealt+=1;
    }

    for(var i = 0; i<2; i++) {
        playerPile.innerHTML += '<div class="card large outline" id="card_'+cardsDealt+'"></div>'
        flipCard('player')
        cardsDealt+=1
    }
    console.log(dealerCards+' '+dealerCardsVal)
    console.log(playerCards+' '+playerCardsVal)
}

function render(hideCard) {
    if (hideCard == 1) {
    document.getElementById('card_'+cardsDealt).classList.replace('outline', 'back-red');
    } else {
    document.getElementById('card_'+cardsDealt).classList.replace('outline', cardFlipped);
    }



    // if (flippedCards.length === 1) {
    // } else {
        // document.getElementById('card_'+cardsDealt).classList.replace(removedCard, cardFlipped);
    // }
}

function playerHit() {
 
    if(playerCardsVal < 21) {
        playerPile.innerHTML += '<div class="card large outline" id="card_'+cardsDealt+'"></div>';
        flipCard('player');
        cardsDealt+=1;
        console.log(playerCards+' '+playerCardsVal);

        if (playerCardsVal > 21) {
        youLost = 1;
        checkForBust(youLost);
        console.log(checkForBust);
        } else if(playerCardsVal === 21) {
        console.log('you win');
        }
    }

}

function checkForBust(evt){ 
    newMessage.textContent = "You Lost, please select START GAME to begin a new game";
}

function playerStay(){}

function dealerHit(){}

function playerSplit(){}

function playerDouble(){}

function findWinner(){}

