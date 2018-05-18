// 2.1.1 Created grid
const grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
    $playerOneCurrentCell = $('#map').children()[playerCurrentIndex];
    $playerOneCurrentCell.classList.add('playerCurrentCell');
  }

  // remove class form last cell
  function removeClassPlayerPreviousCell(){
    $playerOnePreviousCell = $('#map').children()[playerPreviousIndex];
    $playerOnePreviousCell.classList.remove('playerCurrentCell');
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
      // left
      moveLeft();
    }else if(code === 39){
      // right
      moveRight();
    }else if(code === 38){
      // top
      moveUp();
    }else if(code === 40){
      // bottom
      moveDown();
    }
  });
});
