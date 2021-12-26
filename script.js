window.addEventListener('DOMContentLoaded', () => {
    const blocks = Array.from(document.querySelectorAll('.block'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    let board = ['', '', '','', '', '','', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PlayerX_Won = 'PlayerX_Won';
    const PlayerO_Won = 'PlayerO_Won';
    const Tie = 'Tie';

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (var i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }
        if (roundWon) {
            announce(currentPlayer === 'X' ? PlayerX_Won : PlayerO_Won);
            isGameActive = false;
            return;
        }
        if (!board.includes('')) {
            announce(Tie);
        }
    }

    const announce = (type) => {
        switch (type) {
            case PlayerO_Won:
                announcer.innerHTML = 'Player <span class="PlayerO">O</span> Won';
                break;
            case PlayerX_Won:
                announcer.innerHTML = 'Player <span class="PlayerX">X</span> Won';
                break;
            case Tie:
                announcer.innerHTML = 'Tie';
        }
        announcer.classList.remove('hide');
    }; 

    const isValidAction = (block) => {
        if (block.innerText === 'X' || block.innerText === 'O') {
            return false;
        }
        return true;
    };
    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const ChangePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (block, index) => {
        if (isValidAction(block) && isGameActive) {
            block.innerText = currentPlayer;
            block.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            ChangePlayer();
        }
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            ChangePlayer();
        }

        blocks.forEach(block => {
            block.innerText = '';
            block.classList.remove('playerX');
            block.classList.remove('playerO');
        });
    }

    blocks.forEach((block, index) => {
        block.addEventListener('click', () => userAction(block, index));
    });
    resetButton.addEventListener('click', resetBoard);
});