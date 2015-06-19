TripPlanner = {};

$(function() {
  var autocomplete;

  TripPlanner.initialize = function(theId) {
    autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById(theId)),
      { types: ['geocode'] }
    );
  }

  // geolocate() tries to fill the 'origin' field with the user's current location if they have geolocator enabled in their browser
  TripPlanner.geolocate = function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = new google.maps.LatLng(
            position.coords.latitude, position.coords.longitude);
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });

        autocomplete.setBounds(circle.getBounds());
      });
    } 
  }
  $('.dropdown-menu input').on('click', function(e) {
    console.log('click');
    e.stopPropagation(); 
  });
});
