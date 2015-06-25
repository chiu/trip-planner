// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require front_page
//= require social-share-button
//= require_tree 

var map;
var infoWindow;
var directionsDisplay;
var directionsService;
var service;
var routeResult;
var hotel = {markers: [], counter: 0};
var restaurant = {markers: [], counter: 0};
var ent = {markers: [], counter: 0};
var monument = {markers: [], counter: 0};
var outdoors = {markers: [], counter: 0};
var camping = {markers: [], counter: 0};
var types = [hotel, restaurant, ent, monument, outdoors, camping];


function initialize() {

  var vancouver = new google.maps.LatLng(49.2827, -123.1207);
  var richmond = new google.maps.LatLng(49.1667, -123.1333);

// this is all the styling for the google maps begins

  var styles = [{
    "elementType": "geometry",
    "stylers": [{
      "hue": "#ff4400"
    },{
      "saturation": -68
    },{
      "lightness": -4
    },{
      "gamma": 0.72
    }]
  },{
    "featureType": "road",
    "elementType": "labels.icon"
  },{
    "featureType": "landscape.man_made",
    "elementType": "geometry",
    "stylers": [{
      "hue": "#0077ff"
    },{
      "gamma": 3.1
    }]
  },{
    "featureType": "water",
    "stylers": [{
      "color": "#0099FF"
    },{
      "gamma": 0.75
    },{
      "saturation": -33
    }]
  },{
    "featureType": "poi.park",
    "stylers": [{
      "hue": "#44ff00"
    },{
      "saturation": -23
    }]
  },{
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [{
      "hue": "#007fff"
    },{
      "gamma": 0.77
    },{
      "saturation": 65
    },{
      "lightness": 99
    }]
  },{
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [{
      "gamma": 0.11
    },{
      "weight": 5.6
    },{
      "saturation": 99
    },{
      "hue": "#0091ff"
    },{
      "lightness": -86
    }]
  },{
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [{
      "lightness": -48
    },{
      "hue": "#ff5e00"
    },{
      "gamma": 1.2
    },{
      "saturation": -23
    }]
  },{
    "featureType": "transit",
    "elementType": "labels.text.stroke",
    "stylers": [{
      "saturation": -64
    },{
      "hue": "#ff9100"
    },{
      "lightness": 16
    },{
      "gamma": 0.47
    },{
      "weight": 2.7
    }]
  }]

  // this is where the styling for the google maps ends

  var mapOptions = {
    mapTypeControlOptions: {
      mapTypeIds: ['Styled']
    },
    center: vancouver,
    zoom: 11,
    disableDefaultUI: true,
    mapTypeId: 'Styled'
  };

  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var styledMapType = new google.maps.StyledMapType(styles, {
    name: 'Styled'
  });
  map.mapTypes.set('Styled', styledMapType);


  directionsService = new google.maps.DirectionsService();
  service = new google.maps.places.PlacesService(map);
  directionsDisplay = new google.maps.DirectionsRenderer({ /* styling for the route line begins */
    polylineOptions: {
      strokeColor: '#000000',
      strokeWeight: 6,
      strokeOpacity: 0.4
    },
    suppressMarkers: true
   }); /* styling for the route line ends */

  infowindow = new google.maps.InfoWindow();

        // calcRoute();
  enableAutoComplete();

} //initialize


  function makeMarker( position, icon, title ) {
   new google.maps.Marker({
    position: position,
    map: map,
    icon: icon,
    title: title
  });
 }

function enableAutoComplete() {
  var input = document.getElementById('query');

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  // var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

    // starting location image changed

  // var image = '/images/startIcon.png';
  // // var myLatLng = new google.maps.LatLng(49.2827, -123.1207);
  // var start = new google.maps.start;
  // var startIcon = new google.maps.Marker({
  //   position: start,
  //   animation: google.maps.Animation.DROP,
  //   map: map,
  //   icon: image,
  // });


  google.maps.event.addListener(autocomplete, 'place_changed', function() {
    infowindow.close();
    marker.setVisible(false);
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      window.alert("Autocomplete's returned place contains no geometry");
      return;
    }

    // If the place has a geometry, then present it on a map.
    if (place.geometry.viewport) {
      map.fitBounds(place.geometry.viewport);
    } else {
      map.setCenter(place.geometry.location);
      map.setZoom(17);
    }
    marker.setIcon( /** @type {google.maps.Icon} */ ({
      url: place.icon,
      size: new google.maps.Size(71, 71),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(17, 34),
      scaledSize: new google.maps.Size(35, 35)
    }));
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);

    var address = '';
    if (place.address_components) {
      address = [
      (place.address_components[0] && place.address_components[0].short_name || ''), (place.address_components[1] && place.address_components[1].short_name || ''), (place.address_components[2] && place.address_components[2].short_name || '')
      ].join(' ');
    }

    infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
    infowindow.open(map, marker);
  });

