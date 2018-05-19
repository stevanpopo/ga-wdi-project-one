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
  // let playerCurrentIndex = 90; // player one start postion
  // let playerPreviousIndex;
  // const $playerOneStartCell = $($('.map').children()[90]);
  // $playerOneStartCell.addClass('playerStartCell');
  // let $playerOnePreviousCell;
  // let $playerOneCurrentCell;

  let playerOneCurrentIndex = 90; // player one start postion
  let playerTwoCurrentIndex = 99; // player two start randomPositionAssign
  let playerOnePreviousIndex;
  let playerTwoPreviousIndex;

  const $playerOneStartCell = $($('.map').children()[90]);
  $playerOneStartCell.addClass('playerStartCell');

  const $playerTwoStartCell = $($(document.getElementsByClassName('map')[1]).children()[99]);
  $playerTwoStartCell.addClass('playerStartCell');

  let $playerOnePreviousCell;
  let $playerCurrentCell;
  let $playerTwoCurrentCell;
  let $playerTwoPreviousCell;

  // add class to current cell
  function addClassPlayerCurrentCell(player, index){
    if (player === 'player1'){
      $playerCurrentCell = $($('.map').children()[index]);
      $playerCurrentCell.addClass('playerCurrentCell');
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

  // move left function
  function moveLeft(player, playerIndex){
    if (playerIndex === 0 || playerIndex % 10 === 0) {
      console.log('cant move left');
    } else {
      if (player === 'player1'){
        playerOnePreviousIndex = playerIndex;
        playerOneCurrentIndex = playerIndex - 1;
        addClassPlayerCurrentCell(player, playerOneCurrentIndex);
        removeClassPlayerPreviousCell(player, playerOnePreviousIndex);
      } else if (player === 'player2') {
        playerTwoPreviousIndex = playerIndex;
        playerTwoCurrentIndex = playerIndex - 1;
        addClassPlayerCurrentCell(player, playerTwoCurrentIndex);
        removeClassPlayerPreviousCell(player, playerTwoPreviousIndex);
      }
    }
  }

  // move right function
  function moveRight(player, playerIndex){
    if (playerIndex === 9 || playerIndex === 19 || playerIndex === 29 || playerIndex === 39 || playerIndex === 49 || playerIndex === 59 || playerIndex === 69 || playerIndex === 79 || playerIndex === 89 || playerIndex === 99) {
      console.log('cant move right');
    } else {
      if (player === 'player1'){
        playerOnePreviousIndex = playerIndex;
        playerOneCurrentIndex = playerIndex + 1;
        addClassPlayerCurrentCell(player, playerOneCurrentIndex);
        removeClassPlayerPreviousCell(player, playerOnePreviousIndex);
      } else if (player === 'player2') {
        playerTwoPreviousIndex = playerIndex;
        playerTwoCurrentIndex = playerIndex + 1;
        addClassPlayerCurrentCell(player, playerTwoCurrentIndex);
        removeClassPlayerPreviousCell(player, playerTwoPreviousIndex);
      }
    }
  }

  // move up function
  function moveUp(player, playerIndex){
    if (playerIndex < 10){
      console.log('cant move up');
    } else {
      if (player === 'player1'){
        playerOnePreviousIndex = playerIndex;
        playerOneCurrentIndex = playerIndex - 10;
        addClassPlayerCurrentCell(player, playerOneCurrentIndex);
        removeClassPlayerPreviousCell(player, playerOnePreviousIndex);
      } else if (player === 'player2') {
        playerTwoPreviousIndex = playerIndex;
        playerTwoCurrentIndex = playerIndex - 10;
        addClassPlayerCurrentCell(player, playerTwoCurrentIndex);
        removeClassPlayerPreviousCell(player, playerTwoPreviousIndex);
      }
    }
  }

  // move down function
  function moveDown(player, playerIndex){
    if (playerIndex > 89){
      console.log('cant move down');
    } else {

      if (player === 'player1'){
        playerOnePreviousIndex = playerIndex;
        playerOneCurrentIndex = playerIndex + 10;
        addClassPlayerCurrentCell(player, playerOneCurrentIndex);
        removeClassPlayerPreviousCell(player, playerOnePreviousIndex);
      } else if (player === 'player2') {
        playerTwoPreviousIndex = playerIndex;
        playerTwoCurrentIndex = playerIndex + 10;
        addClassPlayerCurrentCell(player, playerTwoCurrentIndex);
        removeClassPlayerPreviousCell(player, playerTwoPreviousIndex);
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
      pickUp(); //player 1 pickup
    }
    // if (code === 21){
    //   pickUp(); // player 2 pickup
    // }
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
  let playerOneAnswerArray;

  function randomizeLetters(){
    playerOneAnswerArray = correctAnswerArray.slice();

    let currentIndex = playerOneAnswerArray.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = playerOneAnswerArray[currentIndex];
      playerOneAnswerArray[currentIndex] = playerOneAnswerArray[randomIndex];
      playerOneAnswerArray[randomIndex] = temporaryValue;
    }
    return playerOneAnswerArray;
  }

  const playerOneRandomizedLetters = randomizeLetters();

  // 3.3.2 - Create logic to assign letter value to grid position
  let randomCellPosition;
  let $letterCell;

  function randomPositionAssign(randomizedArray){
    randomizedArray.forEach(function(el){
      randomCellPosition = Math.floor(Math.random() * 100);

      $letterCell = $($('.map').children()[randomCellPosition]);
      $letterCell.addClass('containsLetter');
      $letterCell.text(`${el.toUpperCase()}`);
      //need to make exception if it picks the same number twice
    });
  }

  randomPositionAssign(playerOneRandomizedLetters);

  // 3.5.1 - Make player answer logic
  const playerOneInputtedAnswer = [];
  let currentLetterIndex = playerOneInputtedAnswer.length;

  function checkLetter(letter){
    if (letter === correctAnswerArray[currentLetterIndex]){
      playerOneInputtedAnswer.push(letter);
      currentLetterIndex = playerOneInputtedAnswer.length;
      console.log('correct letter! Get the next one!');
      removeLetter();
      displayPlayerAnswer();
    } else {
      console.log('Not the right letter!');
    }

    if (correctAnswerArray.length === playerOneInputtedAnswer.length){
      playAgain();
      scoreIterator();
    }
  }

  // 2.4.1-2 Keydown for enter button and pickup function
  function pickUp(){
    const currentCellValue = $playerCurrentCell.html();
    checkLetter(currentCellValue.toLowerCase());
  }

  // 3.6.1 Remove letter from cell and normalise class
  function removeLetter(){
    $playerCurrentCell.removeClass('containsLetter');
    $playerCurrentCell.text('');
  }

  // 3.7.1 Display user answer on screen
  const $displayPlayerAnswer = $('#player-one-answer');
  function displayPlayerAnswer(){
    $displayPlayerAnswer.text(`Your answer: ${playerOneInputtedAnswer}`);
  }

  // 3.9.1 playAgain funtion to reset board
  function playAgain(){
    console.log('Round finished');
    displayRandomQuestion();
    randomPositionAssign(randomizeLetters());
    gameReset();
  }

  function gameReset(){
    playerOneInputtedAnswer.length = 0;
    currentLetterIndex = 0;
  }

  let playerOneScore = 0;
  const $playerOneScoreDisplay = $('#player-one-score');

  // 3.10.1 create scoreIterator logic
  function scoreIterator(){
    playerOneScore ++;
    $playerOneScoreDisplay.text(`Player One Score: ${playerOneScore}`);
  }

  // 3.7.1 setup function
  // function setup(){
  //   displayPlayerAnswer();
  //
  // }
  //
  // setup();
});
