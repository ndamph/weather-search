function getCityData(city) {
  let apiKey = "73fd7aeeb1fc6do18b8423c70f3b718t";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
}

function showCityInput(event) {
  event.preventDefault();
  let selectedCity = document.querySelector("#city-input");
  let cityValue = document.querySelector("#city-value");
  cityValue.innerHTML = selectedCity.value;

  getCityData(selectedCity.value);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCityInput);