// Sets a listener on a radio button to change the filter type on Places
// Autocomplete.
  function setupClickListener(id, types) {
    var radioButton = document.getElementById(id);
    google.maps.event.addDomListener(radioButton, 'click', function() {
      autocomplete.setTypes(types);
    });
  }

  setupClickListener('changetype-all', []);
  setupClickListener('changetype-address', ['address']);
  setupClickListener('changetype-establishment', ['establishment']);
  setupClickListener('changetype-geocode', ['geocode']);
} //enableAutoComplete


function calcRoute() {
  // console.log('calcRoute');
  var start = $("#origin_field").val();
  // console.log(start);
  var end = $("#dest_field").val();
  // console.log(end);
  var feedaway = feedWaypoint();
  // console.log("print feedaway start");
  // console.log(feedaway);
  // console.log("print feedaway end");
  if (start != '' && end != '') {
    var request = {
      origin: start,
      destination: end,
          // waypoints: [{
          //     location: 'Vancouver, BC'
          // }, {
          //     location: 'Richmond, BC'
          // }, {location: 'North Vancouver, BC V7G 1L3, Canada'}],

          waypoints: feedaway,


          travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(result, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            var step1 = result.routes[0].legs[0].steps[0].instructions;
              // console.log(result.routes[0]);
              //console.log(step1);
              directionsDisplay.setDirections(result);
              directionsDisplay.setMap(map);
              directionsDisplay.setPanel(document.getElementById('directions'));

              var leg = result.routes[ 0 ].legs[ 0 ];
                var start = {
                  url: '/images/startIcon.png',
                  scaledSize: new google.maps.Size( 100, 100 )
                };
                var end = {
                  url: '/images/endIcon.png',
                  scaledSize: new google.maps.Size( 75, 75 )
                };
                makeMarker( leg.start_location, start, "title" );
                makeMarker( leg.end_location, end, 'title' );
              
              google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
                  // computeTotalDistance(directionsDisplay.getDirections());
                  showWaypoints(directionsDisplay.getDirections());
                });



              routeResult = result;
              // displayPlaces();
              performSearch();


            }
          });
      // map.setCenter(new google.maps.LatLng(47.6097,-122.3331));
      //     map.setZoom(11);
    }
}

function performSearch(query) {
  for(var i=0; i<routeResult.routes[0].overview_path.length; i+=100) {
    var ptLat = routeResult.routes[0].overview_path[i].lat();
    var ptLng = routeResult.routes[0].overview_path[i].lng();
    attractionsSearch(ptLat, ptLng, query);
  }
}

function attractionsSearch(ptLat, ptLng, query) {
  var CLIENT_ID = 'WZYNHXEJDKUNPG1BLIWPQAIRM2OVCFXERTL4B4ZYYP0IQ0ZZ';
  var CLIENT_SECRET = 'QHTBRDEJS2IKCWHWADY2FSRMXKR4ABMDLQGE5HEP1CW5KTJ0';
  var LATLNG = '47.6097,-122.3331';

  var API_ENDPOINT = 'https://api.foursquare.com/v2/venues/explore' +
  '?client_id=CLIENT_ID' +
  '&client_secret=CLIENT_SECRET' +
  '&ll=LAT,LNG' +
  '&radius=5000' +
  // '&near=seattle' +
  // '&section=sights' +
  '&query=QUERY' +
  '&venuePhotos=1' +
  '&limit=10' +
  '&v=20140806' +
  '&m=foursquare';
  

  $.getJSON(API_ENDPOINT
    .replace('CLIENT_ID', CLIENT_ID)
    .replace('CLIENT_SECRET', CLIENT_SECRET)
    .replace('LAT', ptLat)
    .replace('LNG', ptLng)
    .replace('QUERY', query), function(data) {
      var venues = data['response']['groups'][0]['items'];
      console.log(venues);
      
      for (var i = 0; i < venues.length; i++) {
        console.log(venues[i]['venue']['name']);
        createMarker(venues[i]['venue'], query);
      }
    });

}


