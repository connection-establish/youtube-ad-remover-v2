javascript
console.log("========== YT AD REMOVER V2 LOADED ==========");

let lastAdState = false;
let lastSkipTime = 0;

const SKIP_COOLDOWN = 500;

// Check whether the YouTube player is currently showing an ad
function isAdShowing() {
    const player = document.querySelector(".html5-video-player");

    if (!player) {
        return false;
    }

    return player.classList.contains("ad-showing");
}

// Find and click YouTube's skip button
function skipAd() {
    const now = Date.now();

    // Prevent repeatedly clicking the same button
    if (now - lastSkipTime < SKIP_COOLDOWN) {
        return;
    }

    const skipButton = document.querySelector(
        ".ytp-ad-skip-button, " +
        ".ytp-ad-skip-button-modern, " +
        ".ytp-ad-skip-button-slot"
    );

    if (!skipButton) {
        return;
    }

    console.log("[YT Ad Remover] Skip button found:", skipButton);

    if (
        !skipButton.disabled &&
        skipButton.offsetParent !== null
    ) {
        console.log(
            "⏭️ [YT Ad Remover] Clicking skip button"
        );

        skipButton.click();

        lastSkipTime = now;
    }
}

// Check the current YouTube ad state
function checkForVideoAd() {
    const player = document.querySelector(
        ".html5-video-player"
    );

    if (!player) {
        return;
    }

    const adShowing = player.classList.contains(
        "ad-showing"
    );

    // Advertisement started
    if (adShowing && !lastAdState) {
        console.log(
            "🚨 [YT Ad Remover] VIDEO AD STARTED"
        );

        const video = document.querySelector(
            ".html5-main-video"
        );

        console.log(
            "[YT Ad Remover] Video element:",
            video
        );
    }

    // Advertisement is active
    if (adShowing) {
        skipAd();
    }

    // Advertisement ended
    if (!adShowing && lastAdState) {
        console.log(
            "✅ [YT Ad Remover] VIDEO AD ENDED"
        );
    }

    lastAdState = adShowing;
}

// Watch YouTube's dynamic DOM changes
const observer = new MutationObserver(() => {
    checkForVideoAd();
});

observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
    subtree: true
});

// Backup checker because YouTube changes its DOM frequently
setInterval(() => {
    checkForVideoAd();
}, 500);

// Initial check
checkForVideoAd();

