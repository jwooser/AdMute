chrome.runtime.onMessage.addListener(
    function(req, sender, sendResponse) {
        if (req.action == "mute") {
            chrome.tabs.update(sender.tab.id, {muted: true});
        }
        else if (req.action == "unmute") {
            chrome.tabs.update(sender.tab.id, {muted: false});
        }
    }
);

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    if (details.frameId == 0) {
        chrome.tabs.get(details.tabId, function(tab) {
            const url = new URL(tab.url)
            if (url.hostname == "www.youtube.com") {
                chrome.tabs.sendMessage(tab.id, {action: 'restart'});
            }
        });
    }
});
