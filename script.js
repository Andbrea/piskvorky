'use strict'

let circle = document.querySelector('.circleOrCross');
let actualPlayer= 'circle';

let main = (event) => {
    let square = event.target;
    if (square.className !== 'croft' && 'circle') {
        return;
    }
    if (actualPlayer === 'circle') {
        square.classList.add('board__field--circle');
        actualPlayer = 'cross';
        circle.src = 'obrazky/cross.svg';

    } else if (actualPlayer === 'cross') {
        square.classList.add('board__field--cross');
        actualPlayer = 'circle';
        circle.src = 'obrazky/circle.svg';
    }
};

const getSymbol = (field) => {
	// Název třídy přizpůsob tvému kódu.
	if (field.classList.contains('board__field--cross')) {
		return 'cross'
	} else if (field.classList.contains('board__field--circle')) {
		return 'circle'
	}
}


const boardSize = 10 // 10x10
const fields = document.querySelectorAll('.croft'); // Selektor pozměň tak, aby odpovídal tvému kódu.

const getField = (row, column) => fields[row * boardSize + column];

const getPosition = (field) => {
	let fieldIndex = 0
	while (fieldIndex < fields.length && field !== fields[fieldIndex]) {
		fieldIndex++
	}

	return {
		row: Math.floor(fieldIndex / boardSize),
		column: fieldIndex % boardSize,
	}	
}
 


const symbolsToWin = 5
const isWinningMove = (field) => {
	const origin = getPosition(field)
	const symbol = getSymbol(field)

	let i

	let inRow = 1 // Jednička pro právě vybrané políčko
	// Koukni doleva
	i = origin.column
	while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
		inRow++
		i--
	}

	// Koukni doprava
	i = origin.column
	while (
		i < boardSize - 1 &&
		symbol === getSymbol(getField(origin.row, i + 1))
	) {
		inRow++
		i++
	}

	if (inRow >= symbolsToWin) {
		return true
	}

	let inColumn = 1
	// Koukni nahoru
	i = origin.row
	while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
		inColumn++
		i--
	}

	// Koukni dolu
	i = origin.row
	while (
		i < boardSize - 1 &&
		symbol === getSymbol(getField(i + 1, origin.column))
	) {
		inColumn++
		i++
	}

	if (inColumn >= symbolsToWin) {
		return true

	}

	return false
}

let croft = document.querySelectorAll('.croft');
croft.forEach(croftItem => croftItem.addEventListener('click', (event) => {
	main(event); 
	let winner = '';
	if (isWinningMove(event.target) === true) {
		if (actualPlayer === 'circle'){
			winner = 'Křížek';
		} else if (actualPlayer === 'cross'){
			winner = 'Kolečko';
		}
		let newGame = confirm(`Vítěz je: ${winner}. Chceš si dát ještě jednu?`);
		if (newGame === true){
		location.reload();
		}
	}
}));
