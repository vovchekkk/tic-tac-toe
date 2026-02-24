const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
const table = [[]]
startGame();
addResetListener();

function startGame() {
    renderGrid(3);
}

function renderGrid(dimension) {
    container.innerHTML = '';

    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        const rowTable = [];
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
            rowTable.push(-1);
        }
        table[i] = rowTable;
        container.appendChild(row);
    }
}

let moveCounter = 0;

let prevMove = ZERO;

let win_is_there = false;

function cellClickHandler(row, col) {
    if (win_is_there === true)
        return;
    if (table[row][col] !== -1)
        return;
    let move;
    if (prevMove === CROSS) {
        move = ZERO;
        table[row][col] = 0;
    } else {
        move = CROSS;
        table[row][col] = 1;
    }
    prevMove = move;

    moveCounter++;

    renderSymbolInCell(move, row, col);
    console.log(`Clicked on cell: ${row}, ${col}`);


    let resultArr = calcWinner(table);
    if (resultArr[0] !== -1) {
        win_is_there = true;
        drawWinnerCells(resultArr[1]);
        alertWinner(resultArr[0]);
        return;
    }
    if (moveCounter === 9) {
        alert("Победила дружба");
    }

    /* Пользоваться методом для размещения символа в клетке так:
        renderSymbolInCell(ZERO, row, col);
     */
}

function calcWinner(table) {
    for (let row = 0; row < table.length; row++) {
        let winArr = [];
        let cross_win = 0;
        let zero_win = 0;
        for (let col = 0; col < table.length; col++) {
            if (table[row][col] === 0) {
                zero_win++;
            } else if (table[row][col] === 1) {
                cross_win++;
            }
            winArr.push([row, col]);
        }
        if (zero_win === 3) {
            return [0, winArr];
        } else if (cross_win === 3) {
            return [1, winArr];
        } else {
            winArr = [];
        }
    }

    for (let row = 0; row < table.length; row++) {
        let winArr = [];
        let cross_win = 0;
        let zero_win = 0;
        for (let col = 0; col < table.length; col++) {
            if (table[col][row] === 0) {
                zero_win++;
            } else if (table[col][row] === 1) {
                cross_win++;
            }
            winArr.push([col, row]);
        }
        if (zero_win === 3) {
            return [0, winArr];
        } else if (cross_win === 3) {
            return [1, winArr];
        } else {
            winArr = [];
        }
    }
    //
    let winArr = [];
    let cross_win = 0;
    let zero_win = 0;
    for (let i = 0; i < table.length; i++) {
        if (table[i][i] === 0) {
            zero_win++;
        } else if (table[i][i] === 1) {
            cross_win++;
        }
        winArr.push([i, i]);
    }
    if (zero_win === 3) {
        return [0, winArr];
    } else if (cross_win === 3) {
        return [1, winArr];
    } else {
        winArr = [];
    }
    //
    winArr = [];
    cross_win = 0;
    zero_win = 0;
    for (let i = 0; i < table.length; i++) {
        if (table[i][2 - i] === 0) {
            zero_win++;
        } else if (table[i][2 - i] === 1) {
            cross_win++;
        }
        winArr.push([i, 2 - i]);
    }
    if (zero_win === 3) {
        return [0, winArr];
    } else if (cross_win === 3) {
        return [1, winArr];
    }

    return [-1, [-1, -1]];
}

function alertWinner(move) {
    if (move === 0)
        alert(`победили нолики`);
    else if (move === 1)
        alert(`победили крестики`);
}

function renderSymbolInCell(symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function drawWinnerCells(cellArray) {
    for (const cell of cellArray) {
        let htmlCell = findCell(cell[0], cell[1]);
        htmlCell.style.background = "red";
    }
}

function findCell(row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener() {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler() {
    moveCounter = 0;
    prevMove = ZERO;
    win_is_there = false;
    for (let row = 0; row < table.length; row++) {
        for (let col = 0; col < table[row].length; col++) {
            table[row][col] = -1;
            renderSymbolInCell(EMPTY, row, col);
            const cell = findCell(row, col);
            cell.style.background = "yellow";
        }
    }
    console.log('reset!');
}


/* Test Function */

/* Победа первого игрока */
function testWin() {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw() {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell(row, col) {
    findCell(row, col).click();
}
