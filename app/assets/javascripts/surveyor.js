/* jshint jquery:true, quotmark:false, devel:true */
/* globals google:true */
// surveryor.js

// var Surveyor = function() {
//   this.directionsDisplay = {};
// }

// Surveyor.prototype.drawDirections = function drawDirections()
// {
//   this.directionsDisplay.foo = bar;
// };

// var s = new Surveyor()

// s.drawDirections();

var surveyor = (function() {
    "use strict";



    var rendererOptions = {
        draggable: true
    };
    var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
    var directionsService = new google.maps.DirectionsService();
    var map;

    var australia = new google.maps.LatLng(-25.274398, 133.775136);

    function initialize()
    {
      var map_canvas = document.getElementById('map-canvas');
      if(!map_canvas) { return; }

      var mapOptions = {
          zoom: 7,
          center: australia,
          // offsetWidth: 60
      };

      map = new google.maps.Map(map_canvas, mapOptions);
      directionsDisplay.setMap(map);
      directionsDisplay.setPanel(document.getElementById('directionsPanel'));
      google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
          computeTotalDistance(directionsDisplay.getDirections());
          showWaypoints(directionsDisplay.getDirections());
      });
    }

    function drawDirections() {
        console.log("draw directions happened");
        var startlocation = $("#origin_field").val();
        console.log("start:", startlocation);
        var endlocation = $("#dest_field").val();
        console.log("end:", endlocation);
        calcRoute(startlocation, endlocation);
    }

    function calcRoute(origin_argument, destination_argument) {
        var request = {
            origin: origin_argument,
            destination: destination_argument,
            waypoints: [{
                location: 'Vancouver, BC'
            }, {
                location: 'Richmond, BC'
            }],
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });
    }

    function showWaypoints(result) {
        var myroute = result.routes[0];
        for (var i = 0; i < myroute.legs.length; i++) {
            console.log(myroute.legs[i]);
        }
    }

    function computeTotalDistance(result) {
        var total = 0;
        var myroute = result.routes[0];
        for (var i = 0; i < myroute.legs.length; i++) {
            total += myroute.legs[i].distance.value;
        }
        total = total / 1000.0;
        document.getElementById('total').innerHTML = total + ' km';
    }

    return {
        showWaypoints: showWaypoints,
        drawDirections: drawDirections,
        initialize: initialize
    };
// }());

})();

$(document).on("click", "#calculateRouteButton", surveyor.drawDirections);


google.maps.event.addDomListener(window, 'load', surveyor.initialize);