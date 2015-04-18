var Inicio = (function () {
    var sesion = false;
    var listaPermisos;

    var _addHandlers = function () {
        $("#btnCerrarSesion").click(function () {
            varLocal.removeUser();
            varLocal.removeRol();
            window.location.href = "index.html";
        });
    };
    var _createElements = function () {
    };
    var _VerificarPermisos = function () {
        var user = varLocal.getUser();
        var rol = varLocal.getRol();
        if ((user != null) && (rol != null)) {
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
    
    return {
        init: function () {
            if (_VerificarPermisos()) {

                var rol = varLocal.getRol();
                _createElements();
                _addHandlers();
               
                if (rol == 2) { window.location.href = "PlanillaRecaudo.html";}
                else {initializeMap();}
                
            } else window.location.href = "index.html";
        }
    };
}());

$(document).ready(function () {
    Inicio.init();
});