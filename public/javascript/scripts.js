$(document).ready(() => {
  $('#create-group').hide();
  $('#join-group').hide();
  $('#add-mem-btn').hide();
  $('#add-member').hide();
  $('#current-members').hide();

  $('#create-btn').click(() => {
    $('#create-group').show();
    $('#join-group').hide();
    $('#add-member').hide();
    $('#add-mem-btn').hide();
  });

  $('#join-btn').click(() => {
    $('#join-group').show();
    $('#create-group').hide();
    $('#add-member').hide();
    $('#add-mem-btn').hide();
  });

  $('#create-submit').click(() => {
    // firebase code to check group availability

    // firebase code to add credentials to database

    // show and hide necessary fields
    $('#add-mem-btn').show();
    $('#current-members').show();
    $('#create-group').hide();
    $('#join-group').hide();
  });

  $('#join-submit').click(() => {
    // firebase code to check credentials

    // firebase code to update necessary fields

    // show and hide necessary fields
    $('#add-mem-btn').show();
    $('#current-members').show();
    $('#create-group').hide();
    $('#join-group').hide();
  });

  $('#add-mem-btn').click(() => {
    // show add member form
    $('#add-member').show();
  });

  $('#add-mem-submit').click(() => {
    // firebase code to add members

    // hide form once member is added to list
    $('#add-member').hide();
  });
  
  function weatherAPI(city) {
    const APIKey = 'e992da56e11487f3a9bfbf4bc4469dcc';
    // Here we are building the URL we need to query the database
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
    // Here we run our AJAX call to the OpenWeatherMap
    $.ajax({
      url: queryURL,
      method: 'GET',
    })
    // We store all of the retrieved data inside of an object called "response"
      .then((response) => {
      // Log the queryURL

        // Log the resulting object
        // console.log(response);
        // Transfer content to HTML
        $('#city').html(`<h1>${response.name} Weather Details</h1>`);
        $('#wind').text(`Wind Speed: ${response.wind.speed}`);
        $('#humidity').text(`Humidity: ${response.main.humidity}`);
        $('#temp').text(`Temperature (F) ${response.main.temp}`);
      });
  }


  $(document).on('click', '#submit-search', (event) => {
    event.preventDefault();

    const searchCity = $('#search-city').val().trim();
    weatherAPI(searchCity);
  });
});
