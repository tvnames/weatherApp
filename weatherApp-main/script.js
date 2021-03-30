
var APIkey = "04168c7fd672f5749aabe021dca0c6cc";
var cityName = "San Diego";
var button = document.querySelector("#searchBtn");
var imput = document.querySelector("#searchInput");

var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`;

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    var locationDiv = document.querySelector(".location");
    console.log(locationDiv);

    locationDiv.innerHTML= data.name;
    console.log(data);

    var tempDiv = document.querySelector(".temp");
    console.log(tempDiv);
    var kelvFar = ( data.main.temp - 273.15) * 9/5 + 32;
    tempDiv.innerHTML= Math.floor(kelvFar);
  });

  button.addEventListener("click", function(event){
    event.preventDefault(); 
    console.log(imput.value);
    cityName = imput.value;
    
    requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`
    
    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var locationDiv = document.querySelector(".location");
      console.log(locationDiv);
  
      locationDiv.innerHTML= data.name;
      console.log(data);
  
      var tempDiv = document.querySelector(".temp");
      console.log(tempDiv);
      var kelvFar = ( data.main.temp - 273.15) * 9/5 + 32;
      tempDiv.innerHTML= Math.floor(kelvFar);
    });
    fetch(requestURl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data){
        var futureCast = document.querySelector("#col");
        console.log(futureCast);
        
        
        futureCast.innerHTML= data.col;
        console.log(col)

    })


})




//fetchButton.addEventListener('click', getApi);
