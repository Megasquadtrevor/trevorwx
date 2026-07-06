document.getElementById("year").textContent = new Date().getFullYear();

/*
  Add your real links between the quotation marks.
*/
const links = {
  youtube: "https://www.youtube.com/@TrevorWX",
  discord: "https://discord.gg/8zdCut8fy6",
  chaserCams: "http://localhost:8001/ChaserDashboard/chaser-dashboard.html",
  forecast: ""
};

/*
  Change this to true before a live stream.
  Change it back to false when you are done.
*/
const isLive = false;

const liveStatus = document.getElementById("liveStatus");
const liveMessage = document.getElementById("liveMessage");
const statusBar = document.getElementById("statusBar");
const statusTime = document.getElementById("statusTime");
const streamBadge = document.getElementById("streamBadge");
const videoTitle = document.getElementById("videoTitle");
const videoText = document.getElementById("videoText");
const watchingTitle = document.getElementById("watchingTitle");
const watchingText = document.getElementById("watchingText");
const watchingUpdated = document.getElementById("watchingUpdated");
const liveDot = document.querySelector(".live-dot");

function openLink(url, fallbackMessage) {
  if (!url) {
    alert(fallbackMessage);
    return;
  }

  window.open(url, "_blank", "noopener");
}

function setLiveStatus() {
  if (isLive) {
    liveStatus.textContent = "LIVE NOW";
    liveStatus.style.color = "#29e784";
    liveMessage.textContent = "TrevorWX is live with current weather coverage.";
    statusBar.style.width = "100%";
    statusBar.style.background = "#29e784";
    statusTime.textContent = "Live coverage is active";

    streamBadge.textContent = "LIVE";
    streamBadge.style.color = "#29e784";
    streamBadge.style.borderColor = "#29e784";

    videoTitle.textContent = "TrevorWX is live right now";
    videoText.textContent = "Click Watch on YouTube to join the broadcast.";

    watchingTitle.textContent = "Live Weather Coverage";
    watchingText.textContent = "TrevorWX is currently live. Check the stream and Discord for the latest coverage updates.";
    watchingUpdated.textContent = "Coverage active now";

    liveDot.style.background = "#29e784";
    liveDot.style.boxShadow = "0 0 10px #29e784";
  }
}

setLiveStatus();

document.getElementById("watchButton").addEventListener("click", (event) => {
  event.preventDefault();
  openLink(links.youtube, "Add your YouTube channel or live-stream link in live.js first.");
});

document.getElementById("youtubeTextLink").addEventListener("click", (event) => {
  event.preventDefault();
  openLink(links.youtube, "Add your YouTube channel or live-stream link in live.js first.");
});

document.getElementById("discordButton").addEventListener("click", (event) => {
  event.preventDefault();
  openLink(links.discord, "Add your Discord invite link in live.js first.");
});

document.getElementById("discordTextLink").addEventListener("click", (event) => {
  event.preventDefault();
  openLink(links.discord, "Add your Discord invite link in live.js first.");
});

document.getElementById("chaserButton").addEventListener("click", (event) => {
  event.preventDefault();
  openLink(links.chaserCams, "Add your Chaser Cam dashboard link in live.js first.");
});

document.getElementById("forecastButton").addEventListener("click", (event) => {
  event.preventDefault();
  openLink(links.forecast, "Add your latest forecast video link in live.js first.");
});