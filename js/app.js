// 2.1.1 Created grid
const grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

$(() => {

  // ##### VARIABLES & DOM ELEMENTS #####

  // Player Position variables
  let playerOneCurrentIndex = 90; // player one start postion
  let playerTwoCurrentIndex = 99; // player two start position
  const currentIndexes = [playerOneCurrentIndex, playerTwoCurrentIndex];
  const previousIndexes = [playerOneCurrentIndex, playerTwoCurrentIndex];

  // Cell class variables
  let $playerOnePreviousCell;
  let $playerOneCurrentCell = $($('.map').children()[currentIndexes[0]]);
  let $playerTwoPreviousCell;
  let $playerTwoCurrentCell;
  const playerCells = [[$playerOnePreviousCell, $playerOneCurrentCell], [$playerTwoPreviousCell, $playerTwoCurrentCell]];

  // Continents choice
  let formInput =0;

  // Question global variables
  let randomCities = [];
  let clue = '';
  let underscoreArray = [];

  // Answer verification variables
  let correctAnswer;
  let correctAnswerArray;
  let randomCellPosition;
  let playerOneLetterIndex = 0;
  let playerTwoLetterIndex = 0;
  const playerLetterIndexes = [playerOneLetterIndex, playerTwoLetterIndex];

  // PlayerAnswer global variables
  const playerOneInputtedAnswer = [];
  const playerTwoInputtedAnswer = [];
  const $playerOneAnswerDisplay = $('#player-one-answer');
  const $playerTwoAnswerDisplay = $('#player-two-answer');
  const playerAnswers = [[playerOneInputtedAnswer,$playerOneAnswerDisplay], [playerTwoInputtedAnswer,$playerTwoAnswerDisplay]];

  // PlayerScore global variables
  const $playerOneScoreDisplay = $('#player-one-score');
  const $playerTwoScoreDisplay = $('#player-two-score');
  const playerScores = [[0, $playerOneScoreDisplay], [0, $playerTwoScoreDisplay]];
  $playerOneScoreDisplay.text('Player 1 Score: 0');
  $playerTwoScoreDisplay.text('Player 2 Score: 0');

  // PlayerWonFlights global array
  const playersWonFlights = [[], []];
  const playersLostFlights = [[]];

  // PlayerFeedback global array
  const $playerOneFeedbackDisplay = $('#player-one-feedback');
  const $playerTwoFeedbackDisplay = $('#player-two-feedback');
  let playerOneFeedback = 'Start moving your player!';
  let playerTwoFeedback = 'Start moving your player!';
  const playerFeedback = [[playerOneFeedback, $playerOneFeedbackDisplay], [playerTwoFeedback, $playerTwoFeedbackDisplay]];

  // Player maps/grids
  const $playerOneMap = $('.map');
  const $playerTwoMap = $(document.getElementsByClassName('map')[1]);
  const playerMaps = [$playerOneMap, $playerTwoMap];
  const $playerGrids = $('.player-grids');

  // Timer variables
  let timeleft = 30;
  const $timer = $('#timer');
  $timer.text('30');
  let downloadTimer;

  // Screen DOM Elements
  const $displayQuestion = $('#display-question');
  const $instructional = $('#instructional-info');
  const $mainGame = $('#main-game');
  const $endScreen = $('#end-screen');
  const $endMessage = $('#end-message');
  const audio = document.querySelector('#audio');
  const endImage = document.querySelector('#end-image');

  // SOUNDS
  const playerSoundsArray = [['./sounds/mj_ohhh.mp3','./sounds/mj_hee_hee.mp3', './sounds/mj_shamone.mp3' ],
  ['./sounds/lj_okay.mp3', './sounds/lj_yeah.mp3', './sounds/lj_what.mp3'],
  ['./sounds/jd_leaving_on_a_plane.mp3','./sounds/dp_around.mp3', './sounds/rh_pina.mp3'],
  ['./sounds/gj_mad_world.mp3']]

  // GIFs
  const gifs = [['./images/win_up_balloons.gif', './images/win_to_infinity.gif', './images/win_airplane_takeoff.gif', './images/win_adventure.gif', './images/win_alan.gif'],
['./images/lose_dr_oops.gif', './images/lose_chris_oops.gif']]

  // ###### GRID SETUP ######

  // 2.1.3 Create JS grid
  $.each(grid, (i, row) => {
    $.each(row, (j, cell) => {
      const $element = $('<div />');
      //
      if(cell === 0){
        $element.addClass('blank');
      }
      $element.appendTo('.map');
    });
  });

  // ###### PLAYER MOVEMENT LOGIC ######
  function addClassPlayerCurrentCell(playerNumber, index){
    playerCells[playerNumber-1][1] = $(playerMaps[playerNumber-1].children()[index]);
    playerCells[playerNumber-1][1].addClass('playerCurrentCell');
  }

  function removeClassPlayerPreviousCell(playerNumber, index){
    playerCells[playerNumber-1][0] = $(playerMaps[playerNumber-1].children()[index]);
    playerCells[playerNumber-1][0].removeClass('playerCurrentCell');
  }

  function playerIndexChange(playerNumber, change) {
    const playerCurrentIndex = currentIndexes[playerNumber-1] + change;
    const playerPreviousIndex = currentIndexes[playerNumber-1];
    // store these globally
    currentIndexes[playerNumber-1] = playerCurrentIndex;
    previousIndexes[playerNumber-1] = playerPreviousIndex;
    addClassPlayerCurrentCell(playerNumber, playerCurrentIndex);
    removeClassPlayerPreviousCell(playerNumber, playerPreviousIndex);
  }

  // move left function
  function moveLeft(playerNumber, indexChangeFunction){
    const index = currentIndexes[playerNumber-1];
    if (index === 0 || index % 10 === 0) {
      playerFeedback[playerNumber-1][0] = 'You can\'t move left. Try to move another direction.';
      displayFeedback(playerNumber);
    } else {
      indexChangeFunction(playerNumber, -1);
    }
  }

  // move right function
  function moveRight(playerNumber, indexChangeFunction){
    const index = currentIndexes[playerNumber-1];
    if (index === 9 || index === 19 || index === 29 || index === 39 || index === 49 || index === 59 || index === 69 || index === 79 || index === 89 || index === 99) {
      playerFeedback[playerNumber-1][0] = 'You can\'t move right. Try to move another direction.';
      displayFeedback(playerNumber);
    } else {
      indexChangeFunction(playerNumber, 1);
    }
  }

  // move up function
  function moveUp(playerNumber, indexChangeFunction){
    const index = currentIndexes[playerNumber-1];
    if (index < 10){
      playerFeedback[playerNumber-1][0] = 'You can\'t move up. Try to move another direction.';
      displayFeedback(playerNumber);
    } else {
      indexChangeFunction(playerNumber, -10);
    }
  }

  // move down function
  function moveDown(playerNumber, indexChangeFunction){
    const index = currentIndexes[playerNumber-1];
    if (index > 89){
      playerFeedback[playerNumber-1][0] = 'You can\'t move down. Try to move another direction.';
      displayFeedback(playerNumber);
    } else {
      indexChangeFunction(playerNumber, 10);
    }
  }

  // Key mappings
  $(document).keydown(function(e) {
    const code = e.keyCode;
    if(code === 65){
      moveLeft(1, playerIndexChange);
    }else if(code === 68){
      moveRight(1, playerIndexChange);
    }else if(code === 87){
      moveUp(1, playerIndexChange);
    }else if(code === 83){
      moveDown(1, playerIndexChange);
    }else if(code === 37){
      moveLeft(2, playerIndexChange);
    }else if(code === 39){
      moveRight(2, playerIndexChange);
    }else if(code === 38){
      moveUp(2, playerIndexChange);
    }else if(code === 40){
      moveDown(2, playerIndexChange);
    }
    if (code === 81){
      $playerOneCurrentCell = $($('.map').children()[currentIndexes[0]]);
      const cellValue = $playerOneCurrentCell.html();
      checkLetter(1, cellValue.toLowerCase());
    }
    if (code === 13){
      $playerTwoCurrentCell = $($(document.getElementsByClassName('map')[1]).children()[currentIndexes[1]]);
      const cellValue = $playerTwoCurrentCell.html();
      checkLetter(2, cellValue.toLowerCase());
    }
  });

  // #### PREVENT DEFAULT ARROWS DEFAULT ######
  window.addEventListener('keydown', function(e) {
    // space and arrow keys
    if([37, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }, false);

  // ###### GAME LOGIC ######
  function randomize(array){
    const copiedArray = array.slice(); //makes a copy to randomize

    let currentIndex = copiedArray.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = copiedArray[currentIndex];
      copiedArray[currentIndex] = copiedArray[randomIndex];
      copiedArray[randomIndex] = temporaryValue;
    }
    return copiedArray;
  }

  // #### RANDOM Q LOGIC ####
  function displayRandomQuestion(){
    // 3.2.1 - 6 Random question logic
    const city = randomCities.pop();
    correctAnswer = city[1];
    clue = city[2]; // holde clue to give to players at 15sec
    correctAnswerArray = correctAnswer.toLowerCase().split('');
    underscoreArray = correctAnswerArray.map(x => ' _ ');
    $displayQuestion.text(`The city is: ${underscoreArray}`);
  }

  // ##### TIMER LOGIC #####
  function startTimer(){
    downloadTimer = setInterval(function(){
      timeleft--;
      $timer.text(timeleft);
      if (timeleft < 16) $displayQuestion.text(`Clue! ${clue}: ${underscoreArray}`); // gives players a clue
      if (timeleft === 0){
        playersLostFlights[0].push(correctAnswer); // if neither player gets it, push to lostFlights array
        if(!isGameOver()){
          gameRoundReset();
          playGame();
        }
      }
    },1000);
  }

  // #### ASSIGN CELL POSITIONS FOR LETTERS ####
  function randomPositionAssign(playerNumber, randomizedArray){
    const letterPositions = [];
    const map = playerMaps[playerNumber-1];

    randomizedArray.forEach(function(el){
      let randomCellPosition = Math.ceil(Math.random() * 97);
      while (letterPositions.includes(randomCellPosition)){
        randomCellPosition = randomCellPosition+1;
      }
      letterPositions.push(randomCellPosition);
      const $letterCell = $(map.children()[randomCellPosition]);
      $letterCell.addClass('containsLetter');
      $letterCell.text(`${el.toUpperCase()}`);
    });
  }

  // #### CHECK LETTER LOGIC #####
  function checkLetter(playerNumber, letter){
    const cell = playerCells[playerNumber-1][1];
    const playerLetterIndex = playerLetterIndexes[playerNumber-1];

    if (letter === correctAnswerArray[playerLetterIndex]){
      playerFeedback[playerNumber-1][0] = 'Correct letter! Now get the next one!';
      displayFeedback(playerNumber);
      playerAnswers[playerNumber-1][0].push(letter.toUpperCase());
      playerLetterIndexes[playerNumber-1] = playerAnswers[playerNumber-1][0].length;
      removeLetter(cell);
      displayPlayerAnswers(playerNumber);
      playSounds(playerNumber);
    } else {
      playerFeedback[playerNumber-1][0] = 'Not the right letter. Try another one!';
      displayFeedback(playerNumber);
    }
    isRoundOver(playerNumber);
  }

  // #### REMOVE LETTER FROM GRID ####
  function removeLetter(cell){
    cell.removeClass('containsLetter');
    cell.text('');
  }

  // #### GIF ROTATION LOGIC ####
  function showEndImage(winOrLose){
    // win = 0, loss = 1
    const randomImage = Math.floor(Math.random()*gifs[winOrLose].length);
    endImage.src = gifs[winOrLose][randomImage];
  }

  // ##### AUDIO #####
  function playSounds(playerNumber){
    const randomSound = Math.floor(Math.random()*playerSoundsArray[playerNumber-1].length);
    audio.src = playerSoundsArray[playerNumber-1][randomSound];
    audio.play();
  }

  // #### PLAYER ANSWER LOGIC ####
  function displayPlayerAnswers(player){
    playerAnswers[player-1][1].text(`Your answer: ${playerAnswers[player-1][0]}`);
  }

  // #### FEEDBACK LOGIC ####
  function displayDefaultFeedback() {
    $playerOneFeedbackDisplay.text(`${playerOneFeedback}`);
    $playerTwoFeedbackDisplay.text(`${playerTwoFeedback}`);
  }

  function displayFeedback(player){
    playerFeedback[player-1][1].text(playerFeedback[player-1][0]);
  }

  // #### SCORE LOGIC ####
  function displayDefaultScores(){
    $playerOneScoreDisplay.text('Player 1 Score: 0');
    $playerTwoScoreDisplay.text('Player 2 Score: 0');
  }

  function scoreIterator(player){
    playerScores[player-1][0] ++;
    playerScores[player-1][1].text(`Player ${player} Score: ${playerScores[player-1][0]}`);
  }

  // ###### THREE SCREEN VIEWS ######
  function showInstructionScreen(){
    $mainGame.hide();
    $instructional.show();
    $endScreen.hide();
  }

  function showMainGame(){
    $mainGame.show();
    $instructional.hide();
    $endScreen.hide();
  }

  function showEndScreen(){
    $mainGame.hide();
    $instructional.hide();
    $endScreen.show();
    endScreenMessage();
  }

  // #### END SCREEN MESSAGES DEPENDENT ON RESULT ####
  function endScreenMessage(){
    if (playerScores[0][0] > playerScores[1][0]){
      const flights = generateFlightsList(playersWonFlights[0]);
      $endMessage.html(`<p>Player One wins with a score of ${playerScores[0][0]}. Congratulations! You've won flights to ${flights}.</p><p>Unlucky Player Two. You lost with a score of ${playerScores[1][0]}.</p><p>Enjoy your travels Player One!</p>`);
      showEndImage(0);
      playSounds(3);
    } else if (playerScores[1][0] > playerScores[0][0]) {
      const flights = generateFlightsList(playersWonFlights[1]);
      $endMessage.html(`<p>Player Two wins with a score of ${playerScores[1][0]}. Congratulations! You've won flights to ${flights}.</p><p>Unlucky Player One. You lost with a score of ${playerScores[0][0]}.</p><p>Enjoy your travels Player Two!</p>`);
      showEndImage(0);
      playSounds(3);
    } else if (playerScores[1][0] > playerScores[0][0]) {
      const flights1 = generateFlightsList(playersWonFlights[0]);
      const flights2 = generateFlightsList(playersWonFlights[1]);
      $endMessage.html(`<p>It's a draw with both players scoring ${playerScores[1][0]}.</p><p>Player One won flights to ${flights1}.</p><p>Player Two won  flights to ${flights2}.</p><p>Enjoy your travels!</p>`);
      showEndImage(0);
      playSounds(3);
    } else {
      const lostFlights = generateFlightsList(playersLostFlights[0]);
      $endMessage.html(`<p>Oops. Both players scored ${playerScores[1][0]}.</p><p>You've lost flights to ${lostFlights}</p><p>You should try to play again and win more flights!</p>`);
      showEndImage(1);
      playSounds(4);
    }
  }

  function generateFlightsList(winningPlayersFlightsArray){
    let flightsList = winningPlayersFlightsArray[0];
    for (let i = 1; i < winningPlayersFlightsArray.length; i++){
      if (i === winningPlayersFlightsArray.length - 1){
        flightsList = `${flightsList} and ${winningPlayersFlightsArray[i]}`;
      } else flightsList = `${flightsList}, ${winningPlayersFlightsArray[i]}`;
    }
    return flightsList;
  }

  // #### EVENT LISTENERS ####
  const $startGameButton = $('#start-game');
  $startGameButton.on('click', function(){
    formInput = $('input[type=radio][name=continent]:checked').val();
    // console.log('form input', formInput);
    randomCities = randomize(capitalCitiesArray[formInput]);
    // randomCities = randomize(capitalCitiesArray[1]);
    showMainGame();
    playGame();
  });

  const $playAgainButton = $('#play-again');
  $playAgainButton.on('click', function(){
    setup();
    showMainGame();
    playGame();
  });

  // #### ROUND OVER / GAME OVER LOGIC #####
  function isRoundOver(playerNumber){
    if (correctAnswerArray.length === playerAnswers[playerNumber-1][0].length){
      playerFeedback[playerNumber-1][0] = 'You won the seat for this flight. Congratulations!';
      displayFeedback(playerNumber);
      playersWonFlights[playerNumber-1].push(correctAnswer);
      scoreIterator(playerNumber);

      if (!isGameOver()){
        gameRoundReset();
        playGame();
      }
    }
  }

  function isGameOver(){
    if (randomCities.length === 0){
      clearInterval(downloadTimer);
      showEndScreen();
      return true;
    }
  }

  // ###### RESET LOGIC ######
  function resetPlayerAnswers(){
    playerAnswers[0][1].text('Your answer: ');
    playerAnswers[1][1].text('Your answer: ');
  }

  function clearAllLetters(){
    const $gridChildren = $($('.map').children());
    for (let i = 0; i < $gridChildren.length; i++){
      if ($gridChildren[i].classList.contains('containsLetter')){
        $gridChildren[i].classList.remove('containsLetter');
        $gridChildren[i].innerHTML = '';
      }
    }
  }

  // Reset the round, but not the whole game
  function gameRoundReset(){
    playerOneInputtedAnswer.length = 0; // reset player answers
    playerTwoInputtedAnswer.length = 0;
    playerLetterIndexes.length = 0;
    playerLetterIndexes.push(0,0); // reset player indexes
    clearAllLetters();
    resetPlayerAnswers();
    clearInterval(downloadTimer);
    timeleft = 30;
  }

  // Reset the whole game
  function wholeGameReset(){
    removeClassPlayerPreviousCell(1, currentIndexes[0]); //reset player pos styling
    removeClassPlayerPreviousCell(2, currentIndexes[1]);
    currentIndexes.length = 0;
    currentIndexes.push(90,99); // reset player start postions
    playerScores.length = 0;
    playerScores.push([0, $playerOneScoreDisplay],[0, $playerTwoScoreDisplay]);
    displayDefaultScores();
    addClassPlayerCurrentCell(1, 90); // add initial player pos
    addClassPlayerCurrentCell(2, 99);
    playersWonFlights.length = 0; // clear playersWonFlights
    playersWonFlights.push([],[]); // make two fresh arrays
    clearInterval(downloadTimer); // clear timer
    timeleft = 30; // reset timers
  }

  // ###### PLAY GAME ######
  function playGame(){
    displayRandomQuestion();
    randomPositionAssign(1, randomize(correctAnswerArray));
    randomPositionAssign(2, randomize(correctAnswerArray));
    startTimer();
  }

  // ###### SETUP ######
  function setup(){
    showInstructionScreen();
    randomCities = randomize(capitalCitiesArray[formInput]);
    displayDefaultFeedback();
    gameRoundReset();
    wholeGameReset();
    audio.pause();
  }

  setup();
});
