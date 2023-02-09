chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
        if (req.action == "mute") {
            chrome.tabs.update(sender.tab.id, {muted: true});
        }
        else if (req.action == "unmute") {
            chrome.tabs.update(sender.tab.id, {muted: false});
        }
    }
);

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
    if (details.frameId == 0) {
        chrome.tabs.get(details.tabId).then((tab) => {
            const url = new URL(tab.url)
            if (url.hostname == "www.youtube.com") {
                chrome.tabs.sendMessage(tab.id, {action: 'restart'});
            }
        });
    }
});

chrome.action.onClicked.addListener((tab) => {
    chrome.storage.local.get({enabled: true}).then((item) => {
        const isEnabled = !item.enabled;
        chrome.storage.local.set({enabled: isEnabled});
        let actionString;
        if (isEnabled) {
            chrome.action.setIcon({path: 'icons/enabled/icon48.png'});
            actionString = 'enable'
        } else {
            chrome.action.setIcon({path: 'icons/disabled/icon48.png'});
            actionString = 'disable'
        }
        chrome.tabs.query({url: "*://www.youtube.com/*"}).then((tabs) => {
            const message = {action: actionString};
            tabs.forEach((tab) => chrome.tabs.sendMessage(tab.id, message));
        });
    });
})