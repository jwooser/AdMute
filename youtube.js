chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
    if (req.action == 'restart') {
        waitForVideo();
    }
    else if (req.action == "enable") {
        toggleMute()
    }
    else if (req.action == "disable") {
        chrome.runtime.sendMessage({action: 'unmute'});
    }
});

function isAdPlaying() {
    const mainVideo = document.getElementById("movie_player");
    if (mainVideo.classList.contains("ad-showing")) {
        return true;
    }
    return false;
}

function toggleMute() {
    if (isAdPlaying()) {
        chrome.runtime.sendMessage({action: 'mute'});
    } else {
        chrome.runtime.sendMessage({action: 'unmute'});
    }
}

function onPlay() {
    chrome.storage.local.get({enabled: true}).then((item) => {
        if (!item.enabled) {
            return;
        }
        toggleMute()
    });
}

function run() {
    const video = document.querySelector("video");
    if (video) {
        video.addEventListener("play", onPlay);
    }
}

function waitForVideo() {
    if (document.getElementsByClassName("html5-main-video").length == 0) {
        document.arrive(".html5-main-video", run);
    } else {
        run();
    }
}

waitForVideo()