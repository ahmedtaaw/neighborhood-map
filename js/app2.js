/*Module for neighborhood map*/
var neighborhoodMap=function(){
    
    /*To make an array of places*/
    var places = ko.observableArray(landmarkslocations);

    /*draw map*/
    var drawMap= function(){

    } 

    var init=function(){
        /* add code to initialize this module */
        ko.applyBindings(neighborhoodMap)
    }

    /* execute the init function when the DOM is ready */
    $(init);

    return{
        /*to be exposed publicly */
        places:places
    }

}();