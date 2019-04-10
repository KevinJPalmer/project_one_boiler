// Hide forms
$("#create-group").hide();
$("#join-group").hide();
$("#add-mem-btn").hide();
$("#add-member").hide();
$("#current-members").hide();

$( "#create-btn" ).click(function() {
  $("#create-group").show();
  $("#join-group").hide();
  $("#add-member").hide();
  $("#add-mem-btn").hide();
});

$( "#join-btn" ).click(function() {
  $("#join-group").show();
  $("#create-group").hide();
  $("#add-member").hide();
  $("#add-mem-btn").hide();
});

$( "#create-submit" ).click(function() {
  //firebase code to check group availability

  //firebase code to add credentials to database

  //show and hide necessary fields
  $("#add-mem-btn").show();
  $("#current-members").show();
  $("#create-group").hide();
  $("#join-group").hide();
});

$( "#join-submit" ).click(function() {
  //firebase code to check credentials

  //firebase code to update necessary fields

  //show and hide necessary fields
  $("#add-mem-btn").show();
  $("#current-members").show();
  $("#create-group").hide();
  $("#join-group").hide();
});

$( "#add-mem-btn" ).click(function() {
  //show add member form
  $("#add-member").show();
});

$("#add-mem-submit").click(function() {
  //firebase code to add members

  //hide form once member is added to list
  $("#add-member").hide();
});

var APIKey = "e992da56e11487f3a9bfbf4bc4469dcc";
            // Here we are building the URL we need to query the database
            var queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=" + [APIKey];
            // Here we run our AJAX call to the OpenWeatherMap API
            $.ajax({
              url: queryURL,
              method: "GET"
            })
              // We store all of the retrieved data inside of an object called "response"
              .then(function(response) {
                // Log the queryURL
                console.log(queryURL);
                // Log the resulting object
                console.log(response);
                // Transfer content to HTML
                $(".city").html("<h1>" + response.name + " Weather Details</h1>");
                $(".wind").text("Wind Speed: " + response.wind.speed);
                $(".humidity").text("Humidity: " + response.main.humidity);
                $(".temp").text("Temperature (F) " + response.main.temp);
              })