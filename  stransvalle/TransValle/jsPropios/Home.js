var Inicio = (function () {
    var sesion = false;

    var _addHandlers = function () {

    };
    var _createElements = function () {
    };
    var _VerificarPermisos = function () {
        return true;
    };

    var initializeMap = function () {
        var haightAshbury = new google.maps.LatLng(10.466606, -73.252523);
        var mapOptions = {
            zoom: 14,
            center: haightAshbury
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
    }
    
    return {
        init: function () {
            if (_VerificarPermisos()) {
                _createElements();
                _addHandlers();
                initializeMap();
            } else window.location.href = "index.html";
        }
    };
}());

$(document).ready(function () {
    Inicio.init();
});