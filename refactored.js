function moveLeft(indexChangeFunction, feedbackDiv, playerIndex){
  if (playerIndex === 0 || playerIndex % 10 === 0) {
    const msg = 'You can\'t move left. Try to move another direction.';
    displayFeedback(feedbackDiv, msg);

    if (player === 'player1'){
      // playerOneFeedback = 'You can\'t move left. Try to move another direction.';
      // displayFeedback();
      displayFeedback($playerOneFeedbackDisplay, msg);
    } else if (player === 'player2') {
      // playerTwoFeedback = 'You can\'t move left. Try to move another direction.';
      // displayFeedback();
      displayFeedback($playerTwoFeedbackDisplay, msg);
    }
  } else {
    indexChangeFunction(-1, playerIndex);
    if (player === 'player1'){
      playerOneIndexChange(-1, playerIndex);
    } else if (player === 'player2') {
      playerTwoIndexChange(-1, playerIndex);
    }
  }
}


function moveLeft(indexChangeFunction, feedbackDiv, playerIndex){
  if (playerIndex === 0 || playerIndex % 10 === 0) {
    const msg = 'You can\'t move left. Try to move another direction.';
    displayFeedback(feedbackDiv, msg);
  } else {
    indexChangeFunction(-1, playerIndex);
  }
}
