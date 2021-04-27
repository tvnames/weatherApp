var APIkey = "fd1c13bf23db0924aed5c9df0e47d7a5";
var cityName = "";
var button = document.querySelector("#searchBtn");
var input = document.querySelector("#searchInput");
const locationDiv = document.getElementById("innerHtml");
var citySearch = document.getElementById("citiesCard");
var cityLook = document.getElementById("cityLook");

var savedCities = [];

if (localStorage.getItem("cities") !== null) {
  const savedCitiesStringified = localStorage.getItem("cities");
  savedCities = JSON.parse(savedCitiesStringified);
  // citySearch.textContent = cityName;
  console.log(savedCities);

  const savedCitiesUl = document.getElementById("cityList");
  console.log(savedCitiesUl);
  for (let i = 0; i < savedCities.length; i++) {
    var node = document.createElement("LI"); // Create a <li> node
    var textnode = document.createTextNode(savedCitiesStringified); // Create a text node
    node.appendChild(textnode); // Append the text to <li>
    document.getElementById("cityList").appendChild(node);
  }
}

// function displayCities() {

// button.addEventListener("click", function(event) {
//   localStorage.setItem('cities', cityName);
//   event.preventDefault();
// });
// }
// displayCities(cityName);

// var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`;

// fetch(requestUrl)
//   .then(function (response) {
//     console.log(response.body);
//     return response.json();
//   })
//   .then(function (data) {
//     var locationDiv = document.querySelector(".location");
//     console.log(data);

//     locationDiv = data.name;

//     var tempDiv = document.querySelector("temp");
//     console.log(tempDiv);
//     var kelvFar = ((data.main.temp - 273.15) * 9) / 5 + 32;
//     tempDiv.innerHTML = Math.floor(kelvFar);
//   });

button.addEventListener("click", function (event) {
  event.preventDefault();

  cityName = input.value;
  console.log(input.value);
  requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`;

  fetch(requestUrl)
    .then(function (response) {
      savedCities.push(cityName);
      const savedCitiesStringify = JSON.stringify(savedCities);

      localStorage.setItem("cities", savedCitiesStringify);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var locationDiv = document.querySelector(".location");
      console.log(locationDiv);

      locationDiv.innerHTML = data.name;
      console.log(data);

      var tempDiv = document.querySelector(".temp");
      console.log(tempDiv);
      var kelvFar = ((data.main.temp - 273.15) * 9) / 5 + 32;
      tempDiv.innerHTML = Math.floor(kelvFar);
      getWindspeed(data.coord);
      getHumidity(data.main.humidity);
      getUvIndex(data.coord);
      getFiveDayForecast(data.coord);
    });
});
function getUvIndex(data) {
  requestUrl = `https://api.openweathermap.org/data/2.5/uvi?lat=${data.lat}&lon=${data.lon}&appid=${APIkey}`;
  console.log(APIkey);
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var uvElement = document.getElementById("uv-index");
      uvElement.innerHTML = data.value;
    });
}

function getHumidity() {
  requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`;
  console.log(APIkey);
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var humidityElement = document.getElementById("humidity");
      humidityElement.innerHTML = data.value;
    });
}

function getWindspeed() {
  requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`;
  console.log(APIkey);
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var windElement = document.getElementById("windspeed");
      windElement.innerHTML = data.value;
    });
}

function getFiveDayForecast(data) {
  requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&appid=${APIkey}`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      document.getElementById(
        "today"
      ).src = `http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}.png`;
      document.getElementById(
        "day1"
      ).src = `http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}.png`;
      document.getElementById(
        "day2"
      ).src = `http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}.png`;
      document.getElementById(
        "day3"
      ).src = `http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}.png`;
      document.getElementById(
        "day4"
      ).src = `http://openweathermap.org/img/wn/${data.daily[4].weather[0].icon}.png`;
      document.getElementById(
        "day5"
      ).src = `http://openweathermap.org/img/wn/${data.daily[5].weather[0].icon}.png`;
    });
}
