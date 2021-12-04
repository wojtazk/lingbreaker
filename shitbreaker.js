/*
    Created by: Wojciech Kowal aka HueJanus && Szymon 'Yeenc' Olszewski
*/
let odpowiedz;

for (const scrpt of document.getElementsByTagName("script")) {
    if (scrpt.textContent.includes("let foo")) {
        odpowiedz = scrpt.textContent;

        let fooStart = odpowiedz.indexOf('"') + 1;
        let fooEnd = odpowiedz.indexOf(';') - 1;

        odpowiedz = odpowiedz.substr(fooStart, fooEnd - fooStart);
        break;
    }
}

if (odpowiedz) {
    if (document.getElementById("answer")) {
        document.getElementById("answer").value = odpowiedz;
    }
    else if (document.getElementById("learningFormAnswer")) {
        document.getElementById("learningFormAnswer").value = odpowiedz;
    }
    // green button
    document.getElementsByClassName("btn new-btn-green mx-auto")[0].click();

    // red button
    // document.getElementsByClassName("btn new-btn-danger mx-auto")[0].click();
} else {
    document.getElementsByClassName("btn new-btn-green mx-auto")[0].click();
}