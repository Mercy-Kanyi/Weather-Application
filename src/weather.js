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
  days = [
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

function showTemperature(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#description");
  let temperatureElement = document.querySelector("#temperature");
  let humidity = document.querySelector("#humidity");
  let speedElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#date");
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  speedElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = transformDate(response.data.dt * 1000);
}

let apiKey = "e9dbb073ecb679b0932ba8a75a3681c8";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Nairobi&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(showTemperature);
