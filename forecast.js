document.getElementById("year").textContent = new Date().getFullYear();

/*
  Paste your newest YouTube forecast video link between the quotation marks.
*/
const latestForecastUrl = "";

/*
  Update these after each forecast recording.
*/
const forecastInfo = {
  title: "Coon Rapids & Twin Cities Forecast",
  headline: "Check back for the latest TrevorWX forecast video and weather update.",
  nextUpdate: "Forecasts posted regularly",
  updated: "TrevorWX Weather Center",
  days: [
    { short: "MON", day: "Monday", icon: "☀", text: "Update forecast", high: "--°" },
    { short: "TUE", day: "Tuesday", icon: "☀", text: "Update forecast", high: "--°" },
    { short: "WED", day: "Wednesday", icon: "☁", text: "Update forecast", high: "--°" },
    { short: "THU", day: "Thursday", icon: "☁", text: "Update forecast", high: "--°" },
    { short: "FRI", day: "Friday", icon: "☀", text: "Update forecast", high: "--°" },
    { short: "SAT", day: "Saturday", icon: "☀", text: "Update forecast", high: "--°" },
    { short: "SUN", day: "Sunday", icon: "☁", text: "Update forecast", high: "--°" }
  ]
};

document.getElementById("latestTitle").textContent = forecastInfo.title;
document.getElementById("videoTitle").textContent = forecastInfo.title;
document.getElementById("forecastHeadline").textContent = forecastInfo.headline;
document.getElementById("nextUpdate").textContent = forecastInfo.nextUpdate;
document.getElementById("forecastUpdated").textContent = forecastInfo.updated;

function openForecast(event) {
  event.preventDefault();

  if (!latestForecastUrl) {
    alert("Paste your latest YouTube forecast link into forecast.js first.");
    return;
  }

  window.open(latestForecastUrl, "_blank", "noopener");
}

document.getElementById("latestVideoButton").addEventListener("click", openForecast);
document.getElementById("videoTextLink").addEventListener("click", openForecast);

function renderForecastDays() {
  const grid = document.getElementById("forecastGrid");

  grid.innerHTML = forecastInfo.days.map((day) => `
    <article>
      <span>${day.short}</span>
      <div class="weather-icon">${day.icon}</div>
      <strong>${day.day}</strong>
      <p>${day.text}</p>
      <b>${day.high}</b>
    </article>
  `).join("");
}

renderForecastDays();