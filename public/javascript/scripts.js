/* eslint-disable */
console.warn('Project One JS Initialized');
/* eslint-enable */
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
