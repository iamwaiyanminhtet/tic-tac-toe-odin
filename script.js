const game = (function (document) {
    const cells = document.querySelectorAll('.cells');
    const displatTurn = document.querySelector('#display-turn');
    const winnerDisplay = document.querySelector('#winnerDisplay');
    const restartBtn = document.querySelector('#restart-btn');
    let playerMarkerArray = ["","","","","","","","",""];
    let currentPlayer = "X";
    let running = true;
    const winConditions = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    function restartOrReset (e) {
        cells.forEach((cell) => {
            cell.innerText = "";
            cell.style.backgroundColor = 'transparent';
        });
        playerMarkerArray = ["","","","","","","","",""];
        currentPlayer = "X";
        running = true;
        if (!winnerDisplay.classList.contains('visibility-hidden')) {
            winnerDisplay.classList.add('visibility-hidden');
        }
        displatTurn.innerText = `Player X's turn`;
        if (displatTurn.classList.contains('playerO')) {
            displatTurn.classList.remove('playerO');
            displatTurn.classList.add('playerX');
        }
    }


    // game main function
    function initialize () {
        // iterate throught 9 cells and display ui and check winner
        cells.forEach((cell,index) => {
            cell.addEventListener('click', (e) => {
            if(e.target.innerText === "" && running === true) {
                e.target.innerText = currentPlayer;
                if(currentPlayer === "X") {
                    e.target.style.backgroundColor = "#374A67"
                }
                if(currentPlayer === "O") {
                    e.target.style.backgroundColor = "#94D1BE"
                }
                playerMarkerArray[index] = currentPlayer;
                checkWinner(playerMarkerArray)
                if (checkWinner(playerMarkerArray)) {
                    winnerDisplay.classList.remove('visibility-hidden');
                    winnerDisplay.innerText = `${currentPlayer} WON`;
                    running = false;
                    restartBtn.classList.remove('visibility-hidden');
                    restartBtn.addEventListener('click', () => {
                        restartOrReset();
                        restartBtn.classList.add('visibility-hidden');
                    });
                }
                changePlayer();
            }
            });
        });
    
        function changePlayer () {
            if (currentPlayer === "X") {
                displatTurn.classList.remove('playerX');
                displatTurn.classList.add('playerO');
            }
            if (currentPlayer === "O") {
                displatTurn.classList.remove('playerO');
                displatTurn.classList.add('playerX');
            }
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            displatTurn.innerText = `Player ${currentPlayer}'s turn`;
        }
    
        function checkWinner(playerMarkerArray) {
            let winRound = false;
            winConditions.forEach(winCondition => {
                const a = playerMarkerArray[winCondition[0]];
                const b = playerMarkerArray[winCondition[1]];
                const c = playerMarkerArray[winCondition[2]];
                if(a === "" || b === "" || c ==="") {
                    return
                };
                if(a === b && b === c) {
                    return winRound = true;
                }
            });
            return winRound;
        }
    }

    return {initialize,restartOrReset}
})(document);
game.initialize();

const resetBtn = document.querySelector('#reset-btn');
resetBtn.addEventListener('click', game.restartOrReset);