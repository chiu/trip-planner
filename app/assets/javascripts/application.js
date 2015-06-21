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
//= require_tree .

var map;
var infoWindow;
var directionsDisplay;
var directionsService;
var service;
var routeResult;
var markers = [];
var markerCluster;

function initialize() {

  var vancouver = new google.maps.LatLng(49.2827,-123.1207);
  var richmond = new google.maps.LatLng(49.1667,-123.1333);

  var styles = [
  {
    featureType: 'road.local',
    elementType: 'geometry',
    stylers: [
    { color: '#c6c6c6' },
    { hue: '#2200ff' },
    { visibility: 'simplified' }
    ]
  },{
    featureType: 'road.arterial',
    elementType: 'all',
    stylers: [
    { color: '#66ccff' }
    ]
  },{
    featureType: 'road.arterial',
    elementType: 'labels',
    stylers: [
    { color: '#000000' },
    { visibility: 'simplified' }
    ]
  },{
    featureType: 'road.highway',
    elementType: 'all',
    stylers: [
    { color: '#ff9933' }
    ]
  },{
    featureType: 'road.highway',
    elementType: 'labels',
    stylers: [
    { color: '#000000' },
    { visibility: 'simplified' }
    ]
  },{
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
          // { color: '#00ddff' },
          { hue: '#00ddff' }
          // { visibility: 'simplified' }
          ]
        }
    // ,{
    //   featureType: 'landscape.natural',
    //   elementType: 'all',
    //   stylers: [
    //       { color: '#6bb26b' }
    //       // { hue: '#00ddff' }
    //       // { visibility: 'simplified' }
    //   ]
    // }
    ];

    var mapOptions = {
      mapTypeControlOptions: {
        mapTypeIds: ['Styled']
      },
      center: vancouver,
      zoom: 11,
      disableDefaultUI: true 
    // mapTypeId: 'Styled'
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);
  var styledMapType = new google.maps.StyledMapType(styles, { name: 'Styled' });
  map.mapTypes.set('Styled', styledMapType);

  directionsDisplay = new google.maps.DirectionsRenderer();
  directionsService = new google.maps.DirectionsService();
  service = new google.maps.places.PlacesService(map);
  markerCluster = new MarkerClusterer(map, markers);

  infowindow = new google.maps.InfoWindow();
  
  // calcRoute();


  // event listeners
  google.maps.event.addListener(map, 'dragend', function() {
    // console.log(map.getCenter());
    // console.log(map.getBounds())
    // displayPlaces();
    // performSearch();
  });
  google.maps.event.addListener(map, 'zoom_changed', function() {
    // console.log(map.getZoom());
    // displayPlaces();
  });
  // google.maps.event.addListener(map, 'idle', showMarkers);

  enableAutoComplete();
}//initialize


function enableAutoComplete() {
  var input = document.getElementById('query');

  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.bindTo('bounds', map);

  // var infowindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    map: map,
    anchorPoint: new google.maps.Point(0, -29)
  });

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
    marker.setIcon(/** @type {google.maps.Icon} */({
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
      (place.address_components[0] && place.address_components[0].short_name || ''),
      (place.address_components[1] && place.address_components[1].short_name || ''),
      (place.address_components[2] && place.address_components[2].short_name || '')
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
}


function calcRoute() {
  console.log('calcRoute');
  var start = $("#origin_field").val();
  console.log(start);
  var end = $("#dest_field").val();
  console.log(end);
  if(start != '' && end != '') {
    var request = {
      origin: start,
      destination:end,
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

function callback(results, status){
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  } 
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  // debugger
  var marker = new google.maps.Marker({
    map: map,
    position: placeLoc,
  });
  markerCluster.addMarker(marker);

  google.maps.event.addListener(marker, 'mouseover', function() {
    service.getDetails(place, function(result, status) {
      if (status != google.maps.places.PlacesServiceStatus.OK) {
        alert(status);
        return;
      }
      if (result.photos != null)
        var photo_url = result.photos[0].getUrl({ 'maxWidth': 200, 'maxHeight': 200 });
      console.log(photo_url);
      var content = '<div id="content">'+ '<h4 class="info-heading">' + result.name + '</h4>'
      + '<img src="'+ photo_url +'">'
      +'</div';
      infowindow.setContent(content);
      console.log(result);
      // console.log(result.photos[0].photo_reference);
      // console.log(result.photos[1].getUrl({ 'maxWidth': 80, 'maxHeight': 80 }));
      infowindow.open(map, marker);
    });

  });

  google.maps.event.addListener(marker, 'mouseout', function() {
    infowindow.close();
  });
}

function displayPlaces() {
  var bounds = map.getBounds();
  for(var i=0; i<routeResult.routes[0].overview_path.length; i++) {
    var ptLat = routeResult.routes[0].overview_path[i].lat();
    var ptLng = routeResult.routes[0].overview_path[i].lng();
    var ptLatLng = new google.maps.LatLng(ptLat, ptLng);
    if(bounds.contains(ptLatLng) && map.getZoom() > 12) {
      var request = {
        location: ptLatLng,
        radius: 10000,
        // types: ['restaurant']
        keyword: 'tourism'
      };
      service.nearbySearch(request, callback);
    }
  }

}


function performSearch() {
  service = new google.maps.places.PlacesService(map);

  var rsRequest = {
    location: new google.maps.LatLng(47.6097,-122.3331),
    radius: 10000,
    keyword: 'city tourism'
  };
  service.radarSearch(rsRequest, callback);

  for(var i=0; i<routeResult.routes[0].overview_path.length; i+=20) {
    var ptLat = routeResult.routes[0].overview_path[i].lat();
    var ptLng = routeResult.routes[0].overview_path[i].lng();
    var ptLatLng = new google.maps.LatLng(ptLat, ptLng);
    rsRequest = {
      location: ptLatLng,
      radius: 20000,
      // bounds: map.getBounds(),
      keyword: 'city tourism'
    };
    service.radarSearch(rsRequest, callback);
  }
}


function addWaypointSave(){



  $(".gm-title").append("<button class = 'favorite'> Add Place </button>");
}


// function make_ajax_call(){

//    url: "/trip/" + "1" + "waypoints/"
//    method: "post",
//    data: { lat: 53, }
// }


// function drawDirections() {
//   console.log("draw directions happened");
//   var startlocation = $("#origin_field").val();
//   console.log("start:", startlocation);
//   var endlocation = $("#dest_field").val();
//   console.log("end:", endlocation);
//   calcRoute(startlocation, endlocation);
// }

$(function(){
  setTimeout(calcRoute, 100);
  $(document).on("change", "#origin_field", calcRoute);
  $(document).on("change", "#dest_field", calcRoute);


  $("#map-canvas").on('click', '.favorite', function(){
    console.log("say hi");
    console.log(window.location.href );
    // console.log($(".gm-title").text());
   var place_name = $(".gm-title").text();
    console.log(place_name);
   var address = $(".gm-addr").text();
    console.log(address);

    $.ajax({
      type: "POST",
      url: window.location.href + '/waypoints',

      data: { waypoint: { lat: address}},
      
    });
  });

  setInterval(function(){ 
    //code goes here that will be run every 5 seconds.    
    addWaypointSave();
  }, 1000);

  //   setInterval(function(){ 
  //   //code goes here that will be run every 5 seconds.    
  //    make_ajax_call();
  // }, 1000);


});


