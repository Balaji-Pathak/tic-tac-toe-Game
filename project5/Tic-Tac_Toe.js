const boxes = document.querySelectorAll('.box');
const resetBtn = document.querySelector('#reset-btn');
const newGameBtn = document.querySelector('#new-btn');
const msg = document.querySelector('#msg');
const msgContainer = document.querySelector('.msg-container');

let turnO = true;
let count = 0;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add('hide');
    msg.innerText = ''; 
};
boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (!box.textContent) {
            if (turnO) {
                box.textContent = 'O';
                turnO = false;
            } else {
                box.textContent = 'X';
                turnO = true;
            }
            box.disabled = true; 
            count++; 

            const isWinner = checkWinner();

            if (count === 9 && !isWinner) {
                gameDraw();
            }
        }
    });
});

const gameDraw = () => {
    msg.innerText = 'Game was a Draw.';
    msgContainer.classList.remove('hide');
    disableBoxes();
};

const disableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = true;
    });
};

const enableBoxes = () => {
    boxes.forEach(box => {
        box.disabled = false;
        box.textContent = '';
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove('hide');
    disableBoxes();
};
const checkWinner = () => {
    for (const pattern of winPatterns) {
        const [pos1, pos2, pos3] = pattern;
        const pos1Val = boxes[pos1].textContent;
        const pos2Val = boxes[pos2].textContent;
        const pos3Val = boxes[pos3].textContent;
        if (pos1Val && pos1Val === pos2Val && pos1Val === pos3Val) {
            showWinner(pos1Val);
            return true; 
        }
    }
    return false; 
};

newGameBtn.addEventListener('click', resetGame);

if (resetBtn) {
    resetBtn.addEventListener('click', resetGame);
}
