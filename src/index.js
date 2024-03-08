function showCityData(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = response.data.temperature.current;
  let cityValue = document.querySelector("#city-value");
  cityValue.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
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
