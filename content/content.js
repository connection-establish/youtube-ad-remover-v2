
console.log("🚀 [YT Ad Remover] Loaded");

let adActive = false;

function handleAdState() {
    const player = document.querySelector("#movie_player");

    if (!player) {
        return;
    }

    const isAd =
        player.classList.contains("ad-showing") ||
        player.classList.contains("ad-interrupting");

    if (isAd && !adActive) {
        adActive = true;

        console.log(
            "🚨 [YT Ad Remover] AD DETECTED IMMEDIATELY"
        );

        console.log(
            "Player:",
            player
        );

        console.log(
            "Classes:",
            player.className
        );

        handleAd(player);
    }

    if (!isAd && adActive) {
        adActive = false;

        console.log(
            "✅ [YT Ad Remover] AD STATE CLEARED"
        );
    }
}

function handleAd(player) {
    /*
     * We deliberately do NOT click Skip.
     *
     * We also do NOT change the video.currentTime.
     *
     * The next stage will handle the ad before
     * the ad becomes visible/playable.
     */

    console.log(
        "🛡️ [YT Ad Remover] Handling ad..."
    );

    const adModule =
        player.querySelector(".video-ads");

    if (adModule) {
        console.log(
            "Ad module detected:",
            adModule
        );
    }
}

const observer = new MutationObserver(() => {
    handleAdState();
});

observer.observe(document.documentElement, {
    subtree: true,
    attributes: true,
    attributeFilter: [
        "class"
    ]
});

// Initial check
handleAdState();

console.log(
    "✅ [YT Ad Remover] MutationObserver running"
);
