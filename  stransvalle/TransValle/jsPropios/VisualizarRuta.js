var VisualizarRuta = (function () {
    var sesion = false;
    var listaPermisos;
    var Ruta = new Array();
    var con = 0;
    var poly;
    var markers = new Array();
    var poly2;
    var markers2 = new Array();
    var map;
    var lRutas;
    var recorridos;
    var lEsDto;
    var velocimetro = 'images/bus.png'
    var time;

    var _addHandlers = function () {

        $("#cboRuta").change(function () {
            clearTimeout(time);
            clearMarkers();
            initializeMap();
            puntosCtr();
            markers = new Array();

            VerInformacionRuta($(this).val());            
            VerBusesRuta($(this).val());           
        });

        $("#btnCerrarSesion").click(function () {
            varLocal.removeUser();
            varLocal.removeRol();
            window.location.href = "index.html";
        });
    };
    var _createElements = function () {
        TraerRutas();
        puntosCtr();
    };
    var _VerificarPermisos = function () {
        var user = varLocal.getUser();
        var rol = varLocal.getRol();
        if ((user != null) && (rol != null) && (rol == 3)) {
            $("#dvdUser").html('<i class="fa fa-user"></i> ' + user + ' <b class="caret">');
            listaPermisos = Permisos.Get(rol);
            $.each(listaPermisos, function (index, item) {
                $("#" + item).fadeIn();
            });
            return true;
        }
        else return false;
    };
    var initializeMap = function () {
        var haightAshbury = new google.maps.LatLng(10.466606, -73.252523);
        var mapOptions = {
            zoom: 14,
            center: haightAshbury,
            disableDefaultUI: true
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
    };
    var puntosCtr = function () {
        //Puntos de control
        $(function () {
            DatosBasicosDAO.Get(function (result) {
                DatosBasicos = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
                markers2 = new Array();
                $.each(DatosBasicos.lPctrlDto, function (index, item) {
                    addReloj((new google.maps.LatLng(item.Latitud, item.Longitud)), item.Nombre);
                });
            });
        });
    };    
    var addReloj = function (location, title) {
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            title: title,
            icon: 'images/chronometer.png'
        });
        markers2.push(marker);
    };
    var addMarker = function (location, title) {
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: velocimetro,
            title: title
        });
        markers.push(marker);
    };
    var setAllMap = function (map) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
        }
    };
    var clearMarkers = function () {
        setAllMap(null);
    };
    var showMarkers = function () {
        setAllMap(map);
    };
    var deleteMarkers = function () {
        clearMarkers();
        markers = [];
    };
    var removeLine = function () {
        poly.setMap(null);
        var polyOptions = {
            strokeColor: '#000000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        };
        poly = new google.maps.Polyline(polyOptions);
        poly.setMap(map);
    };
    var setMarkerPosition = function (marker, position) {
        //alert(marker);
        marker.setPosition(position);
        //map.panTo(marker.getPosition());
        //alert("cambio");
    };
    var VerBusesRuta = function (nombreRuta) {
        HistorialMovimientoDAO.GetCoordTodayBuses(nombreRuta, function (result) {
            var ban;
            lHmDto = [];
            lHmDto = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
            $("#lBuses").empty();

            if (lHmDto != null) {
                $.each(lHmDto, function (index, item) {

                    ban = false;
                    $.each(markers, function (ind, ite) {
                        if (ite.title == item.Vial) {
                            ///cambio ubicación
                            setMarkerPosition(ite, (new google.maps.LatLng(item.Latitud, item.Longitud)));
                            ban = true;
                            return false;
                        }
                    });

                    if (!ban) {
                        addMarker((new google.maps.LatLng(item.Latitud, item.Longitud)), item.Vial);
                    }

                    //Cargar Buses
                    $("#lBuses").append("<div class='col-md-4 col-centered' style='color:white;text-align:left; '>" + item.Vial + "</div>" +
                                        "<div class='col-md-6 col-centered' style='color:white;'>" + item.Velocidad+" Km/h"+ "</div>");
                });
            }
            
        });
        time = setTimeout(function () { VerBusesRuta(nombreRuta); }, 5000);
    };
    var TraerRutas = function () {
        RutasDAO.Gets(function (result) {
            lRutas = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
            $("#cboRuta").byaCombo({
                DataSource: lRutas, placeHolder: 'Seleccione...', Display: "NomRuta", Value: "NomRuta"
            });
        });
    };
    var VerInformacionRuta = function (NombreRutaActual) {
        $.each(lRutas, function (index, item) {
            if (item.NomRuta == NombreRutaActual) {
                DibujarRutaInfo(item.lCoordenadas);
            }
        });
    };
    var DibujarRutaInfo = function (listaCoordenadas) {
        initializeMap();
        var polyOptions = {
            strokeColor: "#00A800",
            strokeOpacity: 1.0,
            strokeWeight: 2,
        };
        var poly = {};
        poly = new google.maps.Polyline(polyOptions);
        poly.setMap(map);

        $.each(listaCoordenadas, function (index, item) {
            var path = poly.getPath();
            path.push(new google.maps.LatLng(item.Latitud, item.Longitud));
        });
    };
    var DibujarRecorrido = function (hMDto) {
        var polyOptions2 = {
            strokeColor: "#FF3100",
            strokeOpacity: 1.0,
            strokeWeight: 2,
        };
        var poly2 = {};
        poly2 = new google.maps.Polyline(polyOptions2);
        poly2.setMap(map);

        markers = new Array();
        $.each(hMDto, function (index, item) {
            var path = poly2.getPath();
            path.push(new google.maps.LatLng(item.Latitud, item.Longitud));
            if (parseInt(item.Velocidad) > 62) {
                addMarker((new google.maps.LatLng(item.Latitud, item.Longitud)), item.Velocidad + "Km/h");
            }
        });
    };

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
    VisualizarRuta.init();
});