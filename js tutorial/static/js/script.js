function ageInDays(){
    var birthYear = prompt('what year were you born?');
    var ageInDayss = (2023-birthYear) * 365
    console.log(ageInDayss);
    var h1 = document.createElement('h1');
    var textAnswer = document.createTextNode('You are ' + ageInDayss +' days old!');
    h1.setAttribute('id', 'ageInDays');
    h1.appendChild(textAnswer);

    document.getElementById('flex-box-result').appendChild(h1);
}

function reset(){
    document.getElementById('ageInDays').remove();
}


/*------------------------------------------------------------------------*/
 
function rpsGame(yourChoice){
    console.log(yourChoice);
    var humanChoice, botChoice;

    humanChoice = yourChoice.id;
    num = Math.floor(Math.random() * 3); //random num 0 or 1 or 2
    botChoice = randToRpsInt(num);
    console.log(botChoice);

    results = decideWinner(humanChoice,botChoice); // [0,1] human lost / bot won
    console.log(results)
    message = finalMessage(results);
    console.log(message);
    rpsFrontEnd(yourChoice.id,botChoice,message);
}

function randToRpsInt(num){
    if(num == 0){
        return 'rock'
    }
    if (num == 1) {
        return 'paper'
    }
    if (num == 2) {
        return 'scissors'
    }
}

function decideWinner(humanChoice, botChoice){
    var rpsDatabase = {
        'rock': {'scissors': 1, 'rock':0.5,'paper':0},
        'paper': { 'rock': 1, 'paper': 0.5, 'scissors': 0 },
        'scissors': { 'paper': 1, 'scissors': 0.5, 'rock': 0 },
    }

    var yourScore = rpsDatabase[humanChoice][botChoice];
    var botScore = 1 - yourScore;

    return [yourScore,botScore];
}

function finalMessage(results){
    var diff = results[0] - results[1];
   if (diff == -1){
        return {'message': 'You lost!', 'color': 'red'};
   }else if (diff == 0) {
       return { 'message': 'You tied!', 'color': 'yellow' };
   }else{
       return { 'message': 'You won!', 'color': 'green' };
   }
}

function rpsFrontEnd(yourChoice, botChoice, finalMessage){
    var imageDatabase = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissors': document.getElementById('scissors').src
    }

    //remove all images
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imageDatabase[yourChoice] +"' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(37,50,233,1)'>";
    botDiv.innerHTML = "<img src='" + imageDatabase[botChoice] + "' height=150 width=150 style='box-shadow: 0px 10px 50px rgba(243,38,23,1)'>";
    messageDiv.innerHTML = "<h1 style='color:" + finalMessage['color'] + "; font-size: 60px; padding: 30px;'>" + finalMessage['message'] +"</h1>"
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
    
}


/*------------------------------------------------------------------------*/

var all_buttons = document.getElementsByTagName('button');
var copyAllButtons = [];
for(let i=0;i<all_buttons.length;i++){
    copyAllButtons.push(all_buttons[i].classList[1]);
}

function buttonColorChange(thing){
    console.log(thing);
    if (thing.value == 'red'){
        buttonsRed();
    }else if (thing.value == 'green'){
        buttonsGreen();
    }else if (thing.value == 'reset'){
        buttonColorReset();
    }else if (thing.value == 'random'){
        randomColors();
    }
}

function buttonsRed(){
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-danger');
    }
}

function buttonsGreen() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonColorReset(){
    for (let i = 0; i < all_buttons.length; i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButtons[i]);
    }
}

function randomColors(){
    var choices = ['btn-primary','btn-danger','btn-success','btn-warning']
    num = Math.floor(Math.random() * 4);
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        num = Math.floor(Math.random() * 4);
        all_buttons[i].classList.add(choices[num]);
    }
}

/*------------------------------------------------------------------------*/

let blackjackGame = {
    'you': {'scoreSpan': '#your-blackjack-result', 'div': '#your-box', 'score': 0},
    'dealer': { 'scoreSpan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5','6','7','8','9','10','K','Q','J','A'],
    'cardsMap': {'2':2, '3':3, '4':4, '5':5, '6':6, '7':7, '8':8, '9':9, '10':10, 'K':10, 'Q':10, 'J':10, 'A': [1, 11]},
    'wins':0,
    'losses':0,
    'draws':0,
};

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitSound = new Audio('./static/sounds/swish.m4a')
const winSound = new Audio('./static/sounds/cash.mp3')
const loseSound = new Audio('./static/sounds/aww.mp3')

