var gBuses = (function () {
    var sesion = false;

    var _addHandlers = function () {
        $("#btnDetallesBus").click(function () {
            $('#ModalDetallesBus').modal('show');
        });

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
    
    return {
        init: function () {
            if (_VerificarPermisos()) {
                _createElements();
                _addHandlers();
            } else window.location.href = "index.html";
        }
    };
}());

$(document).ready(function () {
    gBuses.init();
});