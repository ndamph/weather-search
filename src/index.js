function showCityInput(event) {
  event.preventDefault();
  let selectedCity = document.querySelector("#city-input");
  let cityValue = document.querySelector("#city-value");
  cityValue.innerHTML = selectedCity.value;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showCityInput);
