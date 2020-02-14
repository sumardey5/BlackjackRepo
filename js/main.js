/*----- constants -----*/
let cards = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];
let flippedCards = [];
let dealerCards = [];  
let playerCards = []; 
let playerSplitCards = [];
let playerCardsVal = 0;
let playerHasAce = 0;
let dealerHasAce = 0;
let didSplit = false;
let dealerCardsVal = 0; 
let cardFlipped;
let cardsDealt = 0;
let totalMoney = 1000;
let bet = 0;
let playerSplitVal = 0;

/*----- cached element references -----*/
const pile1 = document.getElementById('pile-one');
const dealerPile = document.getElementById('dealer-pile');
const playerPile = document.getElementById('player-pile');
const startBtn = document.querySelector('#startGame');
let hitBtn = document.querySelector('#hitBtn');
let stayBtn = document.querySelector('#stayBtn');
let newMessage = document.querySelector('h2');


/*----- event listeners -----*/
startBtn.addEventListener('click', initialDeal);
hitBtn.addEventListener('click', playerHit);
stayBtn.addEventListener('click', playerStay);
document.querySelector('#doubleBtn').addEventListener('click',playerDouble);
document.querySelector('#oneBtn').addEventListener('click',renderBet);
document.querySelector('#fiveBtn').addEventListener('click',renderBet);
document.querySelector('#tenBtn').addEventListener('click',renderBet);
document.querySelector('#twoFiveBtn').addEventListener('click',renderBet);
document.querySelector('#fiftyBtn').addEventListener('click',renderBet);
document.querySelector('#hundredBtn').addEventListener('click',renderBet);


