const addLog = async (url: string) => {
  const date = new Date();
  const timestamp =
    date.getFullYear() +
    String(date.getMonth() + 1).padStart(2, '0') +
    String(date.getDate()).padStart(2, '0') +
    String(date.getHours()).padStart(2, '0') +
    String(date.getMinutes()).padStart(2, '0') +
    String(date.getSeconds()).padStart(2, '0');

  const storage = await chrome.storage.local.get('logs');
  const logs: string[] = storage.logs ? storage.logs : [];

  logs.push(`${timestamp} ${url}`);

  chrome.storage.local.set({ logs: logs.slice(-600) });
};

chrome.tabs.onActivated.addListener(
  async (tabActiveInfo: chrome.tabs.TabActiveInfo) => {
    chrome.tabs.get(tabActiveInfo.tabId, (tab) => {
      if (tab.url) {
        addLog(tab.url);
      }
    });
  },
);

chrome.tabs.onUpdated.addListener(
  (
    _tabId: number,
    changeInfo: chrome.tabs.TabChangeInfo,
    tab: chrome.tabs.Tab,
  ) => {
    if (tab.active && changeInfo.url) {
      addLog(changeInfo.url);
    }
  },
);
