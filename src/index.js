function showCityData(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = response.data.temperature.current;
  let cityValue = document.querySelector("#city-value");
  let conditionElement = document.querySelector("#condition");
  let condition = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  let humidity = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  let wind = response.data.wind.speed;
  let dateElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let tempIconElement = document.querySelector("#temp-icon");
  let tempIcon = `<img src="${response.data.condition.icon_url}" class="current-temp-emoji"/>`;

  cityValue.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  conditionElement.innerHTML = condition;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = wind;
  dateElement.innerHTML = formatDate(date);
  tempIconElement.innerHTML = tempIcon;

  getForecast(response.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function getCityData(city) {
  let apiKey = "73fd7aeeb1fc6do18b8423c70f3b718t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityData);
}

function showCityInput(event) {
  event.preventDefault();
  let selectedCity = document.querySelector("#city-input");

  getCityData(selectedCity.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCityInput);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "73fd7aeeb1fc6do18b8423c70f3b718t";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data.daily);

  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        ` <div class="weather-forecast-column">
        <div class="weather-forecast-day">${formatDay(day.time)}</div>
        <img
        class="weather-forecast-icon"
        src="${day.condition.icon_url}"
        alt=""
        />
        <div class="weather-forecast-temp">
        <span class="weather-forecast-temp-max">${Math.round(
          day.temperature.maximum
        )}º</span>
        <span class="weather-forecast-temp-separater">|</span>
        <span class="weather-forecast-temp-min">${Math.round(
          day.temperature.minimum
        )}º</span>
        </div>
        </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

getCityData("Winnipeg");
getForecast("Winnipeg");
