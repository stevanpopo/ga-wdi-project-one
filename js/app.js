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

// 3.11.1 Created grid for player two
// const grid2 = [
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// ];


$(() => {
  console.log('JS Log');

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

  // 3.11.1 grid for second player
  // $.each(grid, (k, row) => {
  //   $.each(row, (l, cell) => {
  //     const $element = $('<div />');
  //     //
  //     if(cell === 0){
  //       $element.addClass('blank');
  //     } else if (cell===1){
  //       // Placeholder - Adds different class if contains letter
  //       $element.addClass('containsLetter');
  //     }
  //
  //     $element.appendTo('#map2');
  //   });
  // });

  // ###### PLAYER MOVEMENT LOGIC ######

  // 2.2.1 / 2.2.2 - Highlight starter cell
  // 2.3.2.2 - 7  - Player movement logic

  let playerOneCurrentIndex = 90; // player one start postion
  let playerTwoCurrentIndex = 99; // player two start randomPositionAssign
  let playerOnePreviousIndex;
  let playerTwoPreviousIndex;

  const $playerOneStartCell = $($('.map').children()[90]);
  $playerOneStartCell.addClass('playerStartCell');

  const $playerTwoStartCell = $($(document.getElementsByClassName('map')[1]).children()[99]);
  $playerTwoStartCell.addClass('playerStartCell');

  let $playerOnePreviousCell;
  let $playerOneCurrentCell;
  let $playerTwoCurrentCell;
  let $playerTwoPreviousCell;

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
      console.log('cant move left');
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
      console.log('cant move right');
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
      console.log('cant move up');
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
      console.log('cant move down');
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
      console.log('player two move left');
      moveLeft('player2', playerTwoCurrentIndex);
    }else if(code === 39){
      console.log('player two move right');
      moveRight('player2', playerTwoCurrentIndex);
    }else if(code === 38){
      console.log('player two move up');
      moveUp('player2', playerTwoCurrentIndex);
    }else if(code === 40){
      console.log('player two move down');
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

  //3.2 Random question generator
  const $displayQuestion = $('#display-question');
  let correctAnswer;
  let correctAnswerArray;

  function displayRandomQuestion(){
    // 3.2.1 - 6 Random question logic
    const randomNumber = Math.floor(Math.random()*capitalCitiesArray.length);
    correctAnswer = capitalCitiesArray[randomNumber][1];
    correctAnswerArray = correctAnswer.toLowerCase().split('');
    $displayQuestion.text(`${correctAnswerArray}`);
  }

  displayRandomQuestion(); // needs to be called before randomize array

  // 3.3.1-6 - Made the randomize letter logic
  //const playerOneAnswerArray = correctAnswerArray.slice(); //made a copy

  // 3.11.5 - Make randomise function work for two players
  function randomizeLetters(player){
    let arrayName = `${player}AnswerArray`;
    arrayName = correctAnswerArray.slice();

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

  const playerOneRandomizedLetters = randomizeLetters('playerOne');

  // 3.3.2 - Create logic to assign letter value to grid position
  let randomCellPosition;
  let $letterCell;

  // 3.11.9 - Make rando position assign for two player & Output random word on second grid two
  function randomPositionAssign(player, randomizedArray){
    if (player === 'player1'){
      randomizedArray.forEach(function(el){
        randomCellPosition = Math.floor(Math.random() * 100);

        $letterCell = $($('.map').children()[randomCellPosition]);
        $letterCell.addClass('containsLetter');
        $letterCell.text(`${el.toUpperCase()}`);
        //need to make exception if it picks the same number twice
      });
    } else if (player === 'player2'){
      randomizedArray.forEach(function(el){
        randomCellPosition = Math.floor(Math.random() * 100);

        $letterCell = $($('.map').children()[randomCellPosition]);
        $letterCell = $($(document.getElementsByClassName('map')[1]).children()[randomCellPosition]);
        $letterCell.addClass('containsLetter');
        $letterCell.text(`${el.toUpperCase()}`);
        //need to make exception if it picks the same number twice
      });
    }

  }

  randomPositionAssign('player1', playerOneRandomizedLetters);
  randomPositionAssign('player2', playerOneRandomizedLetters);


  // 3.5.1 - Make player answer logic
  const playerOneInputtedAnswer = [];
  const playerTwoInputtedAnswer = [];
  let playerOneLetterIndex = 0;
  let playerTwoLetterIndex = 0;

  function checkLetter(player, letter){
    if (player === 'player1' && letter === correctAnswerArray[playerOneLetterIndex]){
      playerOneInputtedAnswer.push(letter);
      playerOneLetterIndex = playerOneInputtedAnswer.length;
      console.log('correct letter! Get the next one!');
      removeLetter('player1');
      displayPlayerAnswers();
    } else if (player === 'player2' && letter === correctAnswerArray[playerTwoLetterIndex]) {
      playerTwoInputtedAnswer.push(letter);
      playerTwoLetterIndex = playerTwoInputtedAnswer.length;
      console.log('correct letter! Get the next one!');
      removeLetter('player2');
      displayPlayerAnswers();
    } else {
      console.log('Not the right letter!');
    }

    if (correctAnswerArray.length === playerOneInputtedAnswer.length || correctAnswerArray.length === playerTwoInputtedAnswer.length ){
      playAgain();
      scoreIterator(player);
    }
  }
  // 3.11.7 made pickup work for two players
  // 2.4.1-2 Keydown for enter button and pickup function
  function pickUp(player){
    let currentCellValue;
    if (player === 'player1') currentCellValue = $playerOneCurrentCell.html();
    if (player === 'player2') currentCellValue = $playerTwoCurrentCell.html();
    console.log(currentCellValue);
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

  // 3.9.1 playAgain funtion to reset board
  // 3.11.11 Made player again work for both players
  function playAgain(){
    console.log('Round finished');
    gameReset();
    displayRandomQuestion();
    randomPositionAssign('player1', randomizeLetters('playerOne'));
    randomPositionAssign('player2', randomizeLetters('playerTwo'));
  }

  // 3.11.12 Made player reset work for both players
  function gameReset(){
    playerOneInputtedAnswer.length = 0;
    console.log(playerOneInputtedAnswer);
    playerTwoInputtedAnswer.length = 0;
    console.log(playerTwoInputtedAnswer);
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

  let playerOneScore = 0;
  let playerTwoScore = 0;
  const $playerOneScoreDisplay = $('#player-one-score');
  const $playerTwoScoreDisplay = $('#player-two-score');
  $playerOneScoreDisplay.text('Player One Score: 0');
  $playerTwoScoreDisplay.text('Player Two Score: 0');

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

  // 3.7.1 setup function
  // function setup(){
  //   displayPlayerAnswer();
  //
  // }
  //
  // setup();
});
