var gRutas = (function () {
    var sesion = false;
    var Ruta = new Array();
    var con = 0;
    var poly;
    var markers = new Array();
    var map;
    var lRutas;

    var _addHandlers = function () {
        $("#vrutas").click(function () {
            iniciarCapturaCoordenadas();
        });
        $("#oculto").click(function () {            
            RegistrarNuevaRuta();
        });
        $("#oculto2").click(function () {
            Ruta = new Array();
            iniciarCapturaCoordenadas();
        });
        $("#oculto3").click(function () {
            $("#oculto").fadeOut();
            $("#oculto2").fadeOut();
            $("#oculto3").fadeOut();
            google.maps.event.clearListeners(map, 'click');
            initializeMap();
        });
        $("#btnAgragarNuevoBus").click(function () {
            $("#tNomRuta").val("");
            $("#tDescripcion").val("");
            $("#tFrecuencia").val("");
            $("#tGabela").val("");
            $("#tDistancia").val("");
            $("#tCapacidad").val("");
            $("#tTiempoRecorrido").val("");
            LimpiarMapa();
        });
        $("#cboRutasInformacion").change(function () {
            var NombreRutaActual = $("#cboRutasInformacion").val();
            VerInformacionRuta(NombreRutaActual);
        });
        $("#btnEliminarRuta").click(function () {
            EliminarRuta($("#cboRutasBorrar").val());
        });
    };
    var _createElements = function () {
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
    var LimpiarMapa = function () {
        var haightAshbury = new google.maps.LatLng(10.466606, -73.252523);
        var mapOptions = {
            zoom: 14,
            center: haightAshbury,
            disableDefaultUI: true
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
    };
    var addLatLng = function (event) {
        var path = poly.getPath();
        path.push(event.latLng);
        var PuntoDTO = {};
        PuntoDTO.lat = event.latLng.lat();
        PuntoDTO.lon = event.latLng.lng();
        Ruta.push(PuntoDTO);
        if (con == 0) {
            addMarker(event.latLng);
        }
        con = con + 1;
    };
    var iniciarCapturaCoordenadas = function () {
        LimpiarMapa();
        $("#oculto").fadeIn();
        $("#oculto2").fadeIn();
        $("#oculto3").fadeIn();
        $("#oculto4").fadeIn();
        var polyOptions = {
            strokeColor: '#000000',
            strokeOpacity: 0.9,
            strokeWeight: 1
        };
        poly = new google.maps.Polyline(polyOptions);
        poly.setMap(map);
        google.maps.event.addListener(map, 'click', addLatLng);
    }; 
    var addMarker = function (location) {
        var marker = new google.maps.Marker({
            position: location,
            map: map
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
    var TraerRutas = function () {
        RutasDAO.Gets(function (result) {
            lRutas = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
            $("#cboRutasInformacion").byaCombo({
                DataSource: lRutas, placeHolder: 'Seleccione...', Display: "NomRuta", Value: "NomRuta"
            });
            $("#cboRutasBorrar").byaCombo({
                DataSource: lRutas, placeHolder: 'Seleccione...', Display: "NomRuta", Value: "NomRuta"
            });
        });
    };
    var _getDatosRuta = function () {
        var e = {}
        e.NomRuta = $("#tNomRuta").val();
        e.Descripcion = $("#tDescripcion").val();
        e.Frecuencia = $("#tFrecuencia").val();
        e.Gabela = $("#tGabela").val();
        e.Longitud = $("#tDistancia").val();
        e.Capacidad = $("#tCapacidad").val();
        e.TiempoRecorrido = $("#tTiempoRecorrido").val();
        return e;
    };
    var RegistrarNuevaRuta = function () {
        RutasDAO.Insert(_getDatosRuta(), function (result) {
            var respuesta = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
            if (respuesta.Error == false) {
                google.maps.event.clearListeners(map, 'click');                
                $("#oculto").fadeOut();
                $("#oculto2").fadeOut();
                $("#oculto3").fadeOut();
                LimpiarMapa();
                EnviarCoordenadasRuta(_getDatosRuta().NomRuta);
            }
            alert(respuesta.Mensaje);
        });
    };
    var EnviarCoordenadasRuta = function (NomRuta) {
        $.each(Ruta, function (index, item) {
            var e = {}
            e.id = index;
            e.NomRuta = NomRuta;
            e.Latitud = item.lat;
            e.Longitud = item.lon;
            RutasDAO.AsignarPuntosRuta(e, function (result) {
            });
        });
        Ruta = new Array();
        TraerRutas();
    };
    var VerInformacionRuta = function (NombreRutaActual) {
        $.each(lRutas, function (index, item) {
            if (item.NomRuta == NombreRutaActual) {
                $("#tNomRutaI").val(item.NomRuta);
                $("#tDescripcionI").val(item.Descripcion);
                $("#tFrecuenciaI").val(item.Frecuencia);
                $("#tGabelaI").val(item.Gabela);
                $("#tDistanciaI").val(item.Longitud);
                $("#tCapacidadI").val(item.Capacidad);
                $("#tTiempoRecorridoI").val(item.TiempoRecorrido);
                DibujarRutaInfo(item.lCoordenadas);
            }
        });
    };
    var DibujarRutaInfo = function (listaCoordenadas) {
        LimpiarMapa();
        var polyOptions = {
            strokeColor: "#000000",
            strokeOpacity: 1.0,
            strokeWeight: 1,
        };
        var poly = {};
        poly = new google.maps.Polyline(polyOptions);
        poly.setMap(map);

        $.each(listaCoordenadas, function (index, item) {
            var path = poly.getPath();
            path.push(new google.maps.LatLng(item.Latitud, item.Longitud));
        });
    };
    var EliminarRuta = function (NomRutaEliminar) {
        RutasDAO.Delete(NomRutaEliminar, function (result) {
            var respuesta = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
            if (respuesta.Error == false) {
                TraerRutas();
            }
            alert(respuesta.Mensaje);
        });
    };

    return {
        init: function () {
            if (_VerificarPermisos()) {
                _createElements();
                _addHandlers();
                initializeMap();
                TraerRutas();
            } else window.location.href = "index.html";
        },
        ValidaSoloNumeros: function() {
            if ((event.keyCode < 48) || (event.keyCode > 57))
                event.returnValue = false;
        }
    };
}());

$(document).ready(function () {
    gRutas.init();
});