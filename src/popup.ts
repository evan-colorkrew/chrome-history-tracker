const getLogs = async (): Promise<string[]> => {
  const storage = await chrome.storage.local.get('logs');
  const logs: string[] = storage.logs ? storage.logs : [];

  return logs;
};

const copyLogs = () => {
  getLogs().then((logs) => {
    navigator.clipboard.writeText(logs.join('\n'));
  });
};

const logsCopyButton = document.getElementById('logs-copy-button');
logsCopyButton?.addEventListener('click', () => {
  copyLogs();
});
