/*
    Created by: Wojciech Kowal aka HueJanus && Szymon 'Yeenc' Olszewski
*/
/*
    lingBreaker Copyright (C) 2021 Wojciech Kowal, Szymon Olszewski
    This extension comes with ABSOLUTELY NO WARRANTY.
    This is free software, and you are welcome to redistribute it
    under certain conditions.
*/
'use strict';

let dataBase = new Map();
// Obsluga bazy danych
if (localStorage.lingBreakerDataBase) {
    // importowanie bazy danych z localStorage
    dataBase = new Map(JSON.parse(localStorage.lingBreakerDataBase));
} else {
    localStorage.setItem('lingBreakerDataBase', '[[-69, ""]]');
}

// Main
// jesli status == 'on'->
if (localStorage.lingBreakerState === 'on') {
    // green button
    let greenButton = document.querySelector('.btn.btn-primary.w-100');
    const clickGreenBTN = function () {
        // jak klikniecie buttona sie nie uda to przechodzi na strone ze startem lekcji
        try {
            greenButton.click();
        } catch (err) {
            document.location.href = 'https://lingos.pl/students/start';
        }
    };

    // jesli istnieje input z id = answer
    if (document.getElementById('answer')) {
        let query = dataBase.size
            ? dataBase.get(document.getElementsByName('identifier')[0].value)
            : false;
        // jesli baza nie jest pusta oraz taki rekord istnieje w bazie
        if (query) {
            // wstaw odpowiedz z bazy do inputa z id answer
            document.getElementById('answer').value = query;
        } else {
            getIdentifierValue();
        }

        clickGreenBTN();

        // pozostale przypadki =>
    } else {
        if (document.querySelector('.btn.btn-danger.w-100')) {
            // jesli istnieje czerwonu button
            getAnswerValue();

            addToDataBase();
            document.querySelector('.btn.btn-danger.w-100').click();
        } else if (!document.getElementsByName('identifier')[0]) {
            // w innym przypadku, jesli nie ma identyfikatora slowka =>
            // jest to potwierdzenie poprawnosci wpisanego slowka
            clickGreenBTN();
        } else {
            // w innym przypadku oznacza to nowe slowko
            getIdentifierValue();
            getAnswerValue();

            addToDataBase();
            clickGreenBTN();
        }
    }
}

//////////////////////////////////////
//-------------funkcje-------------//
////////////////////////////////////
function getIdentifierValue() {
    let identifier;
    // get the identifier
    identifier = document.getElementsByName('identifier')[0].value;
    localStorage.setItem('tmpIdentifier', identifier);
}

////////////////////////////////////
function getAnswerValue() {
    let answer;
    // get the correct answer
    answer =
        document.getElementsByTagName('strong')[0]?.innerText ||
        document.querySelector('h3.mb-0.h3')?.innerText;
    localStorage.setItem('tmpAnswer', answer);
}

function addToDataBase() {
    let insert = JSON.stringify([
        localStorage.tmpIdentifier,
        localStorage.tmpAnswer,
    ]);

    // [[0, data], [1, data1]] => [[0, data], [1, data1]
    [localStorage.lingBreakerDataBase] = [
        localStorage.lingBreakerDataBase.slice(0, -1),
    ];
    // [[0, data], [1, data1] => [[0, data], [1, data1], [insert[0], insert[1]]
    localStorage.lingBreakerDataBase += `, ${insert}]`;
}
