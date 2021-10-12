// api key

const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description p');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');

// App data
const weather = {};
weather.temperature = {
  unit: 'celsius'
};

const KELVIN = 273;
const key = '274918570fabc0e6ac63aef1ded7756d';

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = 'block';
  notificationElement.innerHTML = `<p>Browser doesn't support Geolocalization</p>`;
}

// Set User Position
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  getWeather(latitude, longitude);
}

// show error 
function showError(error) {
  notificationElement.style.display = 'block';
  notificationElement.innerHTML = `<p> ${error.message}</p>`;
}

// Get weather from api provider
function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
  // console.log(api);

  fetch(api).then((res) => {
    let data = res.json();
    return data;
  })
  .then((data) => {
    weather.temperature.value = Math.floor(data.main.temp - KELVIN);
    weather.description = data.weather[0].description;
    weather.iconId = data.weather[0].icon;
    weather.city = data.name;
    weather.country = data.sys.country;
  })
  .then(() => {
    displayWeather();
  })
}

// Display Weather to UI
function displayWeather() {
  iconElement.innerHTML = `<img src="../images/${weather.iconId}.png"/>`;
  tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
  descElement.innerHTML = weather.description;
  locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}