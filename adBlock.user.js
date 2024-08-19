// ==UserScript==
// @name         No ADS - YouTube
// @namespace    http://tampermonkey.net/
// @version      3.2
// @description  - Skips all YouTube ads - | - undetectable - | - skips ads instantly - | - adds volume control slider -
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

const createVolumeSlider = (video) => {
    const sliderContainer = document.createElement('div');
    sliderContainer.style = 'display: flex; align-items: center; margin: 10px; background: rgba(0, 0, 0, 0.5); padding: 5px; border-radius: 5px;';

    const sliderLabel = document.createElement('label');
    sliderLabel.innerText = 'Xtra Volume:';
    sliderLabel.style = 'margin-right: 10px; font-weight: bold; color: white;';

    const volumeSlider = document.createElement('input');
    volumeSlider.type = 'range';
    volumeSlider.min = '0';
    volumeSlider.max = '1000';
    volumeSlider.value = video.volume * 10;
    volumeSlider.style = 'width: 100px;';

    volumeSlider.addEventListener('input', (event) => {
        const volume = event.target.value / 100;
        video.volume = Math.min(volume, 1);
        if (gainNode) {
            gainNode.gain.value = volume;
        }
    });

    sliderContainer.appendChild(sliderLabel);
    sliderContainer.appendChild(volumeSlider);

    return sliderContainer;
};

// Function to set up the volume control
const volumeSetUp = (video) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(video);
    gainNode = audioContext.createGain();
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);
    return gainNode;
};

const addVolumeControl = (video) => {
    if (gainNode == null) {
        volumeSetUp(video);
        const existingSlider = document.querySelector('#custom-volume-slider');
        if (!existingSlider) {
            const slider = createVolumeSlider(video);
            slider.id = 'custom-volume-slider';
            slider.style.float = "right";
            let controls = document.querySelector("#actions-inner>#menu>ytd-menu-renderer.style-scope.ytd-watch-metadata");
            controls.parentElement.insertBefore(slider, controls);
        }
    }
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