function createMarker(venue, query) {
  var latlng = new google.maps.LatLng(
    venue['location']['lat'], 
    venue['location']['lng']);
  var marker = new google.maps.Marker({
    map: map,
    position: latlng
  });
  // markerCluster.addMarker(marker);
  
  getType(query).markers.push(marker);

  var tag_content = '<div id="info-tag">'+ '<h4 class="info-heading">' + venue['name'] + '</h4>'
      +'</div>';
  var window_content = '<div id="info-window">'+ '<h4 class="info-heading">' + venue['name'] + '</h4>'
      + '<button type="button">Add</button>' + '</div>';
  infowindow = new google.maps.InfoWindow();

  google.maps.event.addListener(marker, 'mouseover', function() {
    console.log(marker);
    infowindow.setContent(tag_content);
    infowindow.open(map, marker);
    google.maps.event.addListener(marker, 'mouseout', function() {
    infowindow.close();
  });
  });
  
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(window_content);
    infowindow.open(map, marker);
    google.maps.event.clearListeners(marker, 'mouseout');
  });
}



Array.prototype.contains = function(elem)
{
 for (var i in this)
 {
   if (this[i] == elem) return true;
 }
 return false;
}




function addWaypointSave() {
  $(".gm-title").append("<button class = 'favorite'> Add Place </button>");
}

function timeoutAddWaypointSave() {
  setTimeout(function() {
    addWaypointSave()
  }, 500);
}

// var address_array = [];
function feedWaypoint() {
  var address_array = [];
    // console.log("feedwaypoint triggered");
    $.getJSON(window.location.href + '/waypoints', function(data) {
        // var address_array = [];
        for (var i = 0; i < data.length; i++) {
          address_array.push({
            location: data[i].address
          });
            // console.log(address_array);
          }
        // console.log(address_array);
        // return address_array;
      })
    // console.log("whooot");
    // console.log(address_array);
    return address_array;

  }


function getType(query) {
  switch(query) {
    case 'hotel':
        return types[0];
        break;
    case 'restaurant':
        return types[1];
        break;
    case 'entertainment':
        return types[2];
        break;
    case 'monument':
        return types[3];
        break;
    case 'outdoors':
        return types[4];
        break;
    case 'camping':
        return types[5];
        break;
    // default:
    //     default code block
  }
}
function setType(query) {
  switch(query) {
    case 'hotel':
        types[0].counter++;
        break;
    case 'restaurant':
        types[1].counter++;
        break;
    case 'entertainment':
        types[2].counter++;
        break;
    case 'monument':
        types[3].counter++;
        break;
    case 'outdoors':
        types[4].counter++;
        break;
    case 'camping':
        types[5].counter++;
        break;
  }
}

function clearTypeProperties() {
  for(var i=0; i<types.length; i++){
    types[i].markers = [];
    types[i].counter = 0;
  }
}

$(function() {
  // setTimeout(calcRoute, 100);
  $(document).on("change", "#origin_field", calcRoute);
  $(document).on("change", "#dest_field", calcRoute);
  $(document).on("change", ":checkbox", function() {
    var query = $(this).attr("name");
    var markers = getType(query).markers;
    var counter = getType(query).counter;
    console.log(query);
    if(counter == 0)
      performSearch(query);
    
    for (var i=0; i < markers.length; i++)
      markers[i].setVisible($(this).prop("checked"));
    setType(query);

  });


    // $("#map-canvas").on("click", calcRoute);
    // $("#map-canvas").on('click', addWaypointSave);
    $("#map-canvas").on('click', timeoutAddWaypointSave);
    $("#map-canvas").on('click', '.favorite', function() {
      console.log("say hi");
      console.log(window.location.href);
        // console.log($(".gm-title").text());
        var place_name = $(".gm-title").text();
        console.log(place_name);
        var address = $(".gm-addr").text();
        console.log(address);



        $.ajax({
          type: "POST",
          url: window.location.href + '/waypoints',

          data: {
            waypoint: {
              address: address
            }
          },

        });

        calcRoute();


      });

});


