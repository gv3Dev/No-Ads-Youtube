// ==UserScript==
// @name         No Ads - YouTube AdBlocker | Ad Skipper | Free YouTube Music | Ad Remover | Remove Adblock Warning
// @namespace    http://tampermonkey.net/
// @version      3.5
// @description  Skips all YouTube ads instantly and removes banners/overlays. Completely undetectable ad blocker. Enjoy ad-free YouTube music playlists and videos with no interruptions. Removes adblock detection warnings.
// @author       gv3dev
// @match        https://*.youtube.com/*
// @icon         https://i.ibb.co/ZMwwmXm/Screenshot-2024-08-22-at-12-05-51-AM-removebg-preview.png
// @grant        none
// @license      MIT
// @downloadURL  https://update.greasyfork.org/scripts/504197/No%20Ads%20-%20YouTube%20AdBlocker%20%7C%20Ad%20Skipper%20%7C%20Free%20YouTube%20Music%20%7C%20Ad%20Remover%20%7C%20Remove%20Adblock%20Warning.user.js
// @updateURL    https://update.greasyfork.org/scripts/504197/No%20Ads%20-%20YouTube%20AdBlocker%20%7C%20Ad%20Skipper%20%7C%20Free%20YouTube%20Music%20%7C%20Ad%20Remover%20%7C%20Remove%20Adblock%20Warning.meta.js
// ==/UserScript==



let ogVolume = 1, pbRate = 1, manualPause = false; // don't touch, only touch the line below [ if i add more features i'll make a GUI ;) ]


const should_Remove_Shorts = true // replace with false then save to allow shorts


document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        manualPause = true;
    }
});

document.addEventListener('play', () => {
    manualPause = false;
});

document.addEventListener('pause', () => {
    manualPause = true;
});

const manip = (actions) => {
    actions.forEach(({ selector, action, func }) => {
        let elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            if(element!==null && element!==undefined){
                if(element.style.display!=="none"){
                    if (action === 'remove') {
                        element.remove();
                    } else if (action === 'hide') {
                        element.style.display = "none";
                    } else if (action === 'click') {
                        element.click();
                    } else if (action === 'remove-run') {
                        element.remove();
                        eval(func);
                    }
                }
            }
        });
    });
};

const playVid = () => {
    const video = document.querySelector("video");
    if(!video.playing && !manualPause){
        video.play();
    }
}

Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
});


const removeShorts = () => {
    if(should_Remove_Shorts == true){
        document.querySelectorAll(".style-scope.ytd-rich-shelf-renderer #title-container").forEach((shelf) => {
            if (shelf.innerText === "Shorts") {
                shelf.closest('ytd-rich-shelf-renderer').remove();
            }
        });
    }
};

setInterval(() => {

    removeShorts();

    manip([
        { selector: "tp-yt-paper-dialog", action: 'remove-run', func: playVid},
        { selector: ".ytp-ad-overlay-close-button", action: 'click' },
        { selector: ".style-scope.ytd-watch-next-secondary-results-renderer.sparkles-light-cta.GoogleActiveViewElement", action: 'hide' },
        { selector: ".style-scope.ytd-item-section-renderer.sparkles-light-cta", action: 'hide' },
        { selector: ".ytp-ad-message-container", action: 'hide' },
        { selector: ".style-scope.ytd-companion-slot-renderer", action: 'remove' },
        { selector: "#masthead-ad", action: 'remove' },
        { selector: "ytd-ad-slot-renderer", action: 'remove' },
        { selector: "ytd-popup-container", action: 'click' },
        { selector: "ytd-reel-shelf-renderer", action: 'remove' }
    ]);

    let videoStream = document.querySelector(".video-stream.html5-main-video");
    if (videoStream) {
        let ad = document.querySelector(".video-ads.ytp-ad-module");
        if (ad === undefined) {
            pbRate = videoStream.playbackRate;
            videoStream.muted = false;
        }

        let skipAdButton = document.querySelector(".ytp-skip-ad-button");
        if (skipAdButton !== null) {
            skipAdButton.click();
        }

        if (ad !== null && ad.children.length > 0) {
            let previewText = document.querySelector(".ytp-ad-text[class*='ytp-ad-preview-text']");
            if (previewText !== undefined) {
                videoStream.playbackRate = 16;
                videoStream.currentTime += videoStream.duration;
                videoStream.muted = true;
            }
        }
    }
}, 10);

