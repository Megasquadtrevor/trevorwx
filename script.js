document.getElementById("year").textContent = new Date().getFullYear();

const links = {
  discord: "https://discord.gg/8zdCut8fy6",
  radar: "https://app.weatherfront.com/",
  forecast: "",
  youtube: "https://www.youtube.com/@TrevorWX",
  chaserCams: "http://localhost:8001/ChaserDashboard/chaser-dashboard.html"
};

function openLink(url, fallbackMessage) {
  if (!url) {
    alert(fallbackMessage);
    return;
  }

  window.open(url, "_blank", "noopener");
}

document.getElementById("discordButton").addEventListener("click", (event) => {
  event.preventDefault();
  openLink(links.discord, "Add your Discord invite link in script.js first.");
});

document.getElementById("radarButton").addEventListener("click", (event) => {
  event.preventDefault();
  openLink(links.radar, "Add your radar link in script.js first.");
});

document.getElementById("forecastButton").addEventListener("click", (event) => {
  event.preventDefault();
  openLink(links.forecast, "Add your latest forecast video link in script.js first.");
});

document.getElementById("youtubeButton").addEventListener("click", (event) => {
  event.preventDefault();
  openLink(links.youtube, "Add your YouTube channel or live-stream link in script.js first.");
});

document.getElementById("chaserButton").addEventListener("click", (event) => {
  event.preventDefault();
  openLink(links.chaserCams, "Add your Chaser Cam dashboard link in script.js first.");
});

const alertStatus = document.getElementById("alertStatus");
const alertHeadline = document.getElementById("alertHeadline");
const alertLocation = document.getElementById("alertLocation");
const statusPanelType = document.getElementById("statusPanelType");
const statusPanelText = document.getElementById("statusPanelText");

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

function setAlertColor(color) {
  const safeColor = colorMap[color] || "#20b1f5";

  alertStatus.style.color = safeColor;
  document.querySelector(".alert-line").style.background =
    `linear-gradient(90deg, ${safeColor}, transparent)`;

  document.querySelector(".status-panel").style.borderColor = safeColor;
}

function updateAlertCard(data) {
  const highest = data.highest || {};
  const type = highest.type || "NO ACTIVE ALERT";
  const headline = highest.headline || "No active severe weather alerts";
  const location = highest.location || "Monitoring nationwide conditions";
  const color = highest.color || "none";

  const isClear = type === "NO ACTIVE ALERT";

  alertStatus.textContent = isClear ? "MONITORING" : "ACTIVE ALERT";
  alertHeadline.textContent = headline;
  alertLocation.textContent = location;

  statusPanelType.textContent = isClear ? "MONITORING NATIONWIDE" : type;
  statusPanelText.textContent = isClear
    ? "No active severe weather alert is currently leading the board."
    : `${headline} — ${location}`;

  setAlertColor(color);
}

async function loadAlertData() {
  try {
    const response = await fetch("../Broadcast/alert.json?cache=" + Date.now());

    if (!response.ok) {
      throw new Error("Could not load alert.json");
    }

    const data = await response.json();
    updateAlertCard(data);
  } catch (error) {
    console.log("Alert monitor data is not available yet:", error.message);
  }
}

loadAlertData();
setInterval(loadAlertData, 15000);