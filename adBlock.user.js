// ==UserScript==
// @name         No ADS - YouTube
// @namespace    http://tampermonkey.net/
// @version      3.2
// @description  - Skips all YouTube ads - | - undetectable - | - skips ads instantly - 
// @author       gv3dev
// @match        https://*.youtube.com/*
// @icon         https://i.ibb.co/X5f50Cg/Screen-Shot-2021-07-19-at-9-31-54-PM.png
// @grant        none
// ==/UserScript==

let ogVolume = 1, pbRate = 1, cover = null, gainNode = null;

const manip = (actions) => {
    actions.forEach(({ selector, action, func }) => {
        let elements = document.querySelectorAll(selector);
        elements.forEach(element => {
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
        });
    });
};


function playVid(){
    document.querySelector("video").play();
}



setInterval(() => {
    if (location.href == "https://www.youtube.com/" || location.href == "https://m.youtube.com/") {
        document.querySelectorAll(".style-scope.ytd-rich-shelf-renderer #title-container").forEach((shelf) => {
            if (shelf.innerText == "Shorts") {
                shelf.closest('ytd-rich-shelf-renderer').remove();
            }
        });
    }

    manip([
        {selector: "tp-yt-paper-dialog", action: 'remove-run', func: playVid()},
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
            if (cover !== null) {
                cover.remove();
            }
            pbRate = videoStream.playbackRate;
            videoStream.muted = false;
        };


        let skipAdButton = document.querySelector(".ytp-skip-ad-button");
        if (skipAdButton !== null) {
            skipAdButton.click();
        }

        if (ad !== null && ad.children.length > 0) {
            let previewText = document.querySelector(".ytp-ad-text[class*='ytp-ad-preview-text']");
            if (previewText !== undefined) {
                let vid = document.querySelector("video");
                let w = vid.clientWidth;
                let h = vid.clientHeight;
                videoStream.playbackRate = 16;
                videoStream.currentTime += videoStream.duration;
                videoStream.muted = true;
            }
        }
    }
}, 10);
