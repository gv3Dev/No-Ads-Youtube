// ==UserScript==
// @name         No ADS - YouTube
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  - Skips all youtube ads - | - undetectable - | - skips ads instantly -
// @author       gv3dev
// @match        https://www.youtube.com/*
// @match        https://m.youtube.com/*
// @icon         https://i.ibb.co/X5f50Cg/Screen-Shot-2021-07-19-at-9-31-54-PM.png
// @grant        none
// ==/UserScript==

let ogVolume=1,pbRate = 1;setInterval(()=>{
    if(document.getElementsByClassName("video-stream html5-main-video")[0]!==undefined){let ad = document.getElementsByClassName("video-ads ytp-ad-module")[0];
        let vid = document.getElementsByClassName("video-stream html5-main-video")[0];if(ad==undefined){pbRate = vid.playbackRate};
        let closeAble = document.getElementsByClassName("ytp-ad-overlay-close-button");for(let i=0;i<closeAble.length;i++){closeAble[i].click()};
        if(document.getElementsByClassName("style-scope ytd-watch-next-secondary-results-renderer sparkles-light-cta GoogleActiveViewElement")[0]!==undefined)
        {let sideAd=document.getElementsByClassName("style-scope ytd-watch-next-secondary-results-renderer sparkles-light-cta GoogleActiveViewElement")[0];sideAd.style.display="none";}
        if(document.getElementsByClassName("style-scope ytd-item-section-renderer sparkles-light-cta")[0]!==undefined)
        {let sideAd_ = document.getElementsByClassName("style-scope ytd-item-section-renderer sparkles-light-cta")[0];sideAd_.style.display="none";}
        if(document.getElementsByClassName("ytp-ad-text ytp-ad-skip-button-text")[0]!==undefined){let skipBtn=document.getElementsByClassName("ytp-ad-text ytp-ad-skip-button-text")[0];skipBtn.click();}
        if(document.getElementsByClassName("ytp-ad-message-container")[0]!==undefined){let incomingAd=document.getElementsByClassName("ytp-ad-message-container")[0];incomingAd.style.display="none";}
        if(document.getElementsByClassName("style-scope ytd-companion-slot-renderer")[0]!==undefined){document.getElementsByClassName("style-scope ytd-companion-slot-renderer")[0].remove();}
        if(ad!==undefined){if(ad.children.length>0){if(document.getElementsByClassName("ytp-ad-text ytp-ad-preview-text")[0]!==undefined)
        {vid.playbackRate=16;vid.muted=true;}}}if(document.getElementById("masthead-ad")!==null){let headerAd=document.getElementById("masthead-ad");headerAd.remove();}
        if(document.getElementsByTagName("ytd-ad-slot-renderer")[0]!==undefined){let rightSideAd=document.getElementsByTagName("ytd-ad-slot-renderer")[0];rightSideAd.remove();}
        if(document.getElementsByTagName("ytd-reel-shelf-renderer")[0]!==undefined){let rightSideShorts=document.getElementsByTagName("ytd-reel-shelf-renderer")[0];rightSideShorts.remove();}}
},100);
