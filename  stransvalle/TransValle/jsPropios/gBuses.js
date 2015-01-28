var gBuses = (function () {
    var sesion = false;
    var lBuses;
    var DatosBasicos;
    var OpcionEjecutar;

    var _addHandlers = function () {
        $("#btnDetallesBus").click(function () {
            $('#ModalDetallesBus').modal('show');
            gBuses.LimpiarDeshabilitar();
        });
        $("#btnCerrarSesion").click(function () {
            varLocal.removeUser();
            varLocal.removeRol();
            window.location.href = "index.html";
        });
        $("#btnNuevoBus").click(function () {
            OpcionEjecutar = "Nuevo";
            $('#ModalDetallesBus').modal('show');
            gBuses.LimpiarHabilitar();
        });
        $("#btnEditarBus").click(function () {
            OpcionEjecutar = "Editar";
            $('#ModalDetallesBus').modal('show');
            gBuses.LimpiarDeshabilitar();
        });
        $("#btnGuardarBus").click(function () {
            if (OpcionEjecutar == "Nuevo") RegistrarNuevoBus();
        });
    };
    var _createElements = function () {
        CargarDatosBasicos();
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
    var CargarBuses = function () {
        BusesDAO.Gets(function (result) {
            lBuses = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
            $("#tableBuses").html("");
            $.each(lBuses, function (index, item) {
                var Fecha = byaPage.converJSONDate(item.FechaMatricula);
                $("#tableBuses").append("<tr id='" + index + "'><th>" + item.Placa + "</th><th>" + item.Vial + "</th><th>" + item.Marca + "</th><th>" + Fecha + "</th><th>" + item.NombreClaseServicio + "</th><th>" + item.NombreClaseBus + "</th></tr>");
            });
        });
    };
    var CargarDatosBasicos = function () {
        DatosBasicosDAO.Get(function (result) {
            DatosBasicos = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;

            $("#cboClaseBus").byaCombo({
                DataSource: DatosBasicos.lClasesBuses, placeHolder: 'Seleccione...', Display: "Nombre", Value: "id"
            });

            $("#cboClaseServicio").byaCombo({
                DataSource: DatosBasicos.lClasesServicio, placeHolder: 'Seleccione...', Display: "Nombre", Value: "id"
            });
        });
    };
    var _esValidoDatosBus = function () {
        var ban = true;
        var cadenaError = "Error:";
        if ($("#txtPlacabus").val() == "") {
            ban = false;
            cadenaError = cadenaError + "\nLa placa no puede ir vacia...";
        }
        if ($("#txtVial").val() == "") {
            ban = false;
            cadenaError = cadenaError + "\nEl vial no puede ir vacio...";
        }
        if ($("#cboClaseBus").val() == "") {
            ban = false;
            cadenaError = cadenaError + "\nLa clase de bus no puede ir vacio...";
        }
        if ($("#cboClaseServicio").val() == "") {
            ban = false;
            cadenaError = cadenaError + "\nLa clase de servicio no puede ir vacio...";
        }
        alert($("#fchMatricula").val());
        if ($("#fchMatricula").val() == "") {
            ban = false;
            cadenaError = cadenaError + "\nLa fecha de matricula no puede ir vacio...";
        }
        if (ban == false) alert(cadenaError);
        return ban;
    };
    var _getDatosBus = function () {
        var e = {}
        e.Placa = $("#txtPlacabus").val();
        e.Vial = $("#txtVial").val();
        e.Capacidad = $("#txtCapacidad").val();
        e.ClaseBus = $("#cboClaseBus").val();
        e.ClaseServicio = $("#cboClaseServicio").val();
        e.Marca = $("#txtMarca").val();
        e.Modelo = $("#txtModelo").val();
        e.NumeroChasis = $("#txtNumeroChasis").val();
        e.NumeroMotor = $("#txtNumeroMotor").val();
        e.Observaciones = $("#txtObservaciones").val();
        e.Password = $("#txtPassword").val();

        var fecha = "" + $("#fchMatricula").val(); + "";
        fecha = fecha.split("-");

        e.DiaMatricula = fecha[2];
        e.MesMatricula = fecha[1];
        e.AñoMatricula = fecha[0];

        return e;
    };
    var RegistrarNuevoBus = function () {
        if (_esValidoDatosBus()) {
            BusesDAO.Insert(_getDatosBus(), function (result) {
                alert(JSON.stringify(result));
            });
        }
    };
    
    return {
        init: function () {
            if (_VerificarPermisos()) {
                _createElements();
                _addHandlers();
                
                CargarBuses();
            } else window.location.href = "index.html";
        },
        LimpiarHabilitar: function () {
            $("#txtPlacabus").byaSetHabilitar(true);
            $("#txtVial").byaSetHabilitar(true);
            $("#txtCapacidad").byaSetHabilitar(true);
            $("#cboClaseBus").byaSetHabilitar(true);
            $("#cboClaseServicio").byaSetHabilitar(true);
            $("#fchMatricula").byaSetHabilitar(true);
            $("#txtMarca").byaSetHabilitar(true);
            $("#txtModelo").byaSetHabilitar(true);
            $("#txtNumeroChasis").byaSetHabilitar(true);
            $("#txtNumeroMotor").byaSetHabilitar(true);
            $("#txtObservaciones").byaSetHabilitar(true);
            $("#txtPassword").byaSetHabilitar(true);

            $("#txtPlacabus").val("");
            $("#txtVial").val("");
            $("#txtCapacidad").val("");
            $("#cboClaseBus").val("");
            $("#cboClaseServicio").val("");
            $("#fchMatricula").val("");
            $("#txtMarca").val("");
            $("#txtModelo").val("");
            $("#txtNumeroChasis").val("");
            $("#txtNumeroMotor").val("");
            $("#txtObservaciones").val("");
            $("#txtPassword").val("");
        },
        LimpiarDeshabilitar: function () {
            $("#txtPlacabus").byaSetHabilitar(false);
            $("#txtVial").byaSetHabilitar(false);
            $("#txtCapacidad").byaSetHabilitar(false);
            $("#cboClaseBus").byaSetHabilitar(false);
            $("#cboClaseServicio").byaSetHabilitar(false); 
            $("#txtMarca").byaSetHabilitar(false);
            $("#fchMatricula").byaSetHabilitar(false);
            $("#txtModelo").byaSetHabilitar(false);
            $("#txtNumeroChasis").byaSetHabilitar(false);
            $("#txtNumeroMotor").byaSetHabilitar(false);
            $("#txtObservaciones").byaSetHabilitar(false);
            $("#txtPassword").byaSetHabilitar(false);

            $("#txtPlacabus").val("");
            $("#txtVial").val("");
            $("#txtCapacidad").val("");
            $("#cboClaseBus").val("");
            $("#cboClaseServicio").val("");
            $("#fchMatricula").val("");
            $("#txtMarca").val("");
            $("#txtModelo").val("");
            $("#txtNumeroChasis").val("");
            $("#txtNumeroMotor").val("");
            $("#txtObservaciones").val("");
            $("#txtPassword").val("");
        }
    };
}());

$(document).ready(function () {
    gBuses.init();
});