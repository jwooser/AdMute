chrome.runtime.onMessage.addListener(
    function(req, sender, sendResponse) {
        if (req.action == 'restart') {
            waitForVideo();
        }
    }
);

function isAdPlaying() {
    const mainVideo = document.getElementById("movie_player");
    if (mainVideo.classList.contains("ad-showing")) {
        return true;
    }
    return false;
}

function onPlay() {
    if (isAdPlaying()) {
        chrome.runtime.sendMessage({action: 'mute'});
    } else {
        chrome.runtime.sendMessage({action: 'unmute'});
    }
    
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