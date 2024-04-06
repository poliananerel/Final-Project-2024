function updateData (response) {
let temperatureElement = document.querySelector ("#temperature");
let temperature = response.data.temperature.current;
let cityElement = document.querySelector ("#city");
let conditionElement = document.querySelector ("#condition");
let humidityElement = document.querySelector ("#humidity");
let windElement = document.querySelector ("#wind-speed");
let timeElement = document.querySelector ("#time");
let date = new Date (response.data.time *1000);

let iconElement = document.querySelector ("#icon");
iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

cityElement.innerHTML = response.data.city;
conditionElement.innerHTML = response.data.condition.description;

temperatureElement.innerHTML = Math.round (temperature);
humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
windElement.innerHTML = `${response.data.wind.speed}km/h`;
timeElement.innerHTML = formatDate(date);
}

function formatDate (date) {
let minutes = date.getMinutes();
let hours = date.getHours ();
let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
let day = days[date.getDay()];

return `${day} ${hours}:${minutes}`;
if (minutes < 10) {
minutes = `0${minutes}`;
}
}

function searchCity (city) {
let apiKey = "3fcbcf71bf84at645394b5ao7a59f3f0";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get (apiUrl).then(updateData);
}


function searchSubmit (event) {
event.preventDefault ();
let searchInput = document.querySelector ("#search-input");
searchCity (searchInput.value);
}

function getForecast (city)  {
let apiKey = "3fcbcf71bf84at645394b5ao7a59f3f0";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get (apiUrl).then(displayForecast);
}

function displayForecast(response) {
console.log (response);
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
        <div class="weather-forecast-icon">🌤️</div>
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature">
            <strong>15º</strong> |
          </span>
          <span class="weather-forecast-temperature">9º</span>
        </div>
      </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector ("#search-form");
searchFormElement.addEventListener ("submit", searchSubmit);

searchCity ("Tel Aviv");
displayForecast ();