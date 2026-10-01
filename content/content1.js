
console.log("========== YT AD REMOVER V2 LOADED ==========");

let adWasDetected = false;
let lastAdAction = 0;

function getPlayer() {
    return document.querySelector(".html5-video-player");
}

function getVideo() {
    return document.querySelector(
        ".html5-main-video"
    );
}

function handleVideoAd() {
    const player = getPlayer();

    if (!player) {
        return;
    }

    const adShowing =
        player.classList.contains("ad-showing");

    if (!adShowing) {
        if (adWasDetected) {
            console.log(
                "[YT Ad Remover] Advertisement finished"
            );

            adWasDetected = false;
        }

        return;
    }

    const now = Date.now();

    // Prevent repeatedly executing the same action
    if (now - lastAdAction < 1000) {
        return;
    }

    lastAdAction = now;

    if (!adWasDetected) {
        console.log(
            "🚨 YouTube video advertisement detected"
        );

        adWasDetected = true;
    }

    const video = getVideo();

    if (video) {
        console.log(
            "[YT Ad Remover] Ad video detected:",
            video
        );
    }

    // Look for YouTube's skip button
    const skipButton =
        document.querySelector(
            ".ytp-ad-skip-button"
        ) ||
        document.querySelector(
            ".ytp-ad-skip-button-modern"
        );

    if (skipButton) {
        console.log(
            "[YT Ad Remover] Skip button found"
        );

        skipButton.click();

        return;
    }

    console.log(
        "[YT Ad Remover] Skip button not available yet"
    );
}

const observer = new MutationObserver(() => {
    handleVideoAd();
});

observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
    subtree: true
});

setInterval(handleVideoAd, 500);

handleVideoAd();