//Players' inputs
const player1Name = document.querySelector('#player1-name');
const player2Name = document.querySelector('#player2-name');

//Start/Restart btns
const startBtn = document.querySelector('.start');

//Cells
const cells = document.querySelectorAll('.cell');

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
      }
      else {
        cell.textContent = player2.marker;
        isPlayer1Turn = true;
      }
      //console.log('cell clicked');
    })
  })
  //console.log(players);
}

startBtn.addEventListener('click', startGame);



