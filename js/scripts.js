$(document).ready(function(){
  var tempChange=false;
  var lat;
  var long;

  $.getJSON("http://ip-api.com/json", function(location){
    lat=location.lat;
    long=location.lon;
    var api = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&appid=ec5b09b3c6f823a773734e69baa839d4";

    $.getJSON(api, function(data){
      var weatherType = data.weather[0].description;
      var kelvin = data.main.temp;
      var windSpeed = data.wind.speed;
      var city = data.name;
      var humidity = data.main.humidity;

      //changing meters to miles
      windSpeed = (2.237*(windSpeed)).toFixed(1);

      //converting kelvin to F and C
      farenheit = (kelvin*(9/5)-459.67).toFixed(0);

      celsius = (kelvin - 273.15).toFixed(0);

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

      var months =
        ['Jan',
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
        if(tempChange == false) {
          $('#temp').html(celsius).append("&#8451;");
          tempChange=true;
        } else {
          $('#temp').html(farenheit).append("&#8457;");
          tempChange=false;
        }
      });
      $('#city').html(city);
      $('#windSpeed').html("Wind: " + windSpeed + " MPH");
      $('#weatherType').html("Weather: " + weatherType);
      $('#humidity').html("Humidity: " + humidity);

      $('body').css('padding-bottom', '390px');

      if(farenheit>90 || celsius>32){
        $('body').css('background-image', 'url("https://static.pexels.com/photos/128994/pexels-photo-128994.jpeg")').css('background-size', 'cover');
      } else if (farenheit>75 || celsius>24) {
        $('body').css('background-image', 'url("https://static.pexels.com/photos/4952/sky-beach-vacation-summer.jpeg")').css('background-size', 'cover');
      } else if (farenheit>60 || celsius>16){
        $('body').css('background-image', 'url("https://static.pexels.com/photos/17577/pexels-photo.jpg")').css('background-size', 'cover');
      } else if (farenheit>45 || celsius>7) {
        $('body').css('background-image','url("https://static.pexels.com/photos/158848/pexels-photo-158848.jpeg")').css('background-size', 'cover');
      } else if (farenheit>30 || celsius>-1) {
        $('body').css('background-image', 'https://static.pexels.com/photos/186575/pexels-photo-186575.jpeg').css('background-size', 'cover');
      } else {
        $('body').css('background-image', 'url("https://static.pexels.com/photos/128905/pexels-photo-128905.jpeg")').css('background-size', 'cover');
      }
    });
  });
});
