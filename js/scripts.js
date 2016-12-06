$(document).ready(function(){
  var tempChange=true;
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
        var humidity = data.main.humidity;

        farenheit = (kelvin)*(9/5)-459.67;

        celsius = kelvin - 273.15;

        var today = new Date();
        var weekdays =
        ["Sunday",
         "Monday",
         "Tuesday",
         "Wednesday",
         "Thursday",
         "Friday",
         "Saturday"];
        var weekday = weekdays[today.getDay()];
        var day = today.getDate();
        var months = ['Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sept',
        'Oct',
        'Nov',
        'Dec'];
        var month = months[today.getMonth()];

        if(day<10) {
            day='0'+day;
        }
        today = weekday + ", " + month +' '+ day;
        $('#date').html(today);

        $('#temp').html(farenheit).append("&#8457;");
        $('#temp').click(function(){
          if(tempChange==false) {
            $('#temp').html(celsius).append("&#8451;");
            tempChange=true;
          } else {
            $('#temp').html(farenheit).append("&#8457;");
            tempChange=false;
          }
        });
        $('#city').html(city);
        $('#windSpeed').html(windSpeed);
        $('#weatherType').html(weatherType);
        $('#humidity').html(humidity);
      });
    });
  }
});
