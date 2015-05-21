var gConductores = (function () {
    var sesion = false;
    var lConductores = null;
    var DatosBasicos;
    var OpcionEjecutar;
    var indexSeleccionado;
    var table;
    var mes = new Array("Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre");
    var lBuses;

    var _addHandlers = function () {
        $("#CreatePDF").click(function () {
            ImprimirListaConductores();
        });
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
        $("#AsignarBus").click(function () {
            verAsignarBus();
            $('#ModalAsignarBus').modal('show');
        });
        $('#tConductores tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
        });

        $("#btGuardarAsignarBus").click(function () {
            if (_validarVial($('#txtVial').val())) {

                var objPer = {
                    Cedula: $('#txtNumDoc').val(),
                    Vial: $('#txtVial').val()
                };

                PersonasDAO.InsertOrUpdateAsignarBus(objPer, function (result) {
                    //var respuesta = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
                    alert("Asignación guardada!!!");
                    CargarConductores();
                });

            } else {
                alert("El Vial no existe!!!");
            }
        });
    };
    var _createElements = function () {
        CargarDatosBasicos();
        createTable();
        cargarBus();
    };

    var _validarVial = function (vial) {
        var ban = false;
        $.each(lBuses, function (index, item) {            
            if (item == vial) {
                //alert(item);
                ban = true;
                return true;
            }
        });
        return ban;
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
        table.destroy();

        $("#tableConductores").html("");
        $.each(lConductores, function (index, item) {
            if (indexactual == index) $("#tableConductores").append("<tr class='info' id='" + index +
                "' onclick='gConductores.SeleccionarTabla(id)'><td>" + item.Cedula + "</td><td>" + item.Nombres +
                " " + item.Apellidos + "</td><td>" + item.Telefono + "</td><td>" + item.Direccion + "</td><td>" +
                    _formatJSONDate(item.FechaVencimientoContratoConduccion) + "</td><td>" +
                    _formatJSONDate(item.FechaVencimientoLicenciaConduccion) + "</td></tr>");
            else $("#tableConductores").append("<tr id='" + index + "' onclick='gConductores.SeleccionarTabla(id)'><td>" + item.Cedula +
                "</td><td>" + item.Nombres + " " + item.Apellidos + "</td><td>" + item.Telefono + "</td><td>" + item.Direccion  + "<td>" +
                    _formatJSONDate(item.FechaVencimientoContratoConduccion) + "</td><td>" +
                    _formatJSONDate(item.FechaVencimientoLicenciaConduccion) + "</td></tr>");
        });

        createTable();
    };
    var _colorFilaConductor = function (conduc) {
        return "danger";
    };
    var _formatJSONDate = function (jsonDate) {
        //var da = new Date(parseInt(jsonDate.substr(6)));
        //return da.toLocaleDateString();
       return byaPage.converJSONDate(jsonDate)
    };
    var VerDetalles = function () {
        byaPage._setDatosCampos("datos", lConductores[indexSeleccionado]);
        $(".habilitar").byaSetHabilitar(false);
        $("#btnGuardar").byaSetHabilitar(false);
    };
    var verAsignarBus = function () {
        $("#txtNumDoc").val(lConductores[indexSeleccionado].Cedula);
        $("#txtNombre").val(lConductores[indexSeleccionado].Nombres + " " + lConductores[indexSeleccionado].Apellidos);
        $("#txtVial").val(lConductores[indexSeleccionado].Vial);
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

        $('#wait').toggle();       

        PersonasDAO.GetsConductores(function (result) {
            table.destroy();

            lConductores = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
            $("#tableConductores").html("");
            $.each(lConductores, function (index, item) {
                $("#tableConductores").append("<tr id='" + index + "' onclick='gConductores.SeleccionarTabla(id)'><td>" + item.Cedula + "</td><td>" +
                    item.Nombres + " " + item.Apellidos + "</td><td>" + item.Telefono + "</td><td>" + item.Direccion + "</td><td>" +
                    _formatJSONDate(item.FechaVencimientoContratoConduccion) + "</td><td>" +
                    _formatJSONDate(item.FechaVencimientoLicenciaConduccion) + "</td></tr>");
            });
            
            createTable();
            $('#wait').toggle();
        });
    };
    var ImprimirListaConductores = function () {
        if (lConductores != null) {
            $.get("/PlantillasImpresion/PrintListaConductores.html", function (data) {
                var Empresa, tbody = "";
                EmpresaDAO.Get(function (result) {
                    Empresa = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
                    //alert(JSON.stringify(Empresa));
                    data = data.replace("{NOM_EMPRESA}", '<h2><strong> ' + Empresa.RAZON_SOCIAL + ' </strong></h2>');
                    data = data.replace("{NIT_EMPRESA}", Empresa.NIT + '-' + Empresa.DIG_VER);

                    $.each(lConductores, function (index, item) {
                        tbody = tbody + "<tr id='" + index + "'><td>" + item.Cedula + "</td><td>" +
                            item.Nombres + " " + item.Apellidos + "</td><td>" + item.Telefono + "</td><td>" + item.Direccion + "</td><td>" +
                            _formatJSONDate(item.FechaVencimientoContratoConduccion) + "</td><td>" +
                            _formatJSONDate(item.FechaVencimientoLicenciaConduccion) + "</td></tr>";
                    });

                    data = data.replace("{CONDUCTORES}", tbody);

                    // Esta es la parte que te abre la ventana de imprecion...
                    var win;
                    win = window.open();
                    win.document.write(data);
                    win.print();
                    win.close();
                });
            });
        }   
    };
    var createTable = function () {
        $(function () { // Crear DataTable
            table = $('#tConductores').DataTable({
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
                scrollY: "270px",
                scrollX: true,
                scrollCollapse: true,
                paging: true,
                "order": [[5, "asc"]]
            });
            //new $.fn.dataTable.FixedColumns(table);
        });
    };
    var cargarBus = function () {
        BusesDAO.GetVial(function (result) {
            lBuses = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
            //alert( JSON.stringify(lBuses));
            //$("#Vial").autocomplete({
            //    source: lBuses
            //});
            $("#txtVial").typeahead({ source: lBuses });
        });
    };

    return {
        init: function () {
            if (_VerificarPermisos()) {
                _createElements();
                _addHandlers();

                $('#wait').toggle();
                CargarConductores();
            } else window.location.href = "index.html";
        },
        SeleccionarTabla: function (index) {
            indexSeleccionado = index;
            //_dibujarTablaSeleccionado(index);
        }
    };
}());

$(document).ready(function () {
    gConductores.init();
});