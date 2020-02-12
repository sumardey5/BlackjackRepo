/*----- constants -----*/
const cards = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];
let flippedCards = [];
let cardFlipped;
/*----- cached element references -----*/
const pile1 = document.getElementById('pile-one');
const pile2 = document.getElementById('pile-two');
const pile3 = document.getElementById('pile-three');
const pile4 = document.getElementById('pile-four');
const pile5 = document.getElementById('pile-five');

const btn = document.querySelector('button');
/*----- event listeners -----*/
btn.addEventListener('click', flipCard);
document.querySelector('#resetGame').addEventListener('click', reset);

/*----- functions -----*/
function flipCard() {
    if (cards.length) {
    let rndIdx = Math.floor(Math.random() * cards.length);
    removedCard = cardFlipped;
    cardFlipped = cards.splice(rndIdx, 1);
    flippedCards.push(cardFlipped[0]);
    }
    render();
}

function reset() {
    render();
}

function render() {


    if (flippedCards.length === 1) {
        pile2.classList.replace('outline', cardFlipped);
        pile3.classList.replace('outline', cardFlipped);
        pile4.classList.replace('outline', cardFlipped);
        pile5.classList.replace('outline', cardFlipped);
    } else {
        pile2.classList.replace(removedCard, cardFlipped);
    }
    if (cards.length === 0) {
        pile1.classList.replace('back-red', 'outline');
    }
    if (cards.length === 26) {
        pile1.classList.remove('shadow');
    }
    if (flippedCards.length === 26) {
        pile2.classList.add('shadow');
    }
}