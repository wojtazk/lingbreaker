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
// Main //
if (localStorage.lingBreakerState === 'on') {
    lessonStarter();
}

//////////////////////////////
//---------funkcje---------//
////////////////////////////
function lessonStarter() {
    if (document.querySelector('.btn.disabled')) {
        try {
            modifyModal();
            checkForUpdates();
        } catch (err) {
            // console.warn('LingBreaker - Cannot modify modal!');
            console.log('LingBreaker - Cannot modify modal!');
        }
    } else {
        document.querySelector('.btn').click();
    }
}

//////////////////////////////////////////////////////
function modifyModal() {
    // zmienia zawartosc okienka dialogowego:) - jesli przycisk do rozpoczecia lekcji jest nieaktywny
    let dialogBody = document.querySelector('.modal-body');
    dialogBody.querySelector('.text-left.fw-bold.mb-5').textContent =
        'Wykonałem za cb wszystkie lekcje. Nie ma za co!!';

    for (const p of dialogBody.getElementsByTagName('p')) {
        p.textContent = '';
    }

    dialogBody.querySelector('.mb-0').textContent =
        'Lekcje na dzisiaj zrobione! W nagrodę pooglądaj sb obrazek.';

    let image = document.createElement('img');
    image.src = drawPhoto(); // losuje jakie zdj sie wyswietli xd
    dialogBody.querySelector('.mb-2').appendChild(document.createElement('br'));
    dialogBody.querySelector('.mb-2').appendChild(image);

    // losowanie obrazka
    function drawPhoto() {
        let mendaSpoleczna = [
            'https://i.imgur.com/52yT5We.png', // komenda
            'https://i.imgur.com/xqCVwMi.jpg', // Heisenberg(lysy) z breaking bad
            'https://i.imgur.com/QbtCLWN.png', // Mikolaj(pedofil)

            'https://picsum.photos/435/150', // lorem picsum
        ];

        let randomNum = Math.floor(Math.random() * 4);

        return mendaSpoleczna[randomNum];
    }
}

//////////////////////////////////////////////////////
async function checkForUpdates() {
    // funkcja sprawdza czy nie ma nowszej wersji rozszerzenia
    // jesli istnieje nowsza wersja => dodaje button do modala
    await fetch('https://api.github.com/repos/wojtazk/lingbreaker/tags')
        .then((data) => data.json())
        .then(function ([{ name: latestVersion }]) {
            // console.log(latestVersion, chrome.runtime.getManifest().version);
            if (latestVersion !== 'v' + chrome.runtime.getManifest().version) {
                addButton(latestVersion);
            }
        });
}

//////////////////////////////////////////////////////
function addButton(latestVersion) {
    // dodawanie przycisku do okienka dialogowego
    let button = document.createElement('a');
    button.className = 'btn new-btn-green';
    button.href = `https://github.com/WojTAzK/lingbreaker/releases/tag/${latestVersion}`;
    button.target = '_blank';
    button.textContent = `LingBreaker - Wykryto nowa wersje: ${latestVersion}`;
    button.style.fontWeight = 'bold';
    button.style.color = '#a72f50';

    document.querySelector('.modal-footer.border-0').appendChild(button);
}
