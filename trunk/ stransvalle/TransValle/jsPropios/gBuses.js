﻿var gBuses = (function () {
    var sesion = false;
    var lBuses;
    var DatosBasicos;
    var OpcionEjecutar;
    var indexBusSeleccionado;
    var table;

    var _addHandlers = function () {
        $("#btnDetallesBus").click(function () {
            $('#ModalDetallesBus').modal('show');
            gBuses.LimpiarDeshabilitar();
            VerDetallesBusSeleccionado();
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
            gBuses.LimpiarHabilitar();
            $("#txtPlacabus").byaSetHabilitar(false);
            VerDetallesBusSeleccionado();
        });
        $("#btnGuardarBus").click(function () {
            if (OpcionEjecutar == "Nuevo") RegistrarNuevoBus();
            if (OpcionEjecutar == "Editar") EditarBus();
        });
        $("#btnEliminarBus").click(function () {
            var confirmacion = confirm("Esta seguro que quiere eliminar el bus de placa " + lBuses[indexBusSeleccionado].Placa + "?\nUna vez borrado no podra recuperar ninguna informacion de ese bus");
            if(confirmacion) EliminarBus();
        });
        $("#btnNuevoGrupo").click(function () {
            $("#txtNombreGrupo").val("");
            $("#modalNuevoGrupo").modal("show");
        });
        $("#btnGuardarNuevoGrupo").click(function () {
            var NomGrup = $("#txtNombreGrupo").val();
            if (NomGrup != "") {
                NuevoGrupo(NomGrup);
            } else alert("Debe especificar un nombre para el grupo...");
        });
    };
    var _createElements = function () {
        CargarDatosBasicos();
        createTable();
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
    var CargarBuses = function () {
        BusesDAO.Gets(function (result) {

            table.destroy();

            lBuses = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
            $("#tableBuses").html("");
            $.each(lBuses, function (index, item) {
                var Fecha = byaPage.converJSONDate(item.FechaMatricula);
                $("#tableBuses").append("<tr id='" + index + "' onclick='gBuses.SeleccionarBusTabla(id)'><td>" + item.Placa +
                    "</td><td>" + item.Vial + "</td><td>" + item.Marca + "</td><td>" + Fecha + "</td><td>" + item.NombreClaseServicio +
                    "</td><td>" + item.NombreClaseBus + "</td><td>" + item.NombreGrupo + "</td></tr>");
            });

            createTable();
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

            $("#cboGrupoBus").byaCombo({
                DataSource: DatosBasicos.lGruposBuses, placeHolder: 'Seleccione...', Display: "Nombre", Value: "id"
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
        e.Grupo =  $("#cboGrupoBus").val();

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
                var respuesta = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
                if (respuesta.Error == false) {
                    CargarBuses();
                    $("#ModalDetallesBus").modal("hide");
                } else {
                    alert(respuesta.Mensaje);
                }

            });
        }
    };
    var _dibujarTablaBusesSeleccionado = function (indexactual) {
        table.destroy();

        $("#tableBuses").html("");
        $.each(lBuses, function (index, item) {
            var Fecha = byaPage.converJSONDate(item.FechaMatricula);
            if (indexactual == index) $("#tableBuses").append("<tr class='info' id='" + index +
                "' onclick='gBuses.SeleccionarBusTabla(id)'><td>" + item.Placa + "</td><td>" + item.Vial +
                "</td><td>" + item.Marca + "</td><td>" + Fecha + "</td><td>" + item.NombreClaseServicio +
                "</td><td>" + item.NombreClaseBus + "</td><td>" + item.NombreGrupo + "</td></tr>");
            else $("#tableBuses").append("<tr id='" + index + "' onclick='gBuses.SeleccionarBusTabla(id)'><td>" + item.Placa +
                "</td><td>" + item.Vial + "</td><td>" + item.Marca + "</td><td>" + Fecha + "</td><td>" + item.NombreClaseServicio +
                "</td><td>" + item.NombreClaseBus + "</td><td>" + item.NombreGrupo + "</td></tr>");
        });

        createTable();
    };
    var VerDetallesBusSeleccionado = function () {
        $("#txtPlacabus").val(lBuses[indexBusSeleccionado].Placa);
        $("#txtVial").val(lBuses[indexBusSeleccionado].Vial);
        $("#txtCapacidad").val(lBuses[indexBusSeleccionado].Capacidad);
        $("#cboGrupoBus").val(lBuses[indexBusSeleccionado].Grupo);
        $("#cboClaseBus").val(lBuses[indexBusSeleccionado].ClaseBus);
        $("#cboClaseServicio").val(lBuses[indexBusSeleccionado].ClaseServicio);
        $("#txtMarca").val(lBuses[indexBusSeleccionado].Marca);
        $("#txtModelo").val(lBuses[indexBusSeleccionado].Modelo);
        $("#txtNumeroChasis").val(lBuses[indexBusSeleccionado].NumeroChasis);
        $("#txtNumeroMotor").val(lBuses[indexBusSeleccionado].NumeroMotor);
        $("#txtObservaciones").val(lBuses[indexBusSeleccionado].Observaciones);
        $("#txtPassword").val(lBuses[indexBusSeleccionado].Password);
        $("#fchMatricula").val(byaPage.converJSONDate(lBuses[indexBusSeleccionado].FechaMatricula));
    };
    var EliminarBus = function () {
        BusesDAO.Delete(lBuses[indexBusSeleccionado].Placa, function (result) {
            var respuesta = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
            if (respuesta.Error == false) {
                CargarBuses();
            } else {
                alert(respuesta.Mensaje);
            }
        });
    };
    var EditarBus = function () {
        if (_esValidoDatosBus()) {
            BusesDAO.Update(_getDatosBus(), function (result) {
                var respuesta = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
                if (respuesta.Error == false) {
                    CargarBuses();
                    $("#ModalDetallesBus").modal("hide");
                } else {
                    alert(respuesta.Mensaje);
                }

            });
        }
    };
    var NuevoGrupo = function (NomGru) {
        BusesDAO.InsertGrupo(NomGru, function (result) {
            var respuesta = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
            if (respuesta.Error == false) {
                CargarDatosBasicos();
                $("#modalNuevoGrupo").modal("hide");
            } 
            alert(respuesta.Mensaje);
        });
    };
    
    var createTable = function () {
        $(function () { // Crear DataTable
            table = $('#tBuses').DataTable({
                "language": {
                    "sProcessing": "Procesando...",
                    "sLengthMenu": "Mostrar _MENU_ registros",
                    "sZeroRecords": "No se encontraron resultados",
                    "sEmptyTable": "Ningún dato disponible en esta tabla",
                    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
                    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
                    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                    "sInfoPostFix": "",
                    "sSearch": "Buscar:",
                    "sUrl": "",
                    "sInfoThousands": ",",
                    "sLoadingRecords": "Cargando...",
                    "oPaginate": {
                        "sFirst": "Primero",
                        "sLast": "Último",
                        "sNext": "Siguiente",
                        "sPrevious": "Anterior"
                    },
                    "oAria": {
                        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                    }
                },
                scrollY: "300px",
                scrollX: true,
                scrollCollapse: true,
                paging: true
            });
            //new $.fn.dataTable.FixedColumns(table);
        });
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
            $("#cboGrupoBus").byaSetHabilitar(true);

            $("#cboGrupoBus").val("");
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
            $("#cboGrupoBus").byaSetHabilitar(false);

            $("#cboGrupoBus").val("");
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
        SeleccionarBusTabla: function (index) {
            indexBusSeleccionado = index;
            _dibujarTablaBusesSeleccionado(index);
        }
    };
}());

$(document).ready(function () {
    gBuses.init();
});