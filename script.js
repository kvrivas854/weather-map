
var current = new Date();
var date = (current.getMonth()+1) + '/' + current.getDate() + '/' + current.getFullYear();

$('#cityName').submit(function(e){
    e.preventDefault();    
    var userInput = $('#userInput').val().trim();
    var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${userInput},us&units=imperial&APPID=3b5715c4cc3d80c499e1192a073d5982`;    
    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function(response){
        console.log(response);
        var imgUrl = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        var img = $('<img>').attr('src', imgUrl);
        var card = $('<div>').addClass('card mt-3');
        var body = $("<div>").addClass('card-body');
        var header = $("<h5>").addClass('card-title').text(response.name + ' (' + date + ')').append(img);
        var temp = $("<p>").addClass('card-text').text('Temperature: ' + Math.round(response.main.temp) + '°F');
        var humidity = $("<p>").addClass('card-text').text('Humidity: ' + response.main.humidity + '%');
        var windSpeed = $("<p>").addClass('card-text').text('Wind Speed: ' + response.wind.speed + 'mph');
        body.append(header, temp, humidity, windSpeed);
        card.append(body);
        $('#weatherResult').prepend(card);
    });
    $("#userInput").val('');
})