// 2.1.1 Created grid
const grid = [
  [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
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
  const $playerOneStartCell = $('#map').children()[90];
  $playerOneStartCell.classList.add('playerStartCell');

  // Highlight player active cell on hover
  $('#map').on('mouseover', 'div', function(){
    this.classList.add('playerCellActive');
  });

  // 2.3.1 - Map keys to moves
  $(document).keydown(function(e) {
    const code = e.keyCode;
    if(code === 37){
      // left
      console.log('left');
    }else if(code === 39){
      // right
      console.log('right');
    }else if(code === 38){
      // top
      console.log('up');
    }else if(code === 40){
      // bottom
      console.log('down');
    }
  });
});
