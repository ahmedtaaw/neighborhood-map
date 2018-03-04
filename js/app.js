var map;
var addEachPlace;

function initmap() {
  var startmap = { lat: 29.9792971, lng: 31.1332649 };
  map = new google.maps.Map(document.getElementById('map'), {
    center: startmap,
    zoom: 6
  });

  ko.applyBindings(neighborhoodMap);
  addEachPlace();
}
/*Module for neighborhood map*/
var neighborhoodMap = function () {

  /** to make each place */
  var place = function (data) {
    this.name = ko.observable(data.name);
    this.lat = ko.observable(data.lat);
    this.lng = ko.observable(data.lng);
    this.desc = ko.observable(data.desc);
    this.category = ko.observable(data.category);
  };


  this.globalmarker = ko.observableArray();

  /*To make an array of places*/
  this.places = ko.observableArray(landmarkslocations);

  this.filters = ko.observableArray();

  this.selectedFilter = ko.observable('');

  this.filter = ko.observable('');

  this.myshowall = ko.observable(false);

  this.showloading = ko.observable(true);

  this.sidenavstatus = ko.observable(false);

  var filteredItems = ko.computed(function () {
    filter = selectedFilter();

    if (filter) {
      filterMarkers(filter);
    }
    if (!filter || filter == "None") {
      return places();
    } else {
      return ko.utils.arrayFilter(places(), function (i) {
        myshowall(true);
        return i.category == filter;
      });

    }

  });

  var filterMarkers = function (selectedplace) {
    if (selectedplace === 0) {
      for (var x in globalmarker()) {
        globalmarker()[x].setVisible(true);
        globalmarker()[x].setAnimation(false);
      }
    }
    else {
      for (var y in globalmarker()) {
        globalmarker()[y].setVisible(false);
        globalmarker()[y].setAnimation(false);
      }
      for (var i in globalmarker()) {
        //console.log(globalmarker()[i]);
        if (globalmarker()[i].category == selectedplace) {
          if (typeof infowindow != 'undefined') {
            infowindow.close();
          }
          globalmarker()[i].setVisible(true);
          //globalmarker()[i].setAnimation(google.maps.Animation.BOUNCE);
          //google.maps.event.trigger(globalmarker()[i], 'click');
          myshowall(true);
        }
      }
    }
  };

  var showall = function () {
    //console.log("showall");
    //console.log(selectedFilter());
    selectedFilter('');
    filterMarkers(0);
    // console.log(selectedFilter());
    myshowall(false);
  };
  var showallonlyclicked = function (data) {
    // console.log(data);

    for (var x in globalmarker()) {
      if (globalmarker()[x].title == data.name) {
        if (typeof infowindow != 'undefined') {
          infowindow.close();
        }
        globalmarker()[x].setVisible(true);
        globalmarker()[x].setAnimation(google.maps.Animation.BOUNCE);
        google.maps.event.trigger(globalmarker()[x], 'click');
        myshowall(true);
      }
    }
    //myshowall(true);
  };

  /*draw map*/
  addEachPlace = function () {
    for (var x in places()) {
      //new drawmarker(data);
      //console.log(places()[x].name)

      
      if ($.inArray(places()[x].category, filters()) == -1) {
        filters.push(places()[x].category);
      }
      getwikidata(places()[x].name, x);


    }



  };

  //get wiki data
  function getwikidata(placename, x) {

    //searchTerm = $("#wikisearch").val();
    url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + placename + '&format=json&callback=?';

    var promise = $.ajax({
      url: url,
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      success: function (data, status, jqXHR) {

      },
      error: function (request) {
        alert(request.responseText);
      }
    });

    promise.then(function (resolve) {
      //console.log("data "+ resolve)
      //console.log('Place name ' + resolve[1][0]);
      //console.log('place info ' + resolve[2][0]);
      //console.log('-------------------');
      //$('.loadingwrap').hide();
      showloading(false);

      var building = places()[x];
      building.desc = resolve[2][0];
      var location = new google.maps.LatLng(building.lat, building.lng);
      addMarker(map, building.name, building.category, building.desc, location);

    });

  }
  var infowindow;
  /*addMarker*/
  var addMarker = function (map, name, category, description, location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      animation: google.maps.Animation.DROP,
      title: name,
      category: category
    });



    globalmarker.push(marker);

    google.maps.event.addListener(marker, 'click', function () {
      if (typeof infowindow != 'undefined') {
        infowindow.close();
      }
      infowindow = new google.maps.InfoWindow({
        content: name + '<br>' + description,
        maxWidth: 300
      });
      infowindow.open(map, marker);
      toggleBounce();
    });
    var toggleBounce = function () {
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(google.maps.Animation.BOUNCE);
      }
    };
  };

  var collapsemenu = function () {

    //$('.sidenav').toggleClass("opened");
    sidenavstatus(!sidenavstatus());

  };



  //var init = function () {
  /* add code to initialize this module */

  //};

  /* execute the init function when the DOM is ready */
  //$(init);

  return {
    /*to be exposed publicly */
    places: places,
    filters: filters,
    selectedFilter: selectedFilter,
    filteredItems: filteredItems,
    showall: showall,
    showallonlyclicked: showallonlyclicked,
    collapsemenu: collapsemenu,
    myshowall: myshowall,
    showloading: showloading,
    sidenavstatus: sidenavstatus
  };

}();


function googleError() {
  alert("Error in Google Maps!");
}