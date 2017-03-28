angular
  .module('dateApp')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
/* global google */
function googleMap($window) {
  const directive = {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '=',
      cinemas: '=',
      user: '='
    },
    link($scope, element) {
      console.log('user scope', $scope.user.geometry.lat);

      let infoWindow = null;
      let radius = 5000;
      let marker = null;

      const dateLatLng = { lat: 51.544235, lng: -0.051672 };
      const userLatLng = { lat: $scope.user.geometry.lat, lng: $scope.user.geometry.lng };
      const slider = document.getElementById('slider');
      const markers = [];

      const map = new $window.google.maps.Map(element[0], {
        zoom: 12,
        center: { lat: ((($scope.user.geometry.lat-51.544235)/2)+51.544235), lng: ((($scope.user.geometry.lng+0.051672)/2)-0.051672) },
        scrollwheel: false
      });

      const circleUser = new google.maps.Circle({
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 1.5,
        fillColor: '#0000FF',
        fillOpacity: 0.1,
        map: map,
        center: userLatLng,
        radius: radius
      });

      const circleDate = new google.maps.Circle({
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 1.5,
        fillColor: '#0000FF',
        fillOpacity: 0.1,
        map: map,
        center: dateLatLng,
        radius: radius
      });

      $scope.cinemas.forEach(function(cinema){
        cinema.latitude = cinema.geometry.location.lat;
        cinema.longitude = cinema.geometry.location.lng;
        addMarker(cinema);
        filterMarkers();
      });

      slider.onchange = function(){
        radius = parseFloat(this.value);
        circleUser.setRadius(radius);
        circleDate.setRadius(radius);
      //
        filterMarkers();
      };

      function filterMarkers() {
        for(var i = 0; i < markers.length; i++){
          if(markers[i].userDistance <= radius && markers[i].dateDistance <= radius){
            markers[i].setMap(map);
          } else{
            markers[i].setMap(null);
          }
        }
      }

      function findDistance(p1, p2){
        // console.log(google.maps.geometry.spherical.computeDistanceBetween(p1, p2));
        return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2)).toFixed(2);
      }

      function addMarker(cinema) {
        const latLng = { lat: cinema.latitude, lng: cinema.longitude };

        marker = new google.maps.Marker({
          position: latLng,
          map,
          animation: google.maps.Animation.DROP,
          userDistance: findDistance(new google.maps.LatLng(userLatLng), new google.maps.LatLng(latLng)),
          dateDistance: findDistance(new google.maps.LatLng(dateLatLng), new google.maps.LatLng(latLng))
          // icon: '/assets/restaurant.svg' // Adding a custom icon
        });

        markers.push(marker);

        google.maps.event.addListener(marker, 'click', function () {
          if(infoWindow) infoWindow.close();
          var infoWindowOptions = {
            content: `<div><p>${cinema.name}<br>${cinema.vicinity}</p></div>`
          };
          infoWindow = new google.maps.InfoWindow(infoWindowOptions);
          infoWindow.open(map, marker);
        });
      }
    }
  };

  return directive;
}
