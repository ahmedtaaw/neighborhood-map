var mapAPIKey='AIzaSyBhHOx6xieDMoLhIpTEF1R26ldB9F6Hrcc';

var map;
var marker;
function initialize() {
  var startmap = {lat: 29.9792971, lng: 31.1332649}
  map = new google.maps.Map(document.getElementById('map'), {
    center: startmap,
    zoom: 6
  });
 

  for (var x in landmarkslocations){
    var building = landmarkslocations[x];
    var location = new google.maps.LatLng(building.lat,building.lng);
    var marker = new google.maps.Marker({
      position:location,
      title:building.name,
      map: map
    });
    var infowindow=new google.maps.InfoWindow({
      content: building.name
    });

    google.maps.event.addListener(marker,'click',function(){
      infowindow.open(map,marker);
    })
  }
} 

google.maps.event.addDomListener(window,'load',initialize);