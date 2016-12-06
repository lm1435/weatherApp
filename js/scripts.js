$(document).ready(function(){
  var tempChange=false;
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
          if(tempChange==false) {
            $('#temp').html(celsius).append("&#8451;");
            tempChange=true;
          } else {
            $('#temp').html(farenheit).append("&#8457;");
            tempChange=false;
          }
        });
        $('#city').html(city);
        $('#windSpeed').html(windSpeed + " MPH");
        $('#weatherType').html(weatherType);
        $('#humidity').html(humidity + "%");

        if(farenheit>90 || celsius>32){
          $('body').css('background-image', 'url("http://cdn.phys.org/newman/gfx/news/hires/2013/testingarela.jpg")');
        } else if (farenheit>75 || celsius>24) {
          $('body').css('background-image', 'url("http://dreamatico.com/data_images/summer/summer-5.jpg")');
        } else if (farenheit>60 || celsius>16){
          $('body').css('background-image', 'url("https://www.lcfencegate.com/wp-content/uploads/2013/06/texas-sunrise.jpg")');
        } else if (farenheit>45 || celsius>7) {
          $('body').css('background-image','url("http://www.blogto.com/upload/2016/09/2016928-fall.jpg")').css('background-size', 'cover');
        } else if (farenheit>30 || celsius>-1) {
          $('body').css('background-image', 'http://cdn2.media.zp-cdn.com/8585/texas-winter-7ebf9e.jpg');
        } else {
          $('body').css('background-image', 'url("http://media.gettyimages.com/photos/man-ice-fishing-on-long-lake-southcentral-alaska-wintern-picture-id586886759?k=6&m=586886759&s=170667a&w=0&h=17LZLV-o0x_AN1dsF2ry21GINHqTj8U0kssDV8_XCJg=")');
        }
      });
    });
  }
});