/*----- functions -----*/
function flipCard(pile, hide) {
    if (cards.length) {
    let rndIdx = Math.floor(Math.random() * cards.length);
    removedCard = cardFlipped;
    cardFlipped = cards.splice(rndIdx, 1);
    tmpCardVal = getCardVal(cardFlipped);
    if (pile === 'dealer') {
        dealerCardsVal += tmpCardVal
        if (tmpCardVal == 11) {
            dealerHasAce+=1;
        }
        dealerCards.push(cardFlipped[0])
    } else if (pile === 'player') {
        playerCardsVal += tmpCardVal;
        if (tmpCardVal == 11) { 
            playerHasAce+=1;
        }
        playerCards.push(cardFlipped[0])
    } else if (pile=='playerSplit') {
        if (tmpCardVal == 11) {
            playerSplitHasAce+=1;
        }
        playerSplitCards.push(cardFlipped[0]);
    }
    flippedCards.push(cardFlipped[0]);
    }
    if (hide != undefined && hide != '') {
        render(1);
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
    else if(tmpVal === 'A'){
        cardVal = 11;
    }

    return cardVal;
    //If there's only one thing after the if or else if statement then there is no need for brackets


}

function initialDeal() {
    document.getElementById('startGame').setAttribute('disabled', true);
    newMessage.textContent = ''; //QQ Ben on this
    dealerCards = []; //keeping track 
    playerCards = []; //keeping track
    playerSplitCards = []
    playerCardsVal = 0;
    dealerCardsVal = 0;
    didSplit = false;
    dealerHasAce = 0
    playerHasAce = 0 
    playerSplitVal = 0;
    cardsDealt = 0;
    flippedCards = [];
    cards = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];
    dealerPile.innerHTML = ''
    playerPile.innerHTML = ''
     for(var i = 0; i<2; i++) {
        dealerPile.innerHTML += '<div class="card large outline" id="card_'+cardsDealt+'"></div>'
        if (i == 1) {
            flipCard('dealer', 1);
            cardsDealt+=1;
            break;
        }
        flipCard('dealer');
        cardsDealt+=1;
    }

    for(var i = 0; i<2; i++) {
        playerPile.innerHTML += '<div class="card large outline" id="card_'+cardsDealt+'"></div>'
        flipCard('player')
        cardsDealt+=1

        if(cardsDealt === 2 && playerCardsVal === 21) {
            playerBlackJack();
        }
    }
    // console.log(getCardVal(playerCards[0]))
    if (getCardVal([playerCards[0]]) == getCardVal([playerCards[1]])){
        document.getElementById('splitBtn').removeAttribute('disabled')
        didSplit = true
        playerSplit()
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
    if(playerSplit == true){
        playerPile.innerHTML += '<div class="card large outline" id="card_'+cardsDealt+'"></div>';
        flipCard('playerSplit');
        cardsDealt+=1;
    }
    if(playerCardsVal < 21) {
        playerPile.innerHTML += '<div class="card large outline" id="card_'+cardsDealt+'"></div>';
        flipCard('player');
        cardsDealt+=1;
        console.log(playerCards+' '+playerCardsVal+' '+playerSplitVal);
        // dealerHit();
    }
    if (playerSplitCards > 21) {
        if (playerSplitHasAce > 0){
            playerSplitVal -= 10
            playerSplitHasAce -= 1
        } else {
    youLost = 1;
    console.log('split deck lost')
    revealCard = 0;
    checkForBust();
        }
    }

    else if(playerSplitVal === 21 && playerSplitVal == 2){
        playerBlackJack();
        // dealerHit();
    } 
    else if(playerSplitVal === 21) {
        dealerHit();
    }

        if (playerCardsVal > 21) {
            if (playerHasAce > 0){
                playerCardsVal -= 10
                playerHasAce -= 1
            } else {
        youLost = 1;
        revealCard = 0;
        checkForBust();
            }
        }

        else if(playerCardsVal === 21 && cardsDealt == 2){
            playerBlackJack();
            // dealerHit();
        } 
        else if(playerCardsVal === 21) {
            dealerHit();
        }

}

function checkForBust(){ 
    newMessage.textContent = "You Lost, please select START GAME to begin a new game";
}

function playerStay() {
    //this function works
    dealerHit()
}

function dealerHit() {
    document.getElementById('card_1').classList.replace('back-red', dealerCards[1]);

    if (dealerCardsVal > 17 && dealerCardsVal <= 21){console.log('Dealer Is Gucci for now');findWinner();}
    else if (dealerCardsVal >21){
        if (dealerHasAce>0){
            dealerCardsVal -= 10
            dealerHasAce -= 1
        }else {
        console.log('dealer busted')
        totalMoney += bet * 2;
        }
    }
    else{
        while (dealerCardsVal <= 17) {
        dealerPile.innerHTML += '<div class="card large outline" id="card_'+cardsDealt+'"></div>';
        flipCard('dealer');
        cardsDealt+=1;
        console.log(dealerCards+' '+dealerCardsVal);
        }
        if (dealerCardsVal <= 21){
        findWinner()
        } else {
            if (dealerHasAce>0){
                dealerCardsVal -= 10
                dealerHasAce -= 1
            } else{
            console.log('dealer busted')
            totalMoney += bet * 2;
            }
        }
    }
}

function playerSplit(){
    playerSplitCards[0] = playerCards[1];
    playerSplitVal = getCardVal(playerSplitCards[0]);
}

function playerDouble(){
    if ((totalMoney - bet)<0){console.log('You broke cant double');return;}
    totalMoney -= bet;
    bet *= 2;
    playerHit();
    dealerHit();
}

function findWinner(){
    if(playerCardsVal > dealerCardsVal && playerCardsVal <= 21){
        //Player win
        totalMoney += bet * 2;
        console.log('Player wins')
    }
    else if(dealerCardsVal > playerCardsVal && dealerCardsVal <= 21){
        //Dealer Wins
        console.log('Dealer Wins')
    }
    else if (dealerCardsVal == playerCardsVal){
        totalMoney += bet;
        console.log('Push')
    }

}

function playerBlackJack(){
    console.log('BLACK JACK')
    totalMoney += bet * 2.5;
    //IT WORKS
}

function renderBet(betCheck){
    if (document.getElementById('startGame').hasAttribute('disabled')){bet=0}
    if(betCheck.target.id === 'oneBtn' && totalMoney >= 1) {
        bet += 1;
        totalMoney -= 1;
    }   
    if(betCheck.target.id === 'fiveBtn' && totalMoney >= 5) {
        bet += 5;
        totalMoney -= 5;
    }if(betCheck.target.id === 'tenBtn' && totalMoney >= 10) {
        bet += 10;
        totalMoney -= 10;
    }if(betCheck.target.id === 'twoFiveBtn' && totalMoney >= 25) {
        bet += 25;
        totalMoney -= 25;
    }if(betCheck.target.id === 'fiftyBtn' && totalMoney >= 50) {
        bet += 50;
        totalMoney -= 50;
    }if(betCheck.target.id === 'hundredBtn' && totalMoney >= 100) {
        bet += 100;
        totalMoney -= 100;
    }
    if (totalMoney != 0 && bet > 0){
        document.getElementById('startGame').removeAttribute('disabled')
    }
    
    console.log(totalMoney);
    console.log(bet);


}