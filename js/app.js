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

  // All declared variables with global scope
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

  // Answer verification variables
  let correctAnswer;
  let correctAnswerArray;
  let randomCellPosition;
  // let $letterCell;
  let playerOneLetterIndex = 0;
  let playerTwoLetterIndex = 0;
  const playerLetterIndexes = [playerOneLetterIndex, playerTwoLetterIndex];

  // Player letter positions on grid
  let playerOneLetterPositionsArray = [];
  let playerTwoLetterPositionsArray = [];
  const playerLetterPositionsArray = [playerOneLetterPositionsArray, playerOneLetterPositionsArray];

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


  //let gameToggle = false; // should start on false
  const $displayQuestion = $('#display-question');
  const $instructional = $('#instructional-info');
  const $mainGame = $('#main-game');

  const $endScreen = $('#end-screen');
  const $endMessage = $('#end-message');

  let randomCities = [];

  // ###### GRID SETUP ######

  // 2.1.3 Create JS grid
  $.each(grid, (i, row) => {
    $.each(row, (j, cell) => {
      const $element = $('<div />');
      //
      if(cell === 0){
        $element.addClass('blank');
      } else if (cell===1){
        // Placeholder - Adds different class if contains letter
        $element.addClass('containsLetter');
      }

      $element.appendTo('.map');
    });
  });

  // ###### PLAYER MOVEMENT LOGIC ######

  // 2.2.1 / 2.2.2 - Highlight starter cell
  // 2.3.2.2 - 7  - Player movement logic

  // 3.11.3. Changed move functions so they take player as argument and created var unique to each player
  // add class to current cell
  function addClassPlayerCurrentCell(playerNumber, index){
    playerCells[playerNumber-1][1] = $(playerMaps[playerNumber-1].children()[index]);
    playerCells[playerNumber-1][1].addClass('playerCurrentCell');
  }

  // remove class form last cell
  function removeClassPlayerPreviousCell(playerNumber, index){
    playerCells[playerNumber-1][0] = $(playerMaps[playerNumber-1].children()[index]);
    playerCells[playerNumber-1][0].removeClass('playerCurrentCell');
  }

  // delete me!
  // $('.map').each(function(i) {
  //   $(this).children();
  // })


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

  // 2.3.1 Key mappings
  $(document).keydown(function(e) {
    const code = e.keyCode;
    //if(code) console.log(code);
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

  // ###### CITIES LOGIC ######
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

  //3.2 Random question generator
  function displayRandomQuestion(){
    // 3.2.1 - 6 Random question logic
    const city = randomCities.pop();
    correctAnswer = city[1];
    correctAnswerArray = correctAnswer.toLowerCase().split('');
    const underscoreArray = correctAnswerArray.map(x => ' _ ');
    $displayQuestion.text(`The city is: ${underscoreArray}`);
  }

  // 3.3.2 - Create logic to assign letter value to grid position
  // 3.11.9 - Make rando position assign for two player & Output random word on second grid two
  function randomPositionAssign(playerNumber, randomizedArray){
    const letterPositions = playerLetterPositionsArray[playerNumber-1];
    const map = playerMaps[playerNumber-1];

    randomizedArray.forEach(function(el){
      let randomCellPosition = Math.floor(Math.random() * 99);
      if (letterPositions.includes(randomCellPosition)){
        randomCellPosition = randomCellPosition+1;
      }
      letterPositions.push(randomCellPosition);

      const $letterCell = $(map.children()[randomCellPosition]);
      $letterCell.addClass('containsLetter');
      $letterCell.text(`${el.toUpperCase()}`);
      //need to make exception if it picks the same number twice
    });
  }


  // 3.5.1 - Make player answer logic
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
    } else {
      playerFeedback[playerNumber-1][0] = 'Not the right letter. Try another one!';
      displayFeedback(playerNumber);
    }

    isRoundOver(playerNumber);
  }

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
    if (playerScores[0][0]+playerScores[1][0] === capitalCitiesArray.length){
      showEndScreen();
      return true;
    }
  }

  // 3.11.8 made removeletter work for two players
  // 3.6.1 Remove letter from cell and normalise class
  function removeLetter(cell){
    cell.removeClass('containsLetter');
    cell.text('');
  }

  // 3.7.1 Display user answer on screen
  // 3.11.10 Made displayer player answers work for both
  function displayPlayerAnswers(player){
    playerAnswers[player-1][1].text(`Your answer: ${playerAnswers[player-1][0]}`);
  }

  // 3.11.15 function that removes player answers
  function resetPlayerAnswers(){
    playerAnswers[0][1].text('Your answer: ');
    playerAnswers[1][1].text('Your answer: ');
  }

  function displayDefaultFeedback() {
    $playerOneFeedbackDisplay.text(`${playerOneFeedback}`);
    $playerTwoFeedbackDisplay.text(`${playerTwoFeedback}`);
  }

  // 4.1.6.2. Make feedback display for each player and output feedback as they play
  function displayFeedback(player){
    playerFeedback[player-1][1].text(playerFeedback[player-1][0]);
  }

  // 3.11.13 make scores work for both players
  // 3.10.1 create scoreIterator logic
  function scoreIterator(player){
    playerScores[player-1][0] ++;
    playerScores[player-1][1].text(`Player ${player} Score: ${playerScores[player-1][0]}`);
  }

  // ###### RESET LOGIC ######

  // 3.11.12 Made player reset work for both players
  function gameRoundReset(){
    playerOneInputtedAnswer.length = 0;
    playerTwoInputtedAnswer.length = 0;
    playerLetterIndexes.length = 0;
    playerLetterIndexes.push(0,0);
    // playerOneLetterIndex = 0; Why doesnt this work to reassign the values?
    // playerTwoLetterIndex = 0;
    clearAllLetters();
    resetPlayerAnswers();
  }

  function wholeGameReset(){
    playerOneCurrentIndex = 90; // reset player one start postion
    playerTwoCurrentIndex = 99; // reset player two start position
  }

  // 3.11.14 function that clears all existing letters
  const $gridChildren = $($('.map').children());
  function clearAllLetters(){
    for (let i = 0; i < $gridChildren.length; i++){
      if ($gridChildren[i].classList.contains('containsLetter')){
        $gridChildren[i].classList.remove('containsLetter');
        $gridChildren[i].innerHTML = '';
      }
    }
  }

  // ###### THREE SCREEN VIEWS ######
  // 4.1.3 Made it possible to hide/show both sections
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

  function endScreenMessage(){
    if (playerScores[0][0] > playerScores[1][0]){
      const flights = generateFlightsList(playersWonFlights[0]);
      $endMessage.html(`<p>Player One wins with a score of ${playerScores[0][0]}. Congratulations! You've won flights to ${flights}.</p><p>Unlucky Player Two. You lost with a score of ${playerScores[1][0]}.</p><p>Enjoy your travels Player One!</p>`);
    } else if (playerScores[1][0] > playerScores[0][0]) {
      const flights = generateFlightsList(playersWonFlights[1]);
      $endMessage.html(`<p>Player Two wins with a score of ${playerScores[1][0]}. Congratulations! You've won flights to ${flights}.</p><p>Unlucky Player One. You lost with a score of ${playerScores[0][0]}.</p><p>Enjoy your travels Player Two!</p>`);
    } else {
      const flights1 = generateFlightsList(playersWonFlights[0]);
      const flights2 = generateFlightsList(playersWonFlights[1]);
      $endMessage.html(`<p>It's a draw with both players scoring ${playerScores[1][0]}.</p><p>Player One won flights to ${flights1}.</p><p>Player Two won  flights to ${flights2}.</p><p>Enjoy your travels!</p>`);
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

  // 4.1.4 Make start game button for players
  const $startGameButton = $('#start-game');
  $startGameButton.on('click', function(){
    showMainGame();
    playGame();
  });

  const $playAgainButton = $('#play-again');
  $playAgainButton.on('click', function(){
    setup();
    showMainGame();
    playGame();
  });

  // ###### PLAY GAME ######

  // 3.9.1 playAgain funtion to reset board
  // 3.11.11 Made player again work for both players
  function playGame(){
    displayRandomQuestion();
    randomPositionAssign(1, randomize(correctAnswerArray));
    randomPositionAssign(2, randomize(correctAnswerArray));
  }

  // ###### SETUP ######

  //3.12 setup function
  function setup(){
    showInstructionScreen();
    randomCities = randomize(capitalCitiesArray);
    displayDefaultFeedback();
    wholeGameReset();
  }

  setup();
  //playGame();
});
