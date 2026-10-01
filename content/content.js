console.log("========== YT AD REMOVER V3 LOADED ==========");

let lastAdState = false;

function checkForAd() {
    const player = document.querySelector(".html5-video-player");

    if (!player) {
        return;
    }

    const adShowing = player.classList.contains("ad-showing");

    // Ad just started
    if (adShowing && !lastAdState) {
        console.log("🚨 [YT Ad Remover] VIDEO AD STARTED");

        const video = document.querySelector(".html5-main-video");

        console.log("[YT Ad Remover] Video:", video);

        const buttons = document.querySelectorAll(
            ".ytp-ad-skip-button, " +
            ".ytp-ad-skip-button-modern, " +
            ".ytp-ad-skip-button-slot"
        );

        console.log(
            "[YT Ad Remover] Skip buttons:",
            buttons.length
        );

        buttons.forEach((button, index) => {
            console.log(
                `[YT Ad Remover] Button ${index}:`,
                button
            );
        });
    }

    // Ad is currently playing
    if (adShowing) {
        const skipButton = document.querySelector(
            ".ytp-ad-skip-button, " +
            ".ytp-ad-skip-button-modern, " +
            ".ytp-ad-skip-button-slot"
        );

        if (skipButton) {
            console.log(
                "⏭️ [YT Ad Remover] SKIP BUTTON FOUND"
            );

            skipButton.click();

            console.log(
                "✅ [YT Ad Remover] SKIP BUTTON CLICKED"
            );
        }
    }

    // Ad ended
    if (!adShowing && lastAdState) {
        console.log(
            "✅ [YT Ad Remover] VIDEO AD ENDED"
        );
    }

    lastAdState = adShowing;
}

const observer = new MutationObserver(() => {
    checkForAd();
});

observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
    subtree: true
});

setInterval(checkForAd, 500);

checkForAd();