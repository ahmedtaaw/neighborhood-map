/*Module for neighborhood map*/
var neighborhoodMap = function () {

    /** to make each place */
    var drawmarker = function(data) {
        this.name = ko.observable(data.name);
        this.lat = ko.observable(data.lat);
        this.lng = ko.observable(data.lng);
        this.desc = ko.observable(data.desc);


          


      };

    /*To make an array of places*/
    var places = ko.observableArray(landmarkslocations);

    /*draw map*/
    var addEachPlace = function () {
        for (var x in places()) {
            //new drawmarker(data);
            //console.log(places()[x].name)
            getwikidata(places()[x].name,x);
        }
 
            
        
    }

    //get wiki data
    function getwikidata(placename,x) {

        //searchTerm = $("#wikisearch").val();
        url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + placename + '&format=json&callback=?';
    
        var promise = $.ajax({
          url: url,
          type: 'GET',
          contentType: 'application/json; charset=utf-8',
          dataType: 'json',
          success: function (data, status, jqXHR) {
            
          }
        });
    
        promise.then(function (resolve) {
          //console.log("data "+ resolve)
          //console.log('Place name ' + resolve[1][0]);
          //console.log('place info ' + resolve[2][0]);
          //console.log('-------------------');
          $('.loadingwrap').hide();
          
           var building = places()[x];
           building.desc=resolve[2][0];
            var location = new google.maps.LatLng(building.lat, building.lng);
           addMarker(map, building.name,building.desc, location);
           
        });
    
      }

      /*addMarker*/
      var addMarker = function(map, name,description, location){
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            title:name
          });
          
        
          google.maps.event.addListener(marker, 'click', function () {
            if (typeof infowindow != 'undefined') {
              infowindow.close();
            }
            infowindow = new google.maps.InfoWindow({
              content: name+'<br>'+description
            });
            infowindow.open(map, marker);
          });
      }


    /*starter map */
    var starterMap = function () {
        var startmap = { lat: 29.9792971, lng: 31.1332649 };
        map = new google.maps.Map(document.getElementById('map'), {
            center: startmap,
            zoom: 6
        });
        addEachPlace();
    }

    var init = function () {
        /* add code to initialize this module */
        ko.applyBindings(neighborhoodMap)
        google.maps.event.addDomListener(window, 'load', starterMap);
    }

    /* execute the init function when the DOM is ready */
    $(init);

    return {
        /*to be exposed publicly */
        places: places
    }

}();