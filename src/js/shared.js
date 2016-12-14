'use strict';

function getRelevatControls() {
    if (isMobile()) {
        toggleSidePanel(true);

        document.querySelector('body').classList.remove('desktop');
        document.querySelector('body').classList.add('mobile');
        document.querySelector('.desktop-only').style.display = 'none';
        document.querySelector('.mobile-only').style.display = null;
    }
    else {
        document.querySelector('body').classList.remove('mobile');
        document.querySelector('body').classList.add('desktop');
        document.querySelector('.desktop-only').style.display = null;
        document.querySelector('.mobile-only').style.display = 'none';
    }
}

function isMobile() {
    return window.innerWidth <= 700;
}

function rndRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray(array) {
    let index = array.length, valueTemp, indexRandom;

    while (0 !== index) {
        indexRandom = Math.floor(Math.random() * index);
        index--;

        valueTemp = array[index];
        array[index] = array[indexRandom];
        array[indexRandom] = valueTemp;
    }

    return array;
}

function daysDiff(first, second) {
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
}

function toggleSidePanel(force = false) {
    let panel = document.querySelector('.side-panel');

    if (panel.classList.contains('opened') || force) {
        panel.classList.remove('opened');
        panel.classList.add('closed');

        //document.querySelector('section').style.filter = 'blur(0)';
    }
    else {
        panel.classList.remove('closed');
        panel.classList.add('opened');

        //document.querySelector('section').style.filter = 'blur(10px)';
    }
}
