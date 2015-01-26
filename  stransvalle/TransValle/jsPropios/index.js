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
                window.location.href = "Home.html";
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