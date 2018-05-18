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

// 3.1. Sample data

// const capitalCitiesObject = {
//   England: 'London',
//   France: 'Paris',
//   Germany: 'Berlin'
// };

const capitalCitiesArray = [
  ['England', 'London'],
  ['France', 'Paris'],
  ['Germany', 'Berlin']
];

$(() => {
  console.log('JS Log');

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

      $element.appendTo('#map');
    });
  });

  // 2.2.1 / 2.2.2 - Highlight starter cell
  // 2.3.2.2 - 7  - Player movement logic
  let playerCurrentIndex = 90; // start postion
  let playerPreviousIndex;
  const $playerOneStartCell = $('#map').children()[90];
  $playerOneStartCell.classList.add('playerStartCell');
  let $playerOnePreviousCell;
  let $playerOneCurrentCell;

  // add class to current cell
  function addClassPlayerCurrentCell(){
    $playerOneCurrentCell = $($('#map').children()[playerCurrentIndex]);
    $playerOneCurrentCell.addClass('playerCurrentCell');
  }

  // remove class form last cell
  function removeClassPlayerPreviousCell(){
    $playerOnePreviousCell = $($('#map').children()[playerPreviousIndex]);
    $playerOnePreviousCell.removeClass('playerCurrentCell');
  }

  // move left function
  function moveLeft(){
    if (playerCurrentIndex === 0 || playerCurrentIndex % 10 === 0) {
      console.log('cant move left');
    } else {
      playerPreviousIndex = playerCurrentIndex;
      playerCurrentIndex = playerCurrentIndex - 1;
      addClassPlayerCurrentCell();
      removeClassPlayerPreviousCell();
    }
  }

  // move right function
  function moveRight(){
    if (playerCurrentIndex === 9 || playerCurrentIndex === 19 || playerCurrentIndex === 29 || playerCurrentIndex === 39 || playerCurrentIndex === 49 || playerCurrentIndex === 59 || playerCurrentIndex === 69 || playerCurrentIndex === 79 || playerCurrentIndex === 89 || playerCurrentIndex === 99) {
      console.log('cant move right');
    } else {
      playerPreviousIndex = playerCurrentIndex;
      playerCurrentIndex = playerCurrentIndex + 1;
      addClassPlayerCurrentCell();
      removeClassPlayerPreviousCell();
    }
  }

  // move up function
  function moveUp(){
    if (playerCurrentIndex < 10){
      console.log('cant move up');
    } else {
      playerPreviousIndex = playerCurrentIndex;
      playerCurrentIndex = playerCurrentIndex - 10;
      addClassPlayerCurrentCell();
      removeClassPlayerPreviousCell();
    }
  }

  // move down function
  function moveDown(){
    if (playerCurrentIndex > 89){
      console.log('cant move down');
    } else {
      playerPreviousIndex = playerCurrentIndex;
      playerCurrentIndex = playerCurrentIndex + 10;
      addClassPlayerCurrentCell();
      removeClassPlayerPreviousCell();
    }
  }

  // 2.3.1 Key mappings
  $(document).keydown(function(e) {
    const code = e.keyCode;
    if(code === 37){
      moveLeft();
    }else if(code === 39){
      moveRight();
    }else if(code === 38){
      moveUp();
    }else if(code === 40){
      moveDown();
    }
    if (code === 13){
      pickUp();
    }
  });

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
  const playerOneAnswerArray = correctAnswerArray.slice(); //made a copy

  function randomizeLetters(array){
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  const playerOneRandomizedLetters = randomizeLetters(playerOneAnswerArray);

  // 3.3.2 - Create logic to assign letter value to grid position
  let randomCellPosition;
  let $letterCell;

  function randomPositionAssign(randomizedArray){
    randomizedArray.forEach(function(el){
      randomCellPosition = Math.floor(Math.random() * 100);

      $letterCell = $($('#map').children()[randomCellPosition]);
      $letterCell.addClass('containsLetter');
      $letterCell.text(`${el.toUpperCase()}`);
      //need to make exception if it picks the same number twice
    });
  }

  randomPositionAssign(playerOneRandomizedLetters);

  // 3.5.1 - Make player answer logic
  const playerOneInputtedAnswer = [];
  let currentLetterIndex = playerOneInputtedAnswer.length;
  console.log(currentLetterIndex);

  function checkLetter(letter){
    if (letter === correctAnswerArray[currentLetterIndex]){
      playerOneInputtedAnswer.push(letter);
      currentLetterIndex = playerOneInputtedAnswer.length;
      console.log(currentLetterIndex);
      console.log('correct letter! Get the next one!');
      removeLetter();
    } else {
      console.log('Not the right letter!');
    }
  }

  // 2.4.1-2 Keydown for enter button and pickup function
  function pickUp(){
    const currentCellValue = $playerOneCurrentCell.html();
    console.log(currentCellValue);
    checkLetter(currentCellValue.toLowerCase());
  }

  // 3.6.1 Remove letter from cell and normalise class
  function removeLetter(){
    console.log($playerOneCurrentCell);
    $playerOneCurrentCell.removeClass('containsLetter');
    $playerOneCurrentCell.text('');
  }


});
