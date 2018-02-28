var mapAPIKey = 'AIzaSyBhHOx6xieDMoLhIpTEF1R26ldB9F6Hrcc';

var map;
var marker;
var infowindow;
function initialize() {
  var startmap = { lat: 29.9792971, lng: 31.1332649 }
  map = new google.maps.Map(document.getElementById('map'), {
    center: startmap,
    zoom: 6
  });


  for (var x in landmarkslocations) {
    var building = landmarkslocations[x];
    var location = new google.maps.LatLng(building.lat, building.lng);
    addMarker(map, building.name, location);

  }
}

function addMarker(map, name, location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });


  google.maps.event.addListener(marker, 'click', function () {
    if (typeof infowindow != 'undefined') {
      infowindow.close();
    }
     infowindow = new google.maps.InfoWindow({
      content: name
    });
    infowindow.open(map, marker);
  });





}

google.maps.event.addDomListener(window, 'load', initialize);

var searchTerm;
var url;
 var wikibuilding ;
$(function(){
  for (var x in landmarkslocations) {
    wikibuilding= landmarkslocations[x];
    getwikidata(wikibuilding.name);
   
    //var location = new google.maps.LatLng(building.lat, building.lng);
    //addMarker(map, building.name, location);

  }
  function getwikidata(placename){
  
    //searchTerm = $("#wikisearch").val();
    url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+placename+'&format=json&callback=?';

    var promise = $.ajax({
      url:url,
      type:'GET',
      contentType:'application/json; charset=utf-8',
      dataType:'json',
      success:function(data,status,jqXHR){
       
      }
    });

    promise.then(function(resolve){
      //console.log("data "+ resolve)
      console.log('Place name '+resolve[1][0]);
      console.log('place info '+resolve[2][0]);
      console.log('-------------------');
    })
    
  };
})