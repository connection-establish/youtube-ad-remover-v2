console.log("[YT Ad Remover] Sponsor handler loaded");

let sponsorSegments = [];
let currentVideoId = null;
let skippedSegments = new Set();

/**
 * Get the current YouTube video ID
 */
function getVideoId() {
    const url = new URL(window.location.href);
    return url.searchParams.get("v");
}

/**
 * Get the YouTube video element
 */
function getVideoElement() {
    return document.querySelector("video");
}

/**
 * Set sponsor segments for the current video.
 *
 * Example:
 * [
 *   { start: 125, end: 158 },
 *   { start: 420, end: 455 }
 * ]
 */
function setSponsorSegments(segments) {
    if (!Array.isArray(segments)) {
        console.warn(
            "[YT Ad Remover] Invalid sponsor segments"
        );
        return;
    }

    sponsorSegments = segments
        .filter(segment => {
            return (
                typeof segment.start === "number" &&
                typeof segment.end === "number" &&
                segment.start >= 0 &&
                segment.end > segment.start
            );
        })
        .sort((a, b) => a.start - b.start);

    skippedSegments.clear();

    console.log(
        "[YT Ad Remover] Sponsor segments:",
        sponsorSegments
    );
}

/**
 * Reset when the user changes videos
 */
function checkVideoChange() {
    const videoId = getVideoId();

    if (!videoId) {
        return;
    }

    if (videoId !== currentVideoId) {
        currentVideoId = videoId;

        sponsorSegments = [];
        skippedSegments.clear();

        console.log(
            "[YT Ad Remover] New video:",
            videoId
        );
    }
}

/**
 * Check whether the current playback position
 * is inside a sponsor segment.
 */
function checkSponsorSegment() {
    const video = getVideoElement();

    if (!video) {
        return;
    }

    const currentTime = video.currentTime;

    sponsorSegments.forEach((segment, index) => {

        if (
            currentTime >= segment.start &&
            currentTime < segment.end
        ) {

            if (skippedSegments.has(index)) {
                return;
            }

            console.log(
                "[YT Ad Remover] Sponsor segment detected"
            );

            console.log(
                `[YT Ad Remover] ${segment.start}s → ${segment.end}s`
            );

            skippedSegments.add(index);

            // Jump to the end of the sponsor segment
            video.currentTime = segment.end;

            console.log(
                "[YT Ad Remover] Sponsor segment skipped"
            );
        }
    });
}

/**
 * Monitor YouTube navigation
 */
setInterval(() => {
    checkVideoChange();
    checkSponsorSegment();
}, 250);

/**
 * Make the handler available to content.js
 */
window.YTAdRemoverSponsorHandler = {
    setSponsorSegments
};