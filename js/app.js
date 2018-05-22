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
  let playerOnePreviousIndex;
  let playerTwoPreviousIndex;
  let $playerOnePreviousCell;
  let $playerOneCurrentCell;
  let $playerTwoCurrentCell;
  let $playerTwoPreviousCell;
  let correctAnswer;
  let correctAnswerArray;
  let randomCellPosition;
  let $letterCell;
  let playerOneLetterIndex = 0;
  let playerTwoLetterIndex = 0;
  let playerOneScore = 0;
  let playerTwoScore = 0;
  const playerOneInputtedAnswer = [];
  const playerTwoInputtedAnswer = [];

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

  const usedQuestions = [];

  const $endScreen = $('#end-screen');
  const $endMessage = $('#end-message');

  const playerOneWonFlights = [];
  const playerTwoWonFlights = [];

  // 4.1.6.2. Make feedback display for each player and output feedback as they play

  const $playerOneFeedbackDisplay = $('#player-one-feedback');
  let playerOneFeedback = 'Start moving your player!';
  const $playerTwoFeedbackDisplay = $('#player-two-feedback');
  let playerTwoFeedback = 'Start moving your player!';

  function displayFeedback(){
    $playerOneFeedbackDisplay.text(`${playerOneFeedback}`);
    $playerTwoFeedbackDisplay.text(`${playerTwoFeedback}`);
  }

  displayFeedback(); // remove later

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
  function addClassPlayerCurrentCell(player, index){
    if (player === 'player1'){
      $playerOneCurrentCell = $($('.map').children()[index]);
      $playerOneCurrentCell.addClass('playerCurrentCell');
    } else if (player === 'player2'){
      $playerTwoCurrentCell = $($(document.getElementsByClassName('map')[1]).children()[index]);
      $playerTwoCurrentCell.addClass('playerCurrentCell');
    }
  }

  // remove class form last cell
  function removeClassPlayerPreviousCell(player, index){
    if (player === 'player1'){
      $playerOnePreviousCell = $($('.map').children()[index]);
      $playerOnePreviousCell.removeClass('playerCurrentCell');
    } else if (player === 'player2'){
      $playerTwoPreviousCell = $($(document.getElementsByClassName('map')[1]).children()[index]);
      $playerTwoPreviousCell.removeClass('playerCurrentCell');
    }
  }

  // 3.11.4 - Refactor so that index changes are in functions
  function playerOneIndexChange(change, playerIndex){
    playerOnePreviousIndex = playerIndex;
    playerOneCurrentIndex = playerIndex + change;
    addClassPlayerCurrentCell('player1', playerOneCurrentIndex);
    removeClassPlayerPreviousCell('player1', playerOnePreviousIndex);
  }

  function playerTwoIndexChange(change, playerIndex){
    playerTwoPreviousIndex = playerIndex;
    playerTwoCurrentIndex = playerIndex + change;
    addClassPlayerCurrentCell('player2', playerTwoCurrentIndex);
    removeClassPlayerPreviousCell('player2', playerTwoPreviousIndex);
  }

  // move left function
  function moveLeft(player, playerIndex){
    if (playerIndex === 0 || playerIndex % 10 === 0) {
      if (player === 'player1'){
        playerOneFeedback = 'You can\'t move left. Try to move another direction.';
        displayFeedback();
      } else if (player === 'player2') {
        playerTwoFeedback = 'You can\'t move left. Try to move another direction.';
        displayFeedback();
      }
    } else {
      if (player === 'player1'){
        playerOneIndexChange(-1, playerIndex);
      } else if (player === 'player2') {
        playerTwoIndexChange(-1, playerIndex);
      }
    }
  }

  // move right function
  function moveRight(player, playerIndex){
    if (playerIndex === 9 || playerIndex === 19 || playerIndex === 29 || playerIndex === 39 || playerIndex === 49 || playerIndex === 59 || playerIndex === 69 || playerIndex === 79 || playerIndex === 89 || playerIndex === 99) {
      if (player === 'player1'){
        playerOneFeedback = 'You can\'t move right. Try to move another direction.';
        displayFeedback();
      } else if (player === 'player2') {
        playerTwoFeedback = 'You can\'t move right. Try to move another direction.';
        displayFeedback();
      }
    } else {
      if (player === 'player1'){
        playerOneIndexChange(1, playerIndex);
      } else if (player === 'player2') {
        playerTwoIndexChange(1, playerIndex);
      }
    }
  }

  // move up function
  function moveUp(player, playerIndex){
    if (playerIndex < 10){
      if (player === 'player1'){
        playerOneFeedback = 'You can\'t move up. Try to move another direction.';
        displayFeedback();
      } else if (player === 'player2') {
        playerTwoFeedback = 'You can\'t move up. Try to move another direction.';
        displayFeedback();
      }
    } else {
      if (player === 'player1'){
        playerOneIndexChange(-10, playerIndex);
      } else if (player === 'player2') {
        playerTwoIndexChange(-10, playerIndex);
      }
    }
  }

  // move down function
  function moveDown(player, playerIndex){
    if (playerIndex > 89){
      if (player === 'player1'){
        playerOneFeedback = 'You can\'t move down. Try to move another direction.';
        displayFeedback();
      } else if (player === 'player2') {
        playerTwoFeedback = 'You can\'t move down. Try to move another direction.';
        displayFeedback();
      }
    } else {

      if (player === 'player1'){
        playerOneIndexChange(10, playerIndex);
      } else if (player === 'player2') {
        playerTwoIndexChange(10, playerIndex);
      }
    }
  }

  // 2.3.1 Key mappings
  $(document).keydown(function(e) {
    const code = e.keyCode;
    //if(code) console.log(code);
    if(code === 65){
      moveLeft('player1', playerOneCurrentIndex);
    }else if(code === 68){
      moveRight('player1', playerOneCurrentIndex);
    }else if(code === 87){
      moveUp('player1', playerOneCurrentIndex);
    }else if(code === 83){
      moveDown('player1', playerOneCurrentIndex);
    }else if(code === 37){
      moveLeft('player2', playerTwoCurrentIndex);
    }else if(code === 39){
      moveRight('player2', playerTwoCurrentIndex);
    }else if(code === 38){
      moveUp('player2', playerTwoCurrentIndex);
    }else if(code === 40){
      moveDown('player2', playerTwoCurrentIndex);
    }
    if (code === 81){
      pickUp('player1'); //player 1 pickup
    }
    if (code === 13){
      pickUp('player2'); // player 2 pickup
    }
  });

  // ###### CITIES LOGIC ######

  function randomizeCityOrder(){
    let currentIndex = capitalCitiesArray.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = capitalCitiesArray[currentIndex];
      capitalCitiesArray[currentIndex] = capitalCitiesArray[randomIndex];
      capitalCitiesArray[randomIndex] = temporaryValue;
    }
    return capitalCitiesArray;
  }

  let city = [];

  //3.2 Random question generator
  function displayRandomQuestion(){
    // 3.2.1 - 6 Random question logic
    city = capitalCitiesArray.pop();
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
  function checkLetter(player, letter){
    if (player === 'player1' && letter === correctAnswerArray[playerOneLetterIndex]){
      playerOneInputtedAnswer.push(letter.toUpperCase());
      playerOneLetterIndex = playerOneInputtedAnswer.length;
      playerOneFeedback = 'Correct letter! Now get the next one!';
      displayFeedback();
      removeLetter('player1');
      displayPlayerAnswers();
    } else if (player === 'player2' && letter === correctAnswerArray[playerTwoLetterIndex]) {
      playerTwoInputtedAnswer.push(letter.toUpperCase());
      playerTwoLetterIndex = playerTwoInputtedAnswer.length;
      playerTwoFeedback = 'Correct letter! Now get the next one!';
      displayFeedback();
      removeLetter('player2');
      displayPlayerAnswers();
    } else if (player === 'player1') {
      playerOneFeedback = 'Not the right letter. Try another one!';
      displayFeedback();
    } else if (player === 'player2') {
      playerTwoFeedback = 'Not the right letter. Try another one!';
      displayFeedback();
    }

    if (correctAnswerArray.length === playerOneInputtedAnswer.length){
      playerOneFeedback = 'You won the seat for this flight. Congratulations!';
      playerTwoFeedback = 'You lost the seat for this flight. Unlucky!';
      playerOneWonFlights.push(correctAnswer);
      displayFeedback();
      scoreIterator(player);
      if (capitalCitiesArray.length===0){
        endScreen();
        return;
      }

      playGame();
    } else if (correctAnswerArray.length === playerTwoInputtedAnswer.length ){
      playerOneFeedback = 'You lost the seat for this flight. Unlucky!';
      playerTwoFeedback = 'You won the seat for this flight. Congratulations!';
      playerTwoWonFlights.push(correctAnswer);
      displayFeedback();
      scoreIterator(player);
      if (capitalCitiesArray.length===0){
        endScreen();
        return;
      }

      playGame();
    }
  }

  // function isGameOver(){
  //
  // }

  // 3.11.7 made pickup work for two players
  // 2.4.1-2 Keydown for enter button and pickup function
  function pickUp(player){
    let currentCellValue;
    if (player === 'player1') currentCellValue = $playerOneCurrentCell.html();
    if (player === 'player2') currentCellValue = $playerTwoCurrentCell.html();
    checkLetter(player, currentCellValue.toLowerCase());
  }

  // 3.11.8 made removeletter work for two players
  // 3.6.1 Remove letter from cell and normalise class
  function removeLetter(player){
    if (player === 'player1'){
      $playerOneCurrentCell.removeClass('containsLetter');
      $playerOneCurrentCell.text('');
    } else if (player === 'player2'){
      $playerTwoCurrentCell.removeClass('containsLetter');
      $playerTwoCurrentCell.text('');
    }
  }

  // 3.7.1 Display user answer on screen
  const $displayPlayerOneAnswer = $('#player-one-answer');
  const $displayPlayerTwoAnswer = $('#player-two-answer');

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
    gameReset();
    randomizeCityOrder();
    displayFeedback();
    displayRandomQuestion();
    randomPositionAssign('player1', randomizeLetters('playerOne'));
    randomPositionAssign('player2', randomizeLetters('playerTwo'));
  }

  // 3.11.12 Made player reset work for both players
  function gameReset(){
    playerOneInputtedAnswer.length = 0;
    playerTwoInputtedAnswer.length = 0;
    playerOneLetterIndex = 0;
    playerTwoLetterIndex = 0;
    clearAllLetters();
    resetPlayerAnswersDisplay();
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
    console.log('play game');
    gameToggle = true;
    toggleScreenView();
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
  }

  setup();
  //playGame();
});
