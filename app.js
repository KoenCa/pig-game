/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer;

scores = [0, 0]; //Global scores per player
roundScore = 0; //Round score for a player
activePlayer = 0; //active player 0 = player 1 and 1 = player 2

//Hide the dice
document.querySelector('.dice').style.display = 'none';

//Use getElementById because it is faster
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-0').textContent = '0';

document.querySelector('.btn-roll').addEventListener('click', function () {

    //1. Random number
    var dice = Math.floor(Math.random() * 6) + 1; //Generate a random number between 1 and 6 for the dice images

    //2. Display the result
    var diceDOM = document.querySelector('.dice'); //Save the reference to the DOM element
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';

    //3. Update the round IF the rolled number was NOT a 1
    
});