// Initialize Firebase
const config = {
  apiKey: 'AIzaSyBlFEOMRTnca0sfKoHwvktXhWfD_W5P2Io',
  authDomain: 'project-1-db.firebaseapp.com',
  databaseURL: 'https://project-1-db.firebaseio.com',
  projectId: 'project-1-db',
  storageBucket: 'project-1-db.appspot.com',
  messagingSenderId: '28286838580',
};
firebase.initializeApp(config);

const database = firebase.database();

let map;
let input;
let autocomplete;
let infowindow;
let infowindowContent;
let marker;
let place;


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -33.8688, lng: 151.2195 },
    zoom: 13,
  });

  input = document.getElementById('pac-input');

  autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  autocomplete.setFields(['place_id', 'geometry', 'name']);

  map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  infowindow = new google.maps.InfoWindow();
  infowindowContent = document.getElementById('infowindow-content');
  infowindow.setContent(infowindowContent);

  marker = new google.maps.Marker({ map });

  marker.addListener('click', () => {
    infowindow.open(map, marker);
  });

  autocomplete.addListener('place_changed', () => {
    infowindow.close();

    place = autocomplete.getPlace();

    if (!place.geometry) {
      return;
    }

    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }

    // Set the position of the marker using the place ID and location.
    marker.setPlace({
      placeId: place.place_id,
      location: place.geometry.location,
    });

    marker.setVisible(true);

    infowindowContent.children['place-name'].textContent = place.name;
    infowindowContent.children['place-id'].textContent = place.place_id;
    infowindowContent.children['place-address'].textContent = place.formatted_address;
    infowindow.open(map, marker);
  });
}
// Hide forms
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
  // console.log($('#new-group-name').val().trim());
  // console.log($('#new-password').val().trim());
  // console.log($('#verify-password').val().trim());

  const groupData = {
    groupName: $('#new-group-name').val().trim(),
    groupPassword: $('#verify-password').val().trim(),
  };
  database.ref('group').push(groupData);
  // firebase code to add credentials to database

  // show and hide necessary fields
  $('#add-mem-btn').show();
  $('#current-members').show();
  $('#create-group').hide();
  $('#join-group').hide();
});

$('#join-submit').click(() => {
  // firebase code to check credentials
  database.ref('group').once('value').then((snapshot) => {
    // console.log(Object.values(snapshot.val()));

    const joinGroup = Object.values(snapshot.val());
    const regGroupName = $('#reg-group-name').val().trim();
    const regGroupPass = $('#reg-password').val().trim();

    for (let i = 0; i < joinGroup.length; i++) {
      if (joinGroup[i].groupName === regGroupName && joinGroup[i].groupPassword === regGroupPass) {
        // console.log("There's a match");
        const groupTitle = $('<h1>').text(joinGroup[i].groupName)
        const goBackBtn = $('<div class="btn btn-primary">')
          .on('click', function(){ window.location = '/' })
          .text('Go Back')
        $('.container').empty()
        $('.container').append(groupTitle, goBackBtn)
      //  $('body').html($('<div>', {class: $'container'}));
      } else {

      }
    }
  });
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
var addMember = {
  memberName: $('#new-member-name').val().trim(),
  memberEmail: $('#new-member-email').val().trim(),
};
database.ref('member-data').push(addMember);
  // hide form once member is added to list
  $('#add-member').hide();
});

const APIKey = 'e992da56e11487f3a9bfbf4bc4469dcc';
// Here we are building the URL we need to query the database
const queryURL = `http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=${[APIKey]}`;
// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: 'GET',
})
// We store all of the retrieved data inside of an object called "response"
  .then((response) => {
    // Log the queryURL
    // console.log(queryURL);
    // Log the resulting object
    // console.log(response);
    // Transfer content to HTML
    $('.city').html(`<h1>${response.name} Weather Details</h1>`);
    $('.wind').text(`Wind Speed: ${response.wind.speed}`);
    $('.humidity').text(`Humidity: ${response.main.humidity}`);
    $('.temp').text(`Temperature (F) ${response.main.temp}`);
  });
