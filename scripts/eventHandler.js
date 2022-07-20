'use strict';
////////////////////////////////////////////////////////
//             Event Handler(Start, Stop)            //
//////////////////////////////////////////////////////
const lingBreaker = function (state) {
    window.stop();
    if (localStorage.lingBreakerState !== state) {
        localStorage.setItem('lingBreakerState', state);
    }
    location.reload();
};
// guziki w rozszerzeniu
chrome.runtime.onMessage.addListener(function (request) {
    lingBreaker(request);
});

// obsluga przyciskow z klawiatury (skroty klawiszowe)
// Escape(Esc) - stop // s/S - start
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowRight') {
        lingBreaker('on');
    } else if (event.key === 'ArrowLeft') {
        lingBreaker('off');
    }
});
//////////////////////////////////////////////////////
