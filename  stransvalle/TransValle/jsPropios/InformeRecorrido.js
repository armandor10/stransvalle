var InformeRecorrido = (function () {
    var sesion = false;
    var table;
    var placa;

    var _addHandlers = function () {
        $("#cboGrupoBus").change(function () {
            CargarInformeRecorrido();
        });

        $("#dtpFecha").on("dp.change", function (e) {
            //$('#datetimepicker7').data("DateTimePicker").minDate(e.date);
            CargarInformeRecorrido();
        });

        $("#btnCerrarSesion").click(function () {
            varLocal.removeUser();
            varLocal.removeRol();
            window.location.href = "index.html";
        });

    };

    var _VerificarPermisos = function () {
        var user = varLocal.getUser();
        var rol = varLocal.getRol();
        if ((user != null) && (rol != null) && (rol == 1)) {
            $("#dvdUser").html('<i class="fa fa-user"></i> ' + user + ' <b class="caret">');
            listaPermisos = Permisos.Get(rol);
            $.each(listaPermisos, function (index, item) {
                $("#" + item).fadeIn();
            });
            return true;
        }
        else return false;
    };

    var _createElements = function () {
        CargarDatosBasicos();
        createTable();
    };

    var CargarDatosBasicos = function () {
        $(function () {
            $('#dtpFecha').datetimepicker({ format: 'DD/MM/YYYY', locale: 'es' });
            $('#dtpFecha').data("DateTimePicker").minDate(new Date(2014, 1, 1));
            $('#dtpFecha').data("DateTimePicker").maxDate(new Date());
        });

        DatosBasicosDAO.Get(function (result) {
            DatosBasicos = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
            $("#cboGrupoBus").byaCombo({
                DataSource: DatosBasicos.lGruposBuses, placeHolder: 'Seleccione...', Display: "Nombre", Value: "id"
            });
        });
    };

    var _CampoNull = function (value) {
        if (value == null) {
            return "";
        } else {
            return value;
        }
    };

    var CargarInformeRecorrido = function () {

        table.destroy();

        var fecha = $("#dtpFecha").data('DateTimePicker').date().toString();

        if ($("#cboGrupoBus").val().length > 0 && fecha.length > 0) {

            InformeRecorridoDAO.GetInformeRecorrido($("#dtpFecha").data('DateTimePicker').date(), $("#cboGrupoBus").val(), function (result) {
                var lInfRec = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;

                if (lInfRec != null) {
                   
                    $("#tbodyInformeRec").empty();
                    $.each(lInfRec, function (index, item) {
                        $("#tbodyInformeRec").append("<tr id='" + item.PlacaBus + "'> <td class='deta'>" + (parseInt(index) + 1) + "</td> <td class='deta'>" + item.PlacaBus + "</td> <td class='deta'>" + item.Vial + "</td> <td class='deta'>" + _CampoNull(item.Conductor) + "</td> <td class='deta'>" + item.Recorridos + "</td> </tr>");
                    });                    

                    $(".deta").click(function () {

                        placa = $(this).parent().attr("id");
                        
                        if (typeof (placa) != "undefined") {

                            InformeRecorridoDAO.GetDetallesRecorridos($("#dtpFecha").data('DateTimePicker').date(), $("#cboGrupoBus").val(), placa, function (result) {
                                var lDeRec = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;

                                $("#mPlaca").empty().append(placa);
                                $("#tbodyDetalles").empty();
                                $("#tbodyreloj").empty();
                                $.each(lDeRec, function (index, item) {
                                    $("#tbodyDetalles").append("<tr> <td class='recorrido'>" + (parseInt(index) + 1) +
                                        "</td> <td class='recorrido'>" + item.HoraIni + "</td> <td class='recorrido'>" + item.HoraFin +
                                        "</td> <td class='recorrido'>" + _CampoNull(item.Tiempo) + "</td> <td class='recorrido'>" + item.Coleo +
                                        "</td> </tr>");
                                });

                                $(".recorrido").click(function () {
                                    var row = parseInt( $(this).parent().parent().children().index($(this).parent()))+1;
                                    //alert($('#tDetalles tr:nth-child(' + row + ') td:nth-child(2)').text());
                                    var hIni = $('#tDetalles tr:nth-child(' + row + ') td:nth-child(2)').text();
                                    var hFin = $('#tDetalles tr:nth-child(' + row + ') td:nth-child(3)').text();

                                    $("#tbodyreloj").empty();
                                    InformeRecorridoDAO.GetPuntosControl($("#dtpFecha").data('DateTimePicker').date(), placa,
                                        hIni,hFin, function (result) {
                                        var lPctr = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
                                        
                                        $.each(lPctr, function (index, item) {
                                            $("#tbodyreloj").append("<tr> <td>" + item.Nombre + "</td> <td>" + item.Time + "</td> </tr>");
                                        });

                                    });
                                });

                                $('#tDetalles').on('click', 'tbody tr', function (event) {
                                    $(this).addClass('highlight').siblings().removeClass('highlight');
                                });

                            });

                            $('#modalDetallesRecorrido').modal('show');
                        }

                        

                    });

                    createTable();
                }
                else {
                    alert("No se ha creado una planilla de despacho para esta fecha!!!");
                    $("#tbodyPlanillaControl").empty();
                    createTable();
                }
            });
        } else { createTable(); }

    };

    var createTable = function () {
        $(function () { // Crear DataTable
            table = $('#example').DataTable({
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
                "searching": false,
                scrollY: "400px",
                scrollX: true,
                scrollCollapse: true,
                paging: false
            });
            //new $.fn.dataTable.FixedColumns(table);
        });
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
    InformeRecorrido.init();
});