document.querySelector('#blackjack-hit-button').addEventListener('click',blackjackHit);
document.querySelector('#blackjack-stand-button').addEventListener('click', dealerLogic);
document.querySelector('#blackjack-deal-button').addEventListener('click', blackjackDeal);

function blackjackHit(){
    let card = randomCard();
    console.log(card);
    showCard(YOU,card);
    updateScore(YOU, card);
    showScore(YOU)

    document.querySelector('#blackjack-deal-button').disabled = 'true';
}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomIndex];
}


function showCard(activePlayer,card){
    if (activePlayer['score']<=21){
        let cardImage = document.createElement('img');
        cardImage.src = `./static/images/images/${card}.png`;
        /*cardImage.height = '150'*/
        document.querySelector(activePlayer['div']).appendChild(cardImage);
        hitSound.play();
    }
}

function blackjackDeal(){
    let yourImages = document.querySelector('#your-box').querySelectorAll('img'); 
    for (let i =0;i< yourImages.length; i++){
        yourImages[i].remove();
    }

    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    for (let i = 0; i < dealerImages.length; i++) {
        dealerImages[i].remove();
    }

    document.querySelector('#blackjack-result').textContent = 'Let s play!';
    document.querySelector('#blackjack-result').style.color = 'black';

    YOU['score'] = 0;
    DEALER['score'] = 0;
    document.querySelector(YOU['scoreSpan']).textContent = 0;
    document.querySelector(YOU['scoreSpan']).style.color = 'white';

    document.querySelector(DEALER['scoreSpan']).textContent = 0;
    document.querySelector(DEALER['scoreSpan']).style.color = 'white';

    document.querySelector('#blackjack-hit-button').removeAttribute('disabled');
    document.querySelector('#blackjack-stand-button').removeAttribute('disabled');
}

function updateScore(activePlayer, card){
    if (card === 'A'){

        // if adding 11 keeps me <=21 ,add 11 . else add 1
        if (activePlayer['score'] + blackjackGame['cardsMap'][card][1]<=21){
            activePlayer['score'] += blackjackGame['cardsMap'][card][1];
        }else{
            activePlayer['score'] += blackjackGame['cardsMap'][card][0]
        }
       
    }else{
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer){
    if (activePlayer['score'] <= 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    }else{
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function dealerLogic(){
    document.querySelector('#blackjack-hit-button').disabled = 'true'
    document.querySelector('#blackjack-stand-button').disabled = 'true'
    while( DEALER['score'] <16) {
        
        let card = randomCard();
        console.log(card);
        showCard(DEALER, card);
        updateScore(DEALER, card);
        showScore(DEALER);
        await sleep(1000);
    }

    if(DEALER['score'] > 15){ //dealer stands
        document.querySelector('#blackjack-deal-button').removeAttribute('disabled');
        showResult(computeWinner());
    }
    
}

function computeWinner(){
    let winner;

    if (YOU['score'] <= 21){
        //higher score or dealer busts
        if (YOU['score']> DEALER['score']  || (DEALER['score']>21)){
            winner = YOU;
            blackjackGame['wins']++;
        }else if (YOU['score'] < DEALER['score']){
            winner = DEALER;
            blackjackGame['losses']++;
        }else if (YOU['score'] == DEALER['score']){
            console.log('draw')
            winner = 'draw'
            blackjackGame['draws']++;
        }
    } else if (YOU['score'] > 21 && DEALER['score']<= 21){
        winner = DEALER;
        blackjackGame['losses']++;
    } else if (YOU['score'] > 21 && DEALER['score'] > 21) {
        console.log('draw')
        winner = 'draw'
        blackjackGame['draws']++;
    }

    console.log(winner);
    return winner;
}

function showResult(winner){
    let message, messageColor;
    if (winner == YOU){
        document.querySelector('#wins').textContent = blackjackGame['wins']
        message = 'You won!'
        messageColor = 'yellow'
        winSound.play()
    }else if(winner == DEALER){
        document.querySelector('#losses').textContent = blackjackGame['losses']
        message = 'You LOST!'
        messageColor = 'red'
        loseSound.play()
    }else{
        document.querySelector('#draws').textContent = blackjackGame['draws']
        message = 'You drew!'
        messageColor = 'black'
    }

    document.querySelector('#blackjack-result').textContent = message;
    document.querySelector('#blackjack-result').style.color = messageColor;
}

