// ==UserScript==
// @name         No Ads Youtube - Youtube Ad Blocker
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Skips all YouTube ads instantly and undetectably, removes annoying elements.
// @author       GV3Dev
// @match        https://www.youtube.com/*
// @match        https://m.youtube.com/*
// @icon         https://i.ibb.co/X5f50Cg/Screen-Shot-2021-07-19-at-9-31-54-PM.png
// @grant        none
// ==/UserScript==

(function() {
    let originalPlaybackRate = 1;

    const selectAll = (selector) => document.querySelectorAll(selector);
    const selectFirst = (selector) => document.querySelector(selector);

    const hideElements = (...selectors) => {
        selectors.flat().forEach(selector => {
            selectAll(selector).forEach(element => element.style.display = 'none');
        });
    };

    const removeElements = (...selectors) => {
        selectors.flat().forEach(selector => {
            selectAll(selector).forEach(element => element.remove());
        });
    };

    const clickElements = (...selectors) => {
        selectors.flat().forEach(selector => {
            selectAll(selector).forEach(element => element.click());
        });
    };

    const handleAds = () => {
        const video = selectFirst('.video-stream.html5-main-video');
        if (!video) return;

        const adModule = selectFirst('.video-ads.ytp-ad-module');
        const adText = selectFirst('.ytp-ad-preview-text');

        if (adModule && adText) {
            video.playbackRate = 16;
            video.muted = true;
        } else {
            video.playbackRate = originalPlaybackRate;
            video.muted = false;
        }

        clickElements('.ytp-skip-ad-button', '.ytp-ad-overlay-close-button');
        hideElements(
            '.ytp-ad-message-container',
            '.style-scope.ytd-watch-next-secondary-results-renderer.sparkles-light-cta.GoogleActiveViewElement',
            '.style-scope.ytd-item-section-renderer.sparkles-light-cta'
        );
        removeElements(
            '#masthead-ad',
            'ytd-ad-slot-renderer',
            '.style-scope.ytd-companion-slot-renderer',
            'ytd-reel-shelf-renderer',
            '.ytd-popup-container',
            '.ytp-paid-content-overlay-link'
        );
    };

    const initObserver = () => {
        new MutationObserver(handleAds).observe(document.body, {
            childList: true,
            subtree: true,
        });
        handleAds();
    };

    try {
        initObserver();
    } catch (error) {}
})();
