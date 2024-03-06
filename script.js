//Players' inputs
const player1Name = document.querySelector('#player1-name');
const player2Name = document.querySelector('#player2-name');

//Start/Restart btns
const startBtn = document.querySelector('.start');

//Cells
const cells = document.querySelectorAll('.cell');

//Result section
const result = document.querySelector('.result');

const players = []

//player factory
function player(name, marker) {
  return { name, marker }
}

function startGame() {
  //Create the players objects
  const player1 = player(player1Name.value, 'X');
  const player2 = player(player2Name.value, 'O');
  players.push(player1, player2);

  //Players playing on the board, taking each turn
  let isPlayer1Turn = true;

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
      //console.log('cell clicked');
    })
  })
  //console.log(players);
}

startBtn.addEventListener('click', startGame);

//Check the winner
function checkWin(playerName, marker) {
  //Winning combinations
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