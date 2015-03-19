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
        alert(JSON.stringify(xhr));
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
var BusesDAO = (function () {
    var proxy = new ServiceProxy("/Servicios/wsBuses.asmx/");
    return {
        Gets: function (fCorrecto) {
            proxy._doAjax("GET", "Gets", null, fCorrecto, null, true);
        },
        InsertGrupo: function (NombreGrupo, fCorrecto) {
            var Parametro = {
                NombreGrupo: "'" + NombreGrupo + "'"
            }
            proxy._doAjax("GET", "InsertGrupo", Parametro, fCorrecto, null, true);
        },
        Insert: function (objBus, fCorrecto) {
            var Parametro = {
                Reg: JSON.stringify(objBus)
            }
            proxy._doAjax("GET", "Insert", Parametro, fCorrecto, null, true);
        },
        Update: function (objBus, fCorrecto) {
            var Parametro = {
                Reg: JSON.stringify(objBus)
            }
            proxy._doAjax("GET", "Update", Parametro, fCorrecto, null, true);
        },
        Delete: function (Placa, fCorrecto) {
            var Parametro = {
                Placa: "'" + Placa + "'"
            }
            proxy._doAjax("GET", "Delete", Parametro, fCorrecto, null, true);
        }
    }
}());
var DatosBasicosDAO = (function () {
    var proxy = new ServiceProxy("/Servicios/wsDatosBasicos.asmx/");
    return {
        Get: function (fCorrecto) {
            proxy._doAjax("GET", "GetDatosBasicos", null, fCorrecto, null, true);
        }
    }
}());
var RutasDAO = (function () {
    var proxy = new ServiceProxy("/Servicios/wsRutas.asmx/");
    return {
        Gets: function (fCorrecto) {
            proxy._doAjax("GET", "Gets", null, fCorrecto, null, true);
        },
        Insert: function (objRuta, fCorrecto) {
            var Parametro = {
                Reg: JSON.stringify(objRuta)
            }
            proxy._doAjax("GET", "Insert", Parametro, fCorrecto, null, true);
        },
        Delete: function (mNomRuta, fCorrecto) {
            var Parametro = {
                NomRuta: "'" + mNomRuta + "'"
            }
            proxy._doAjax("GET", "Delete", Parametro, fCorrecto, null, true);
        },
        AsignarPuntosRuta: function (lCoor, fCorrecto) {
            var Parametro = {
                Reg: JSON.stringify(lCoor)
            }
            proxy._doAjax("GET", "AsigPuntosRuta", Parametro, fCorrecto, null, true);
        }
    }
}());
var PlanillaControlDAO = (function () {
    var proxy = new ServiceProxy("/Servicios/wsPlanillaControl.asmx/");
    return {        
        GetsRotacionBuses: function (Mes,Grupo,fCorrecto) {
            var Parametro = {
                mes: "'" + Mes + "'",
                grupo: "'" + Grupo + "'"
            }
            proxy._doAjax("GET", "getRotacionBuses", Parametro, fCorrecto, null, true);
        },
        Update: function (vBuses, fCorrecto) {
            var Parametro = {
                lDpDTO: JSON.stringify(vBuses)
            }
            
            proxy._doAjax("GET", "update", Parametro, fCorrecto, null, true);
        }
    }
}());
var horarioDTO = (function () {
    var proxy = new ServiceProxy("/Servicios/wsHorario.asmx/");
    return {
        GetsHorario: function (NomRuta, fCorrecto) {
            var Parametro = {
                nomRuta: "'" + NomRuta + "'"
            }
            proxy._doAjax("GET", "getHorario", Parametro, fCorrecto, null, true);
        }
    }
}());














