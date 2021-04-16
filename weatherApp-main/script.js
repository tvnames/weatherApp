
var APIkey = "fd1c13bf23db0924aed5c9df0e47d7a5";
var cityName = "San Diego";
var button = document.querySelector("#searchBtn");
var input = document.querySelector("#searchInput");
const locationDiv = document.getElementById("innerHtml");

var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`;

// fetch(requestUrl)
//   .then(function (response) {
  //     console.log(response.body);
  //     return response.json();
  //   })
  //   .then(function (data) {
    //     var locationDiv = document.querySelector(".location");
    //     console.log(data);
    
    //     locationDiv.innerHTML = data.name;
    
    
    //     var tempDiv = document.querySelector("temp");
    //     console.log(tempDiv);
    //     var kelvFar = (data.main.temp - 273.15) * 9 / 5 + 32;
    //     tempDiv.innerHTML = Math.floor(kelvFar);
    //   });
    
    button.addEventListener("click", function (event) {
      event.preventDefault();
      
      
      cityName = input.value;
      console.log(input.value);
      requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`
      
      fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log (data);
        var locationDiv = document.querySelector(".location");
        console.log(locationDiv);
        
        locationDiv.innerHTML = data.name;
        console.log(data);
        
        var tempDiv = document.querySelector(".temp");
        console.log(tempDiv);
        var kelvFar = (data.main.temp - 273.15) * 9 / 5 + 32;
        tempDiv.innerHTML = Math.floor(kelvFar);
        getUvIndex(data.coord);
        getFiveDayForecast(data.coord);
      });
      



})
function getUvIndex(data) {
  requestUrl = `http://api.openweathermap.org/data/2.5/uvi?lat=${data.lat}&lon=${data.lon}&appid=${APIkey}`;
  console.log(APIkey);
fetch(requestUrl)
.then(function (response) {
  return response.json();
})
.then(function (data) {
  console.log(data);
  var uvElement = document.getElementById("uv-index");
  uvElement.innerHTML = data.value;

})};

function getFiveDayForecast(data) {
  requestUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude={part}&appid=${APIkey}`;
  fetch(requestUrl)
.then(function (response) {
  return response.json();
})
.then(function (data) {
 console.log(data);
  document.getElementById('col1').innerHTML = data.daily[1].temp.day;
  document.getElementById('day2').src = `http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}.png`;
  // futureCast.innerHTML = data.list[14].value;
  // futureCast.innerHTML = data.list[21].value;
  // futureCast.innerHTML = data.list[28].value;
  console.log(data.list[0]);
})
  //   var futureCast = document.querySelector("#col");
//   console.log(futureCast);


//   futureCast.innerHTML = data.col;
//   console.log(col);

// })
}



//fetchButton.addEventListener('click', getApi);
