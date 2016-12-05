$(document).ready(function(){
  var long;
  var lat;
  var farenheit;
  var celsius;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position){
      long= position.coords.longitude;
      lat= position.coords.latitude;


      var api = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=ec5b09b3c6f823a773734e69baa839d4";

      $.getJSON(api, function(data){
        var weatherType = data.weather[0].description;
        var kelvin = data.main.temp;
        var windSpeed = data.wind.speed;
        var city = data.name;

        farenheit = (kelvin)*(9/5)-459.67;

        celsius = kelvin - 273.15;

        $('#temp').html(farenheit);
        $('#city').html(city);
        $('#wind').html(windSpeed);
        $('#description').html(weatherType);
      });
    });
  }
});
