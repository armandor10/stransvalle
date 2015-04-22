var HistorialMovi = (function () {
    var sesion = false;
    var listaPermisos;
    var Ruta = new Array();
    var con = 0;
    var poly;
    var markers = new Array();
    var poly2;
    var markers2 = new Array();
    var markers3;
    var map;
    var lRutas;
    var recorridos;
    var lEsDto;
    var velocimetro = 'images/velocimetro3.png'

    var _addHandlers = function () {

        $("#Buscar").click(function () {

            var fecha = $("#dtpFecha").data('DateTimePicker').date().toString();

            if ($("#Vial").val().length > 0 && fecha.length > 0) {
                HistorialMovimientoDAO.GetDetallesRecorridos($("#dtpFecha").data('DateTimePicker').date(),
                $("#Vial").val(), function (result) {
                    lEsDto = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;

                    if (lEsDto != null) {
                        recorridos = [];
                        $.each(lEsDto, function (index, item) {
                            //alert(item.Fecha);
                            recorridos.push({
                                id: (parseInt(index) + 1)
                            });
                        });

                        $("#cboRecorridos").byaCombo({
                            DataSource: recorridos, placeHolder: 'Seleccione...', Display: "id", Value: "id"
                        });
                    }
                    else
                    {
                        alert("No se Encontro Historial para el Bus!!!");
                    }
                });
            }
            else
            {
                alert("Agregue la fecha y/o el Vial");
            }

            
        });

        $("#cboRecorridos").change(function () {
            var e = {}
            e.Placa = lEsDto[(parseInt($(this).val()) - 1)].Placa;
            e.Fecha = new Date(parseFloat(lEsDto[(parseInt($(this).val()) - 1)].Fecha.replace("/Date(", "").replace(")/", "")));
            e.FechaFin = new Date(parseFloat(lEsDto[(parseInt($(this).val()) - 1)].FechaFin.replace("/Date(", "").replace(")/", "")));
            //alert(e.Fecha);

            HistorialMovimientoDAO.Get(e, function (result) {
                lHmDto = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;

                $("#ruta").empty().append("<strong>" + lHmDto[0].Ruta + "</strong>");
                VerInformacionRuta(lHmDto[0].Ruta);                
                DibujarRecorrido(lHmDto);

            });
        });

        $(".snumero").keypress(function () {
            byaPage.txtSoloNumeros();
        });

        $("#btnCerrarSesion").click(function () {
            varLocal.removeUser();
            varLocal.removeRol();
            window.location.href = "index.html";
        });
    };
    var _createElements = function () {
        CargarDatosBasicos();
        TraerRutas();
    };
    var _VerificarPermisos = function () {
        var user = varLocal.getUser();
        var rol = varLocal.getRol();
        if ((user != null) && (rol != null) && (rol==3) ) {
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

        puntosCtr();
    };
    var puntosCtr = function () {
        //Puntos de control
        $(function () {
            DatosBasicosDAO.Get(function (result) {
                DatosBasicos = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
                markers3 = new Array();
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
        markers3.push(marker);
    };

    var CargarDatosBasicos = function () {
        $(function () {
            $('#dtpFecha').datetimepicker({ format: 'DD/MM/YYYY', locale: 'es' });
            $('#dtpFecha').data("DateTimePicker").minDate(new Date(2014, 1, 1));
            $('#dtpFecha').data("DateTimePicker").maxDate(new Date());
        });
    };

    var addMarker = function (location,title) {
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            icon: velocimetro,
            title:title
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
                addMarker((new google.maps.LatLng(item.Latitud, item.Longitud)),item.Velocidad+"Km/h");
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
    HistorialMovi.init();
});