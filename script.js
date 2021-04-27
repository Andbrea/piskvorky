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

let croft = document.querySelectorAll('.croft');
croft.forEach(croftItem => croftItem.addEventListener('click', main)); 

