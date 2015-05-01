var Login = (function () {
    var sesion = false;

    var _addHandlers = function () {
        $("#btnLogin").click(function () {
            Login();
        });
    };
    var _createElements = function () {
    };
    var _VerificarPermisos = function () {
        var user = varLocal.getUser();
        var rol = varLocal.getRol();
        if((user == null) && (rol == null)) return true;
        else return false;
    };

    var Login = function () {
        UsersDAO.Login($("#txtUsuario").val(), $("#txtPassword").val(), function (result) {
            var res = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d
            if (res == null) alert("Error: Usuario/Contraseña incorrecto...");
            else {
                varLocal.setUser(res.User);
                varLocal.setRol(res.Roll);

                var rol = res.Roll;
                if (rol == 2) { window.location.href = "PlanillaRecaudo.html"; }
                else if (rol == 1) { window.location.href = "InformeRecaudo.html"; }
                else if (rol == 3) { window.location.href = "VisualizarRuta.html"; }
            }
        });
    };

    return {
        init: function () {
            if (_VerificarPermisos()) {
                _createElements();
                _addHandlers();
            } else window.location.href = "Home.html";
        }
    };
}());

$(document).ready(function () {
    Login.init();
});