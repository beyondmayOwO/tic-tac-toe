const Game = (() => {
  //Players' inputs
  const player1Name = document.querySelector('#player1-name');
  const player2Name = document.querySelector('#player2-name');

  //Start/Restart btns
  const start = document.querySelector('.start');
  const restart = document.querySelector('.restart');

  //Cells
  const cells = document.querySelectorAll('.cell');

  //Result section
  const result = document.querySelector('.result');

  //Dialog
  const dialog = document.querySelector('dialog');
  const closeDialog = document.querySelector('.close-dialog');
  const welcomeText = document.querySelector('.welcome-text');

  const players = []

  //player factory
  function player(name, marker) {
    return { name, marker }
  }

  //Check the winner
  function checkWin(playerName, marker) {
    const winCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ]

    //Loop each combo in the combinations. Inside the loop --> equals the cell index with each combo index and check their text contents have the same marker or not. It equals, the winner name is displayed
    for(let combo of winCombos) {
      if(
        cells[combo[0]].textContent === marker &&
        cells[combo[1]].textContent === marker &&
        cells[combo[2]].textContent === marker
      ) {
        result.textContent = `${playerName} won!`;
      }
    }
  }

  //Check the tie
  function checkTie() {
    if(emptyCells === 0) {
      result.textContent = "It's a tie";
    }
  }

  //Flag to determine the player1 is playing or not
  let isPlayer1Turn = true;

  //Number of empty cells total
  let emptyCells = 9;

  function startGame() {
    //Create the players objects
    const player1 = player(player1Name.value, 'X');
    const player2 = player(player2Name.value, 'O');
    players.push(player1, player2);


    //Players playing on the board, taking each turn
    cells.forEach(cell => {
      cell.addEventListener('click', () => {
        if (isPlayer1Turn) {
          cell.textContent = player1.marker;
          isPlayer1Turn = false;

          //Check the winner after every mark
          checkWin(player1.name, player1.marker);
        }
        else {
          cell.textContent = player2.marker;
          isPlayer1Turn = true;

          //Check the winner after every mark
          checkWin(player2.name, player2.marker);
        }

        //Decrese the number of empty cells after every mark
        emptyCells--;

        checkTie();
      })
    })
  }

  //Restart the game
  function restartGame() {
    cells.forEach(cell => {
      cell.textContent = '';
    })

    emptyCells = 9;
    isPlayer1Turn = true;
    result.textContent = '';
  }

  start.addEventListener('click', () => {
    dialog.showModal();
    startGame();
  });

  closeDialog.addEventListener('click', () => {
    dialog.close();
  })

  restart.addEventListener('click', restartGame);

  return {
    startGame,
    restartGame
  }
})();
