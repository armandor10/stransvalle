var gConductores = (function () {
    var sesion = false;
    var lConductores;
    var DatosBasicos;
    var OpcionEjecutar;
    var indexSeleccionado;

    var _addHandlers = function () {
        $("#btnDetalles").click(function () {
            $('#ModalDetalles').modal('show');
            VerDetalles();
        });
        $("#btnCerrarSesion").click(function () {
            varLocal.removeUser();
            varLocal.removeRol();
            window.location.href = "index.html";
        });
        $("#btnNuevo").click(function () {
            Nuevo();
        });
        $("#btnEditar").click(function () {
            Editar();
        });
        $("#btnGuardarBus").click(function () {
                if (OpcionEjecutar == "Nuevo") GuardarNuevo();
                if (OpcionEjecutar == "Editar") GuardarModificado();
        });
        $("#btnEliminar").click(function () {
            var confirmacion = confirm("Desea eliminar este registro?");
            if (confirm) Eliminar();
        });
    };
    var _createElements = function () {
        CargarDatosBasicos();
    };
    var GuardarNuevo = function () {
        if (_esValidoDatos()) {
            var datos = byaPage._getDatosCampos("datos");
            datos.TipoPersona = 1;
            PersonasDAO.Insert(datos, function (result) {
                var respuesta = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
                if (respuesta.Error == false) {
                    CargarConductores();
                    $("#ModalDetalles").modal("hide");
                } else {
                    alert(respuesta.Mensaje);
                }
            });
        }
    };
    var GuardarModificado = function () {
        if (_esValidoDatos()) {
            var datos = byaPage._getDatosCampos("datos");
            datos.TipoPersona = 1;
            PersonasDAO.Update(datos, function (result) {
                var respuesta = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
                if (respuesta.Error == false) {
                    CargarConductores();
                    $("#ModalDetalles").modal("hide");
                } else {
                    alert(respuesta.Mensaje);
                }
            });
        }
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
    var CargarDatosBasicos = function () {
        DatosBasicosDAO.Get(function (result) {
            DatosBasicos = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;

            $("#cboTipoIdentificacion").byaCombo({
                DataSource: DatosBasicos.lTiposIdentificacion, placeHolder: 'Seleccione...', Display: "Nombre", Value: "id"
            });
        });
    };
    var _esValidoDatos = function () {
        var lCampos = new Array();
        $(".validar").each(function (index) {
            var id = "" + $(this).attr("id") + "";
            lCampos.push(id);
        });
        $.each(lCampos, function (index, item) {
            if ($("#" + item).val() == "") {
                $("#" + item).focus();
                alert("Los campos marcados con un * son obligatorios por favor completelos");
                return false;
            }
        });
        return true;
    };
    var _dibujarTablaSeleccionado = function (indexactual) {
        $("#tableConductores").html("");
        $.each(lConductores, function (index, item) {
            if (indexactual == index) $("#tableConductores").append("<tr class='info' id='" + index + "' onclick='gConductores.SeleccionarTabla(id)'><th>" + item.Cedula + "</th><th>" + item.Nombres + " " + item.Apellidos + "</th><th>" + item.Telefono + "</th><th>" + item.Direccion + "</th></tr>");
            else $("#tableConductores").append("<tr class='" + _colorFilaConductor() + "' id='" + index + "' onclick='gConductores.SeleccionarTabla(id)'><th>" + item.Cedula + "</th><th>" + item.Nombres + " " + item.Apellidos + "</th><th>" + item.Telefono + "</th><th>" + item.Direccion + "</th></tr>");
        });
    };
    var _colorFilaConductor = function (conduc) {
        return "danger";
    };
    var VerDetalles = function () {
        byaPage._setDatosCampos("datos", lConductores[indexSeleccionado]);
        $(".habilitar").byaSetHabilitar(false);
        $("#btnGuardar").byaSetHabilitar(false);
    };
    var Eliminar = function () {
        PersonasDAO.Delete(lConductores[indexSeleccionado].Cedula, function (result) {
            var respuesta = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
            if (respuesta.Error == false) {
                CargarConductores();
                $("#ModalDetalles").modal("hide");
            } else {
                alert(respuesta.Mensaje);
            }
        });
        //alert(JSON.stringify(lConductores[indexSeleccionado]));
    };
    var Editar = function () {
        OpcionEjecutar = "Editar";
        $('#ModalDetalles').modal('show');
        VerDetalles();

        $(".habilitar").byaSetHabilitar(true);
        $("#btnGuardar").byaSetHabilitar(true);
        $("#txtCedula").byaSetHabilitar(false);
    };
    var Nuevo = function () {
        OpcionEjecutar = "Nuevo";
        $('#ModalDetalles').modal('show');
        $(".limpiar").val("");
        $(".habilitar").byaSetHabilitar(true);
        $("#btnGuardar").byaSetHabilitar(true);
    };
    var CargarConductores = function () {
        PersonasDAO.GetsConductores(function (result) {
            lConductores = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
            $("#tableConductores").html("");
            $.each(lConductores, function (index, item) {
                $("#tableConductores").append("<tr class='" + _colorFilaConductor() + "' id='" + index + "' onclick='gConductores.SeleccionarTabla(id)'><th>" + item.Cedula + "</th><th>" + item.Nombres + " " + item.Apellidos + "</th><th>" + item.Telefono + "</th><th>" + item.Direccion + "</th></tr>");
            });
        });
    };

    return {
        init: function () {
            if (_VerificarPermisos()) {
                _createElements();
                _addHandlers();

                CargarConductores();
            } else window.location.href = "index.html";
        },
        SeleccionarTabla: function (index) {
            indexSeleccionado = index;
            _dibujarTablaSeleccionado(index);
        }
    };
}());

$(document).ready(function () {
    gConductores.init();
});