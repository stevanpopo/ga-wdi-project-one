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
  // console.log(currentIndexes);
  const previousIndexes = [playerOneCurrentIndex, playerTwoCurrentIndex];
  let $playerOnePreviousCell;
  let $playerOneCurrentCell;
  // const $playerOneCurrentCell = $($('.map').children(currentIndexes[0]));
  console.log($playerOneCurrentCell);
  // console.log(currentIndexes[0]);
  let $playerTwoCurrentCell;
  // const $playerTwoCurrentCell = $($(document.getElementsByClassName('map')[1]).children()[currentIndexes[1]]);
  console.log($playerTwoCurrentCell);
  // console.log(currentIndexes[1]);
  let $playerTwoPreviousCell;
  let correctAnswer;
  let correctAnswerArray;
  let randomCellPosition;
  let $letterCell;
  let playerOneLetterIndex = 0;
  let playerTwoLetterIndex = 0;
  const playerLetterIndexes = [playerOneLetterIndex, playerTwoLetterIndex];

  let playerOneScore = 0;
  let playerTwoScore = 0;
  const playerOneInputtedAnswer = [];
  const playerTwoInputtedAnswer = [];
  const playerInputtedAnswers = [playerOneInputtedAnswer, playerTwoInputtedAnswer];
  console.log(playerInputtedAnswers);

  const $displayQuestion = $('#display-question');
  const $playerOneScoreDisplay = $('#player-one-score');
  const $playerTwoScoreDisplay = $('#player-two-score');
  $playerOneScoreDisplay.text('Player One Score: 0');
  $playerTwoScoreDisplay.text('Player Two Score: 0');

  let gameToggle = false; // should start on false
  const $instructional = $('#instructional-info');
  const $mainGame = $('#main-game');
  const $playerOneMap = $('.map');
  const $playerTwoMap = $(document.getElementsByClassName('map')[1]);

  const $endScreen = $('#end-screen');
  const $endMessage = $('#end-message');

  const playerOneWonFlights = [];
  const playerTwoWonFlights = [];
  const $playerOneFeedbackDisplay = $('#player-one-feedback');
  let playerOneFeedback = 'Start moving your player!';
  const $playerTwoFeedbackDisplay = $('#player-two-feedback');
  let playerTwoFeedback = 'Start moving your player!';

  const $displayPlayerOneAnswer = $('#player-one-answer');
  const $displayPlayerTwoAnswer = $('#player-two-answer');

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
  function moveLeft(playerNumber, indexChangeFunction, feedbackDiv, playerIndex, cell, grid){
    if (playerIndex === 0 || playerIndex % 10 === 0) {
      const msg = 'You can\'t move left. Try to move another direction.';
      displayFeedback(feedbackDiv, msg);
    } else {
      indexChangeFunction(playerNumber, -1, playerIndex, cell, grid);
    }
  }

  // move right function
  function moveRight(playerNumber, indexChangeFunction, feedbackDiv, playerIndex, cell, grid){
    if (playerIndex === 9 || playerIndex === 19 || playerIndex === 29 || playerIndex === 39 || playerIndex === 49 || playerIndex === 59 || playerIndex === 69 || playerIndex === 79 || playerIndex === 89 || playerIndex === 99) {
      const msg = 'You can\'t move right. Try to move another direction.';
      displayFeedback(feedbackDiv, msg);
    } else {
      indexChangeFunction(playerNumber, 1, playerIndex, cell, grid);
    }
  }

  // move up function
  function moveUp(playerNumber, indexChangeFunction, feedbackDiv, playerIndex, cell, grid){
    if (playerIndex < 10){
      const msg = 'You can\'t move up. Try to move another direction.';
      displayFeedback(feedbackDiv, msg);
    } else {
      indexChangeFunction(playerNumber, -10, playerIndex, cell, grid);
    }
  }

  // move down function
  function moveDown(playerNumber, indexChangeFunction, feedbackDiv, playerIndex, cell, grid){
    if (playerIndex > 89){
      const msg = 'You can\'t move down. Try to move another direction.';
      displayFeedback(feedbackDiv, msg);
    } else {
      indexChangeFunction(playerNumber, 10, playerIndex, cell, grid);
    }
  }

  // 2.3.1 Key mappings
  $(document).keydown(function(e) {
    const code = e.keyCode;
    //if(code) console.log(code);
    if(code === 65){
      moveLeft(1, playerIndexChange, $playerOneFeedbackDisplay, currentIndexes[0], $playerOnePreviousCell, $('.map'));
    }else if(code === 68){
      moveRight(1, playerIndexChange, $playerOneFeedbackDisplay, currentIndexes[0], $playerOnePreviousCell, $('.map'));
    }else if(code === 87){
      moveUp(1, playerIndexChange, $playerOneFeedbackDisplay, currentIndexes[0], $playerOnePreviousCell, $('.map'));
    }else if(code === 83){
      moveDown(1, playerIndexChange, $playerOneFeedbackDisplay, currentIndexes[0], $playerOnePreviousCell, $('.map'));
    }else if(code === 37){
      moveLeft(2, playerIndexChange, $playerTwoFeedbackDisplay, currentIndexes[1], $playerTwoPreviousCell, $(document.getElementsByClassName('map')[1]));
    }else if(code === 39){
      moveRight(2, playerIndexChange, $playerTwoFeedbackDisplay, currentIndexes[1], $playerTwoPreviousCell, $(document.getElementsByClassName('map')[1]));
    }else if(code === 38){
      moveUp(2, playerIndexChange, $playerTwoFeedbackDisplay, currentIndexes[1], $playerTwoPreviousCell, $(document.getElementsByClassName('map')[1]));
    }else if(code === 40){
      moveDown(2, playerIndexChange, $playerTwoFeedbackDisplay, currentIndexes[1], $playerTwoPreviousCell, $(document.getElementsByClassName('map')[1]));
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
      console.log(playerInputtedAnswers);
      playerInputtedAnswers[player-1].push(letter.toUpperCase());
      console.log(playerInputtedAnswers);
      console.log(playerInputtedAnswers[player-1]);
      // playerOneInputtedAnswer.push(letter.toUpperCase());
      playerLetterIndexes[player-1] = playerInputtedAnswers[player-1].length;
      // playerLetterIndexes[player-1] = playerOneInputtedAnswer.length;
      console.log('correct');
      // playerOneFeedback = 'Correct letter! Now get the next one!';
      removeLetter(cell);
      displayPlayerAnswers();
    } else {
      console.log('not correct');
      // playerOneFeedback = 'Not the right letter. Try another one!';
      // displayFeedback();
    }

    if (correctAnswerArray.length === playerOneInputtedAnswer.length){
      playerOneFeedback = 'You won the seat for this flight. Congratulations!';
      playerTwoFeedback = 'You lost the seat for this flight. Unlucky!';
      playerOneWonFlights.push(correctAnswer);
      // displayFeedback();
      scoreIterator(player);
      if (copiedArray.length===0){
        endScreen();
        return;
      }

      playGame();
    } else if (correctAnswerArray.length === playerTwoInputtedAnswer.length ){
      playerOneFeedback = 'You lost the seat for this flight. Unlucky!';
      playerTwoFeedback = 'You won the seat for this flight. Congratulations!';
      playerTwoWonFlights.push(correctAnswer);
      // displayFeedback();
      scoreIterator(player);
      if (copiedArray.length===0){
        endScreen();
        return;
      }

      playGame();
    }
  }

  // 3.11.8 made removeletter work for two players
  // 3.6.1 Remove letter from cell and normalise class
  function removeLetter(cell){
    cell.removeClass('containsLetter');
    cell.text('');

    // if (player === 'player1'){
    //   $playerOneCurrentCell.removeClass('containsLetter');
    //   $playerOneCurrentCell.text('');
    // } else if (player === 'player2'){
    //   $playerTwoCurrentCell.removeClass('containsLetter');
    //   $playerTwoCurrentCell.text('');
    // }
  }

  // 3.7.1 Display user answer on screen
  // 3.11.10 Made displayer player answers work for both
  function displayPlayerAnswers(){
    $displayPlayerOneAnswer.text(`Your answer: ${playerOneInputtedAnswer}`);
    $displayPlayerTwoAnswer.text(`Your answer: ${playerTwoInputtedAnswer}`);
  }
  // 3.11.15 function that removes player answers
  function resetPlayerAnswersDisplay(){
    $displayPlayerOneAnswer.text('Your answer: ');
    $displayPlayerTwoAnswer.text('Your answer: ');
  }

  // 4.1.6.2. Make feedback display for each player and output feedback as they play
  // function displayFeedback(){
  //   $playerOneFeedbackDisplay.text(`${playerOneFeedback}`);
  //   $playerTwoFeedbackDisplay.text(`${playerTwoFeedback}`);
  // }

  function displayDefaultFeedback() {
    $playerOneFeedbackDisplay.text(`${playerOneFeedback}`);
    $playerTwoFeedbackDisplay.text(`${playerTwoFeedback}`);
  }

  function displayFeedback(div, message){
    div.text(message);
  }

  // 3.11.13 make scores work for both players
  // 3.10.1 create scoreIterator logic
  function scoreIterator(player){
    if (player === 'player1'){
      playerOneScore ++;
      $playerOneScoreDisplay.text(`Player One Score: ${playerOneScore}`);
    } else if (player === 'player2') {
      playerTwoScore ++;
      $playerTwoScoreDisplay.text(`Player Two Score: ${playerTwoScore}`);
    }
  }

  // ###### PLAY AGAIN AND RESET LOGIC ######

  // 3.9.1 playAgain funtion to reset board
  // 3.11.11 Made player again work for both players
  function playGame(){
    gameRoundReset();
    displayDefaultFeedback();
    displayRandomQuestion();
    randomPositionAssign('player1', randomizeLetters('playerOne'));
    randomPositionAssign('player2', randomizeLetters('playerTwo'));
  }

  // 3.11.12 Made player reset work for both players
  function gameRoundReset(){
    playerOneInputtedAnswer.length = 0;
    playerTwoInputtedAnswer.length = 0;
    playerOneLetterIndex = 0;
    playerTwoLetterIndex = 0;
    clearAllLetters();
    resetPlayerAnswersDisplay();
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
      $displayPlayerOneAnswer.show();
      $displayPlayerTwoAnswer.show();
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
    wholeGameReset();
  }

  setup();
  //playGame();
});
