document.getElementById("year").textContent = new Date().getFullYear();

const alertStatus = document.getElementById("alertStatus");
const alertHeadline = document.getElementById("alertHeadline");
const alertLocation = document.getElementById("alertLocation");
const alertUpdated = document.getElementById("alertUpdated");
const monitorStatus = document.getElementById("monitorStatus");
const coverageTitle = document.getElementById("coverageTitle");
const coverageText = document.getElementById("coverageText");
const heroDot = document.getElementById("heroDot");

const tornadoCount = document.getElementById("tornadoCount");
const severeCount = document.getElementById("severeCount");
const floodCount = document.getElementById("floodCount");
const watchCount = document.getElementById("watchCount");

const watchingTitle = document.getElementById("watchingTitle");
const watchingText = document.getElementById("watchingText");
const watchingUpdated = document.getElementById("watchingUpdated");

const colorMap = {
  none: "#29e784",
  yellow: "#ffd43b",
  green: "#31d47c",
  orange: "#ff9f43",
  red: "#ff3b4d",
  darkred: "#b70f23",
  pink: "#ff4fd8",
  purple: "#a96cff"
};

/*
  Edit this section whenever you want to post a TrevorWX update
  before a severe weather stream.
*/
const manualUpdate = {
  title: "What We’re Watching",
  text: "No major severe-weather setup is being highlighted right now. Check back for updates when conditions change.",
  updated: "TrevorWX Weather Center"
};

watchingTitle.textContent = manualUpdate.title;
watchingText.textContent = manualUpdate.text;
watchingUpdated.textContent = manualUpdate.updated;

function formatTime(isoTime) {
  if (!isoTime) return "Updated by TrevorWX Alert Monitor";

  const date = new Date(isoTime);

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short"
  });
}

function setAlertColor(color) {
  const safeColor = colorMap[color] || "#20b1f5";

  alertStatus.style.color = safeColor;
  heroDot.style.background = safeColor;
  heroDot.style.boxShadow = `0 0 12px ${safeColor}`;

  document.querySelector(".alert-line").style.background =
    `linear-gradient(90deg, ${safeColor}, transparent)`;
}

function updateSeverePage(data) {
  const highest = data.highest || {};
  const counts = data.counts || {};

  const type = highest.type || "NO ACTIVE ALERT";
  const headline = highest.headline || "No active severe weather alerts";
  const location = highest.location || "Monitoring nationwide conditions";
  const color = highest.color || "none";
  const isClear = type === "NO ACTIVE ALERT";

  alertStatus.textContent = isClear ? "MONITORING" : "ACTIVE ALERT";
  alertHeadline.textContent = headline;
  alertLocation.textContent = location;
  alertUpdated.textContent = formatTime(data.updated);
  monitorStatus.textContent = data.monitorStatus || "ONLINE";

  coverageTitle.textContent = isClear ? "Monitoring Nationwide" : type;
  coverageText.textContent = isClear
    ? "TrevorWX is monitoring current conditions. Major weather updates will appear here when active weather develops."
    : `${headline} is active for ${location}. Follow official National Weather Service warnings and local emergency instructions.`;

  tornadoCount.textContent = counts.tornado || 0;
  severeCount.textContent = counts.severe || 0;
  floodCount.textContent = counts.flashFlood || 0;
  watchCount.textContent = counts.watch || 0;

  setAlertColor(color);
}

async function loadAlertData() {
  try {
    const response = await fetch("../Broadcast/alert.json?cache=" + Date.now());

    if (!response.ok) {
      throw new Error("Could not load alert.json");
    }

    const data = await response.json();
    updateSeverePage(data);
  } catch (error) {
    alertStatus.textContent = "OFFLINE";
    alertHeadline.textContent = "Alert monitor data is unavailable";
    alertLocation.textContent = "Keep the TrevorWX alert monitor and local website server running.";
    alertUpdated.textContent = "Connection check failed";
    monitorStatus.textContent = "OFFLINE";
    console.log("Alert monitor data is not available:", error.message);
  }
}

loadAlertData();
setInterval(loadAlertData, 15000);