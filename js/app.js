var mapAPIKey='AIzaSyBhHOx6xieDMoLhIpTEF1R26ldB9F6Hrcc';

var map;
var marker;
function initMap() {
  var startmap = {lat: 29.9792971, lng: 31.1332649}
  map = new google.maps.Map(document.getElementById('map'), {
    center: startmap,
    zoom: 15
  });
  marker = new google.maps.Marker({
    position:startmap,
    map:map
  });
} 