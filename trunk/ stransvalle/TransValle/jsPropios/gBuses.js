var gBuses = (function () {
    var sesion = false;

    var _addHandlers = function () {
        $("#btnDetallesBus").click(function () {
            $('#ModalDetallesBus').modal('show');
        });
    };
    var _createElements = function () {
    };
    var _VerificarPermisos = function () {
        return true;
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