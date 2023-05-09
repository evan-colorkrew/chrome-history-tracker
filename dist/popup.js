"use strict";
const getLogs = async () => {
    const storage = await chrome.storage.local.get('logs');
    const logs = storage.logs ? storage.logs : [];
    return logs;
};
const copyLogs = () => {
    getLogs().then((logs) => {
        navigator.clipboard.writeText(logs.join('\n'));
    });
};
const logsCopyButton = document.getElementById('logs-copy-button');
logsCopyButton === null || logsCopyButton === void 0 ? void 0 : logsCopyButton.addEventListener('click', () => {
    copyLogs();
});
