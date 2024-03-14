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
  console.log(response);

  cityValue.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  conditionElement.innerHTML = condition;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = wind;
  dateElement.innerHTML = formatDate(date);
  tempIconElement.innerHTML = tempIcon;
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

getCityData("Winnipeg");

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Fri", "Sat", "Sun", "Mon", "Tue"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      ` <div class="weather-forecast-column">
          <div class="weather-forecast-day">${day}</div>
          <img
            class="weather-forecast-icon"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAYxJREFUaN7tmMERgyAQRS2BEizBEizBEiyBEizBEizBEiyB679Zgh1sLpsMIRgRAZOZdeYfNBPY94FdoCKi6p9VCYAACIAACIAAvF5OPgAUgBHACoAsrfxdVQmfpAAAOgCbE7irDUD3cwAA+oPAXXW3AABoAczs5MKuqwDnfSOhigJwsG4gDc9titDA/x8cNbkAPhbmzvcUMiEgwQDslNvJwr9RRvWpAFpP4xOAOjMAfRuJIAArt3vTYQEAEw3Awa8e55WVkeiuUQgBmD2ZQxUM/NVvLIDPeVM4+CQA603OXwZ4uq13MlEpLVah0wDqUADNDdzp/p7Gs5WYflDTvwMQgP4OgM2ey1zRdcSulgCY0gDGKoQTL9CJ3+00vbAO24zdjcY6rzhg78LcOabOKQCGBAAh6bhnwM0poNNVABU5R23V3wI5qAN7/ZszR8rOc4IKFrexXIDvPe22ya5VDq5bngs2dhTbrNcqBwAmUQIYiwNk2EPp0gBNrp2pXO4KgAAIgAAIgAAIgAC86wECCuvGtH3EIQAAAABJRU5ErkJggg=="
            alt=""
          />
          <div class="weather-forecast-temp">
            <span class="weather-forecast-temp-max">18º</span>
            <span class="weather-forecast-temp-separater">|</span>
            <span class="weather-forecast-temp-min">12º</span>
          </div>
        </div>`;
  });
  forecastElement.innerHTML = forecastHtml;
}
displayForecast();
