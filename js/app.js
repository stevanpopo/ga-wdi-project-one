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
  let $playerOneCurrentCell;
  let $playerTwoCurrentCell;
  let $playerTwoPreviousCell;

  // Answer verification variables
  let correctAnswer;
  let correctAnswerArray;
  let randomCellPosition;
  let $letterCell;
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
  $playerTwoScoreDisplay.text('Player 1 Score: 0');

  // PlayerWonFlights global array
  const playersWonFlights = [[], []];

  // PlayerFeedback global array
  const $playerOneFeedbackDisplay = $('#player-one-feedback');
  const $playerTwoFeedbackDisplay = $('#player-two-feedback');
  let playerOneFeedback = 'Start moving your player!';
  let playerTwoFeedback = 'Start moving your player!';
  const playerFeedback = [[playerOneFeedback, $playerOneFeedbackDisplay], [playerTwoFeedback, $playerTwoFeedbackDisplay]];

  let gameToggle = false; // should start on false
  const $displayQuestion = $('#display-question');
  const $instructional = $('#instructional-info');
  const $mainGame = $('#main-game');
  const $playerOneMap = $('.map');
  const $playerTwoMap = $(document.getElementsByClassName('map')[1]);
  const $endScreen = $('#end-screen');
  const $endMessage = $('#end-message');

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
  function addClassPlayerCurrentCell(cell, grid, index){
    cell = $(grid.children()[index]);
    cell.addClass('playerCurrentCell');
  }

  // remove class form last cell
  function removeClassPlayerPreviousCell(cell, grid, index){
    cell = $(grid.children()[index]);
    cell.removeClass('playerCurrentCell');
  }

  // delete me!
  // $('.map').each(function(i) {
  //   $(this).children();
  // })


  function playerIndexChange(playerNumber, change, playerIndex, cell, grid) {
    const playerCurrentIndex = playerIndex + change;
    const playerPreviousIndex = playerIndex;
    // store these globally
    currentIndexes[playerNumber - 1] = playerCurrentIndex;
    previousIndexes[playerNumber - 1] = playerPreviousIndex;
    addClassPlayerCurrentCell(cell, grid, playerCurrentIndex);
    removeClassPlayerPreviousCell(cell, grid, playerPreviousIndex);
  }

  // move left function
  function moveLeft(playerNumber, indexChangeFunction, playerIndex, cell, grid){
    if (playerIndex === 0 || playerIndex % 10 === 0) {
      playerFeedback[playerNumber-1][0] = 'You can\'t move left. Try to move another direction.';
      displayFeedback(playerNumber);
    } else {
      indexChangeFunction(playerNumber, -1, playerIndex, cell, grid);
    }
  }

  // move right function
  function moveRight(playerNumber, indexChangeFunction, playerIndex, cell, grid){
    if (playerIndex === 9 || playerIndex === 19 || playerIndex === 29 || playerIndex === 39 || playerIndex === 49 || playerIndex === 59 || playerIndex === 69 || playerIndex === 79 || playerIndex === 89 || playerIndex === 99) {
      playerFeedback[playerNumber-1][0] = 'You can\'t move right. Try to move another direction.';
      displayFeedback(playerNumber);
    } else {
      indexChangeFunction(playerNumber, 1, playerIndex, cell, grid);
    }
  }

  // move up function
  function moveUp(playerNumber, indexChangeFunction, playerIndex, cell, grid){
    if (playerIndex < 10){
      playerFeedback[playerNumber-1][0] = 'You can\'t move up. Try to move another direction.';
      displayFeedback(playerNumber);
    } else {
      indexChangeFunction(playerNumber, -10, playerIndex, cell, grid);
    }
  }

  // move down function
  function moveDown(playerNumber, indexChangeFunction, playerIndex, cell, grid){
    if (playerIndex > 89){
      playerFeedback[playerNumber-1][0] = 'You can\'t move down. Try to move another direction.';
      displayFeedback(playerNumber);
    } else {
      indexChangeFunction(playerNumber, 10, playerIndex, cell, grid);
    }
  }

  // 2.3.1 Key mappings
  $(document).keydown(function(e) {
    const code = e.keyCode;
    //if(code) console.log(code);
    if(code === 65){
      moveLeft(1, playerIndexChange, currentIndexes[0], $playerOnePreviousCell, $('.map'));
    }else if(code === 68){
      moveRight(1, playerIndexChange, currentIndexes[0], $playerOnePreviousCell, $('.map'));
    }else if(code === 87){
      moveUp(1, playerIndexChange, currentIndexes[0], $playerOnePreviousCell, $('.map'));
    }else if(code === 83){
      moveDown(1, playerIndexChange, currentIndexes[0], $playerOnePreviousCell, $('.map'));
    }else if(code === 37){
      moveLeft(2, playerIndexChange, currentIndexes[1], $playerTwoPreviousCell, $(document.getElementsByClassName('map')[1]));
    }else if(code === 39){
      moveRight(2, playerIndexChange, currentIndexes[1], $playerTwoPreviousCell, $(document.getElementsByClassName('map')[1]));
    }else if(code === 38){
      moveUp(2, playerIndexChange, currentIndexes[1], $playerTwoPreviousCell, $(document.getElementsByClassName('map')[1]));
    }else if(code === 40){
      moveDown(2, playerIndexChange, currentIndexes[1], $playerTwoPreviousCell, $(document.getElementsByClassName('map')[1]));
    }
    if (code === 81){
      $playerOneCurrentCell = $($('.map').children()[currentIndexes[0]]);
      const cellValue = $playerOneCurrentCell.html();
      checkLetter(1, $playerOneCurrentCell, cellValue.toLowerCase(), playerLetterIndexes[0]);
    }
    if (code === 13){
      $playerTwoCurrentCell = $($(document.getElementsByClassName('map')[1]).children()[currentIndexes[1]]);
      const cellValue = $playerTwoCurrentCell.html();
      checkLetter(2, $playerTwoCurrentCell, cellValue.toLowerCase(), playerLetterIndexes[1]);
    }
  });

  // ###### CITIES LOGIC ######
  let copiedArray = [];
  function randomizeCityOrder(){
    copiedArray = capitalCitiesArray.slice(); //makes a copy to randomize

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

  let city = [];

  //3.2 Random question generator
  function displayRandomQuestion(){
    // 3.2.1 - 6 Random question logic
    city = copiedArray.pop();
    correctAnswer = city[1];
    correctAnswerArray = correctAnswer.toLowerCase().split('');
    const underscoreArray = correctAnswerArray.map(x => ' _ ');
    $displayQuestion.text(`The city is: ${underscoreArray}`);
  }

  // 3.3.1-6 - Made the randomize letter logic
  // 3.11.5 - Make randomise function work for two players
  function randomizeLetters(player){
    let arrayName = `${player}AnswerArray`;
    arrayName = correctAnswerArray.slice(); //makes a copy to randomize

    let currentIndex = arrayName.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = arrayName[currentIndex];
      arrayName[currentIndex] = arrayName[randomIndex];
      arrayName[randomIndex] = temporaryValue;
    }
    return arrayName;
  }

  // 3.3.2 - Create logic to assign letter value to grid position
  // 3.11.9 - Make rando position assign for two player & Output random word on second grid two
  function randomPositionAssign(player, randomizedArray){
    if (player === 'player1'){
      const playerOnePositionsArray = [];
      randomizedArray.forEach(function(el){
        randomCellPosition = Math.floor(Math.random() * 100);
        if (playerOnePositionsArray.includes(randomCellPosition)){
          randomCellPosition = randomCellPosition+5;
        }
        playerOnePositionsArray.push(randomCellPosition);
        $letterCell = $($('.map').children()[randomCellPosition]);
        $letterCell.addClass('containsLetter');
        $letterCell.text(`${el.toUpperCase()}`);
        //need to make exception if it picks the same number twice
      });
    } else if (player === 'player2'){
      const playerTwoPositionsArray = [];
      randomizedArray.forEach(function(el){
        randomCellPosition = Math.floor(Math.random() * 100);
        if (playerTwoPositionsArray.includes(randomCellPosition)){
          randomCellPosition = randomCellPosition+5;
        }
        playerTwoPositionsArray.push(randomCellPosition);
        $letterCell = $($('.map').children()[randomCellPosition]);
        $letterCell = $($(document.getElementsByClassName('map')[1]).children()[randomCellPosition]);
        $letterCell.addClass('containsLetter');
        $letterCell.text(`${el.toUpperCase()}`);
        //need to make exception if it picks the same number twice
      });
    }
  }

  // 3.5.1 - Make player answer logic
  function checkLetter(player, cell, letter, playerLetterIndex){

    if (letter === correctAnswerArray[playerLetterIndex]){
      playerFeedback[player-1][0] = 'Correct letter! Now get the next one!';
      displayFeedback(player);
      playerAnswers[player-1][0].push(letter.toUpperCase());
      playerLetterIndexes[player-1] = playerAnswers[player-1][0].length;
      removeLetter(cell);
      displayPlayerAnswers(player);
    } else {
      playerFeedback[player-1][0] = 'Not the right letter. Try another one!';
      displayFeedback(player);
    }

    if (correctAnswerArray.length === playerAnswers[player-1][0].length){
      playerFeedback[player-1][0] = 'You won the seat for this flight. Congratulations!';
      displayFeedback(player);
      playersWonFlights[player-1].push(correctAnswer);
      scoreIterator(player);

      if (copiedArray.length===0){
        endScreen();
        return;
      }
      console.log('About to re-play game');
      gameRoundReset();
      playGame();
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

  // ###### PLAY AGAIN AND RESET LOGIC ######

  // 3.9.1 playAgain funtion to reset board
  // 3.11.11 Made player again work for both players
  function playGame(){
    displayRandomQuestion();
    randomPositionAssign('player1', randomizeLetters('playerOne'));
    randomPositionAssign('player2', randomizeLetters('playerTwo'));
  }

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


  // 4.1.3 Made it possible to hide/show both sections
  function toggleScreenView(){
    if (gameToggle){
      $mainGame.show();
      $instructional.hide();
      $endScreen.hide();
      $displayQuestion.show();
      $playerOneMap.show();
      $playerTwoMap.show();
      $playerOneFeedbackDisplay.show();
      $playerTwoFeedbackDisplay.show();
      $playerOneAnswerDisplay.show();
      $playerTwoAnswerDisplay.show();
      $playerOneScoreDisplay.show();
      $playerTwoScoreDisplay.show();

      gameToggle = false;
    } else {
      $mainGame.hide();
      $endScreen.hide();
      $instructional.show();
    }
  }

  // 4.1.4 Make start game button for players
  const $startGameButton = $('#start-game');
  $startGameButton.on('click', function(){
    gameToggle = true;
    toggleScreenView();
    playGame();
  });

  const $playAgainButton = $('#play-again');
  $playAgainButton.on('click', function(){
    gameToggle = true;
    setup();
    playGame();
  });


  function endScreen(){
    $endScreen.show();
    $displayQuestion.hide();
    $playerOneMap.hide();
    $playerTwoMap.hide();
    $playerOneFeedbackDisplay.hide();
    $playerTwoFeedbackDisplay.hide();
    $displayPlayerOneAnswer.hide();
    $displayPlayerTwoAnswer.hide();
    $playerOneScoreDisplay.hide();
    $playerTwoScoreDisplay.hide();

    if (playerOneScore > playerTwoScore){
      $endMessage.text(`Player One wins. You've won flights to ${playerOneWonFlights}. Enjoy your travels!`);
    } else if (playerTwoScore > playerOneScore) {
      $endMessage.text(`Player Two wins. You've won flights to ${playerTwoWonFlights}. Enjoy your travels!`);
    } else {
      $endMessage.text(`It's a draw. Player One won flights to ${playerOneWonFlights} and Player Two won  flights to ${playerTwoWonFlights}. Enjoy your travels!`);
    }
  }

  // ###### SETUP ######

  //3.12 setup function
  function setup(){
    toggleScreenView();
    randomizeCityOrder();
    displayDefaultFeedback();
    wholeGameReset();
  }

  setup();
  //playGame();
});
