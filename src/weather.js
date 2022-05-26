function transformDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `Last updated: ${day} ${hours}:${minutes}`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  //let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHtml = `<div class="row">`;

  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHtml += `<div class="col-2">
          <div class="weather-forecast-date">${formatForecastDay(
            forecastDay.dt
          )}</div>
          <img
            src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt="icon"
            width="50px"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-max-temp">${Math.round(
              forecastDay.temp.max
            )}°</span>
            <span class="weather-forecast-min-temp">${Math.round(
              forecastDay.temp.min
            )}°</span>
          </div>
        </div>`;
    }
  });
  forecastHtml += `</div>`;

  forecastElement.innerHTML = forecastHtml;
}

function receiveForecast(coordinates) {
  let apiKey = "e9dbb073ecb679b0932ba8a75a3681c8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#description");
  let temperatureElement = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let speedElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#weather-icon");

  celsiusDegrees = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  speedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = transformDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);
  //console.log(response.data.wind.speed)
  receiveForecast(response.data.coord);
}
function searchEngine(city) {
  let apiKey = "e9dbb073ecb679b0932ba8a75a3681c8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  //console.log(cityInput)
  searchEngine(cityInput.value);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemperature.classList.remove("active");
  fahrenheitTemperature.classList.add("active");
  let fahrenheitDegrees = (celsiusDegrees * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitDegrees);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitTemperature.classList.remove("active");
  celsiusTemperature.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusDegrees);
}

let celsiusDegrees = null;

let formInput = document.querySelector("#search-form");
formInput.addEventListener("submit", handleSubmit);

let celsiusTemperature = document.querySelector("#celsius-degrees");
celsiusTemperature.addEventListener("click", showCelsiusTemperature);

let fahrenheitTemperature = document.querySelector("#fahrenheit-temperature");
fahrenheitTemperature.addEventListener("click", showFahrenheitTemperature);

searchEngine("Nairobi");
//displayForecast();
