document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('start').addEventListener('click', function () {
        chrome.tabs.query(
            { currentWindow: true, active: true },
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, 'on');
            }
        );
    });

    document.getElementById('stop').addEventListener('click', function () {
        chrome.tabs.query(
            { currentWindow: true, active: true },
            function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, 'off');
            }
        );
    });
});
