angular
  .module('dateApp')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window'];
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
      // console.log('scope', $scope.cinemas);
      console.log('user scope', $scope.user.geometry.lat);

      // const userLat = ;
      let infoWindow = null;
      const searchAreaRadius = 5000;
      const startLat = 51.545685;
      const startLng = -0.164424;
      const startLatLng = new google.maps.LatLng(startLat, startLng);
      let marker = null;

      const map = new $window.google.maps.Map(element[0], {
        zoom: 12,
        center: { lat: (((51.545685-51.544235)/2)+51.544235), lng: (((-0.164424+0.051672)/2)-0.051672) },
        scrollwheel: false
      });

      const circle1 = new google.maps.Circle({
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 1.5,
        fillColor: '#0000FF',
        fillOpacity: 0.1,
        map: map,
        center: startLatLng,
        radius: searchAreaRadius
      });

      const circle2 = new google.maps.Circle({
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 1.5,
        fillColor: '#0000FF',
        fillOpacity: 0.1,
        map: map,
        center: { lat: 51.544235, lng: -0.051672 },
        radius: searchAreaRadius
      });

      $scope.cinemas.forEach(function(cinema){
        // console.log(cinema.name);
        cinema.latitude = cinema.geometry.location.lat;
        cinema.longitude = cinema.geometry.location.lng;

        addMarker(cinema);
      });

      google.maps.Circle.prototype.contains = function(latLng) {
        return this.getBounds().contains(latLng) && google.maps.geometry.spherical.computeDistanceBetween(this.getCenter(), latLng) <= this.getRadius();
      };

      function addMarker(cinema) {
        const latLng = { lat: cinema.latitude, lng: cinema.longitude };
        // console.log(latLng);
        marker = new google.maps.Marker({
          position: latLng,
          map,
          animation: google.maps.Animation.DROP
          // icon: '/assets/restaurant.svg' // Adding a custom icon
        });

        const markers = [];
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
