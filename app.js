/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gamePlaying, previousRollScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {
    // Check if game is still being played 
    if (gamePlaying) {

        // Random number
        var firstDice = Math.floor(Math.random() * 6) + 1; //Generate a random number between 1 and 6 for the dice images
        var secondDice = Math.floor(Math.random() * 6) + 1;

        // Display the result
        var firstDiceDom = document.querySelector('.dice'); //Save the reference to the DOM element
        firstDiceDom.style.display = 'block';
        firstDiceDom.src = 'dice-' + firstDice + '.png';

        var secondDiceDom = document.querySelector('.secondDice'); //Save the reference to the DOM element
        secondDiceDom.style.display = 'block';
        secondDiceDom.src = 'dice-' + secondDice + '.png';

        // Update the round score IF the rolled number was NOT a 1
        if (firstDice !== 1 && secondDice !== 1) {
            if (previousRollScore === 6 && firstDice === 6) { // IF Two 6 in a row
                // Reset ENTIRE score and next player's turn
                scores[activePlayer] = 0;
                document.getElementById('score-' + activePlayer).textContent = '0';
                nextPlayer();
            } else {
                //Add score
                roundScore += firstDice + secondDice;
                document.querySelector('#current-' + activePlayer).textContent = roundScore;

                //Previous roll
                previousRollScore = firstDice;
            }
        } else {
            nextPlayer();
        }
    }
});

//Add the current score to the global score
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // Add current score to global score
        scores[activePlayer] += roundScore;

        // Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // Get the winning score from the input field
        var winningScore = document.getElementById('winning-score').value;

        // Check if player won the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            hideDices();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false; // The game is over, the user has to click the new game button
        } else {
            //next player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer() {
    //Next player
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active'); //Current player is not active anymore
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //Ternary operator to set the next player
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active'); //Next player becomes active

    //Reset roundscores
    roundScore = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //Make dice hidden so next player has clean start
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.secondDice').style.display = 'none';

    //Reset previous roll
    previousRollScore = 0;
}

function init() {
    scores = [0, 0]; //Global scores per player
    roundScore = 0; //Round score for a player
    activePlayer = 0; //active player 0 = player 1 and 1 = player 2
    gamePlaying = true; //Game is being played
    previousRollScore = 0;

    //Hide the dices
    hideDices();

    //Set all DOM to beginning state
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

function hideDices() {
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.secondDice').style.display = 'none';
}

