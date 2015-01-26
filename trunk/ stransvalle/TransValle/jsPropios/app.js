//http://yoavniran.wordpress.com/2009/08/02/creating-a-webservice-proxy-with-jquery/
var MIAPLICACION = MIAPLICACION || {};

//Capa Infraestructura de Acceso a Servicios Externos
//Definicion de Propiedades
ServiceProxy = function (baseUrl) //constructor for the proxy
{
    this._baseURL = baseUrl;
};
//Definicion de Metodos
ServiceProxy.prototype =
{
    _defaultErrorHandler: function (xhr, status, error) {
        alert(JSON.stringify(error));
        alert(JSON.stringify(xhr));
        alert(JSON.stringify(status));
    },
    _defaultBefore: function (xhr) {
    },
    //POST, PUT // GET Sincrono o Asincrono
    _doAjax: function (sType, uri, data, fnSuccess, fnError, _async) {
        if (!data) data = {};
        if (!fnError) fnError = this._defaultErrorHandler;
        if (!_async) _async = true;
        $.ajax({
            type: sType,
            url: this._baseURL + uri,
            data: data,
            async: _async,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: fnSuccess,
            error: fnError
        });
    }
};

//Capa de Acceso a Datos . DAO
var UsersDAO = (function () {
    var proxy = new ServiceProxy("/Servicios/wsUsers.asmx/");
    return {
        Login: function (user, pass, fCorrecto) {
            var Parametro = {
                user : "'" + user + "'",
                password: "'" + pass + "'"
            }
            proxy._doAjax("GET", "LoginPlataforma",Parametro,fCorrecto,null,true);
        }
    }
}());
















