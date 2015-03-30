var PlanillaRecaudo = (function () {   
    var sesion = false;
    var table;//=$('#example').DataTable({});
    var hS, rec, idDp,idPr;

    var _addHandlers = function () {
        $("#cboGrupoBus").change(function () {
            CargarPlanillaRecaudo();
        });                   

        $("#dtpFecha").on("dp.change", function (e) {
            //$('#datetimepicker7').data("DateTimePicker").minDate(e.date);
            CargarPlanillaRecaudo();
        });

        $("#btnGuardarPr").click(function () {
            if ($("#mNumPas").val().length > 0 && $("#mPneto").val().length > 0 &&
                $("#mACPM").val().length > 0   && $("#mSueldo").val().length>0  &&
                $("#mAseo").val().length > 0   && $("#mTgastos").val().length>0)
            {                
               var pR ={
                    id:                 idPr,
                    Fecha:              $("#dtpFecha").data('DateTimePicker').date(),
                    Recorridos:         rec,
                    InicioTorniquete:   $("#mInicio").val(),
                    FinTorniquete:      $("#mFinal").val(),
                    NumPasajeros:       $("#mNumPas").val(),
                    ProductoBruto:      $("#mPbruto").autoNumeric('get'),
                    ProductoNeto:       $("#mPneto").autoNumeric('get'),
                    idDetallesPlanilla: idDp,
                    gastos:{
                        idplanillarecaudo: idPr,
                        ACPM:              $("#mACPM").autoNumeric('get'),
                        Sueldo:            $("#mSueldo").autoNumeric('get'),
                        Aseo:              $("#mAseo").autoNumeric('get'),
                        Otros:             _campNumVacio($("#mOtros").autoNumeric('get')),
                        Turno:             _campNumVacio($("#mTurno").autoNumeric('get')),
                        TotalGasto:        $("#mTgastos").autoNumeric('get')
                    },
                    Vial :"",
                    Placa: "",
                    Ruta: "",
                    Time: hS
                };

               PlanillaRecaudoDTO.Update(pR, function (result) {
                   $('#ModalPlanillaRecaudo').modal('toggle');
                   CargarPlanillaRecaudo();
                });

            }
            else
            {
                alert("Los campos Numero de Pasajeros, A.C.P.M, Sueldo, Aseo y Producto Neto son requeridos");
            }
        });

        $(".snumero").keypress(function () {
            byaPage.txtSoloNumeros();
        });

        $(".snumero2").keypress(function () {
            byaPage.txtSoloNumeros();
        });

        $(".cTorniquete").blur(function () {
            $("#mNumPas").val('');
            if ($("#mInicio").val().length > 0 && $("#mFinal").val().length > 0) {
                if (parseInt($("#mFinal").val()) >= parseInt($("#mInicio").val())) {
                    $("#mNumPas").val(parseInt($("#mFinal").val()) - parseInt($("#mInicio").val()));
                } else {
                    alert("El Torniquete final debe ser mayor al inicio!!!");
                }
                
            }
        });

        $(".gDias").blur(function () {
            var acpm, sueldo, aseo, otros, turno;
            acpm = _campNumVacio($("#mACPM").autoNumeric('get'));
            sueldo = _campNumVacio($("#mSueldo").autoNumeric('get'));
            aseo = _campNumVacio($("#mAseo").autoNumeric('get'));
            otros = _campNumVacio($("#mOtros").autoNumeric('get'));
            turno = _campNumVacio($("#mTurno").autoNumeric('get'));

            $('#mTgastos').autoNumeric('set', acpm + sueldo + aseo + otros + turno)
           // $("#mTgastos").val(acpm + sueldo + aseo + otros + turno);
        });

        $(".total").blur(function () {
            $("#mPneto").val('');
            if ($("#mTgastos").val().length > 0 && $("#mPbruto").val().length>0) {
                if (_campNumVacio($("#mTgastos").autoNumeric('get')) > _campNumVacio($("#mPbruto").autoNumeric('get'))) {
                    alert("Los gastos no deben ser mayor al producto");
                } else {
                    $('#mPneto').autoNumeric('set', parseInt($("#mPbruto").autoNumeric('get')) - parseInt($("#mTgastos").autoNumeric('get')))
                    //$("#mPneto").val();
                }
                
            } 
        });

        $("#btnCerrarSesion").click(function () {
            varLocal.removeUser();
            varLocal.removeRol();
            window.location.href = "index.html";
        });

        $(function ($) {
            $('.snumero').autoNumeric('init');
        });
    };

    var _VerificarPermisos = function () {
        var user = varLocal.getUser();
        var rol = varLocal.getRol();
        if ((user != null) && (rol != null) && (rol == 2)) {
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

    var _CampoNull = function (value) {
        if (value == null) {
            return "";
        } else {
            return value;
        }
    };

    var _campNumVacio = function (value) {
        if (value.length < 1) {
            return 0;
        }
        else {
           return parseInt(value);
        }
    };

    var _FormatMoney = function (value) {
        return value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    };

    var _sumTotal = function (num) {
        var total = 0;
        $('#example tbody tr td:nth-child('+num+')').each(function () {
            total = total + _campNumVacio($(this).text().replace(',', ''));
            //alert($(this).text());
        });
        return total;
    };

    var CargarDatosBasicos = function () {        
        $(function () {
            $('#dtpFecha').datetimepicker({ format: 'DD/MM/YYYY', locale: 'es' });
            $('#dtpFecha').data("DateTimePicker").minDate(new Date(2014, 10, 1));
            $('#dtpFecha').data("DateTimePicker").maxDate(new Date());
        });

        DatosBasicosDAO.Get(function (result) {
            DatosBasicos = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
            $("#cboGrupoBus").byaCombo({
                DataSource: DatosBasicos.lGruposBuses, placeHolder: 'Seleccione...', Display: "Nombre", Value: "id"
            });
        });       
    };

    var CargarPlanillaRecaudo = function () {
        
        table.destroy();
        
        var fecha = $("#dtpFecha").data('DateTimePicker').date().toString();

        if ($("#cboGrupoBus").val().length > 0 && fecha.length > 0) {
            PlanillaRecaudoDTO.Get($("#dtpFecha").data('DateTimePicker').date(), $("#cboGrupoBus").val(), function (result) {
                var lPlaRec = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;

                //table.destroy();
                //$("#tbodyPlanillaControl").empty();

                if (lPlaRec != null) {
                    //table.destroy();
                    $("#tbodyPlanillaControl").empty();
                    $.each(lPlaRec, function (index, item) {
                        //alert(item.Time);
                        $("#tbodyPlanillaControl").append("<tr id='" + item.id + "' style='white-space: nowrap;'>" +
                            "<td id='idDp" + item.idDetallesPlanilla + "'>" + _CampoNull(item.Vial) + "</td>" +
                            "<td>" + _CampoNull(item.Placa) + "</td>" +
                            "<td>" + _CampoNull(item.Time) + "</td>" +
                            "<td>" + _CampoNull(item.Ruta) + "</td>" +
                            "<td>" + _CampoNull(item.Recorridos) + "</td>" +
                            "<td>" + _CampoNull(item.InicioTorniquete) + "</td>" +
                            "<td>" + _CampoNull(item.FinTorniquete) + "</td>" +
                            "<td>" + _CampoNull(item.NumPasajeros) + "</td>" +
                            "<td class='snumero2'>" + _FormatMoney(_campNumVacio(_CampoNull(item.ProductoBruto))) + "</td>" +
                            "<td class='snumero2'>" + _FormatMoney(_campNumVacio(_CampoNull(item.gastos.ACPM))) + "</td>" +
                            "<td class='snumero2'>" + _FormatMoney(_campNumVacio(_CampoNull(item.gastos.Sueldo))) + "</td>" +
                            "<td class='snumero2'>" + _FormatMoney(_campNumVacio(_CampoNull(item.gastos.Aseo))) + "</td>" +
                            "<td class='snumero2'>" + _FormatMoney(_campNumVacio(_CampoNull(item.gastos.Otros))) + "</td>" +
                            "<td class='snumero2'>" + _FormatMoney(_campNumVacio(_CampoNull(item.gastos.Turno))) + "</td>" +
                            "<td class='snumero2'>" + _FormatMoney(_campNumVacio(_CampoNull(item.gastos.TotalGasto))) + "</td>" +
                            "<td class='snumero2'>" + _FormatMoney(_campNumVacio(_CampoNull(item.ProductoNeto))) + "</td>" +
                            "</tr>");
                    });

                    //cargar totales
                    $("#Recorridos").empty().append(_sumTotal(5));
                    $("#numPas").empty().append(_sumTotal(8))
                    $("#ProdBruto").empty().append("$ " + _FormatMoney(_sumTotal(9)));
                    $("#ACPM").empty().append("$ " + _FormatMoney(_sumTotal(10)));
                    $("#Sueldo").empty().append("$ " + _FormatMoney(_sumTotal(11)));
                    $("#Aseo").empty().append("$ " + _FormatMoney(_sumTotal(12)));
                    $("#Otros").empty().append("$ " + _FormatMoney(_sumTotal(13)));
                    $("#Turno").empty().append("$ " + _FormatMoney(_sumTotal(14)));
                    $("#TotalG").empty().append("$ " + _FormatMoney(_sumTotal(15)));
                    $("#ProdNeto").empty().append("$ " + _FormatMoney(_sumTotal(15)));

                    createTable();

                    $("td").click(function () {
                        //alert($(this).parent().attr("id").toString());
                        //var str = $("#fecha").text().split("/", 3);
                        //alert(str);
                        ////alert($("#dtpFecha").data('DateTimePicker').viewDate());
                        //if ((new Date(str[2],parseInt(str[1])-1, str[0])).getTime() == (new Date).getTime()) {
                        //    alert("fechas iguales");
                        //}
                        var id = $(this).parent().attr("id");
                        if (typeof (id) != "undefined") {
                            //$("#modalId").empty().append(id);                           

                            var $row = jQuery(this).closest('tr');
                            var $columns = $row.find('td');

                            var values = [];

                            jQuery.each($columns, function (i, item) {
                                values.push({ val: item.innerHTML });
                            });

                            $("#modalTVial").empty().append("Vial: " + values[0].val);
                            $("#modalTSalida").empty().append("Salida: " + values[2].val);
                            $("#modalTRuta").empty().append(values[3].val);
                            $("#modalTRec").empty().append("Recorridos: " + values[4].val);

                            $("#mInicio").val('').val(values[5].val);
                            $("#mFinal").val('').val(values[6].val);
                            $("#mNumPas").val('').val(values[7].val);

                            $("#mACPM").val('').val(values[9].val);
                            $("#mSueldo").val('').val(values[10].val);
                            $("#mAseo").val('').val(values[11].val);
                            $("#mOtros").val('').val(values[12].val);
                            $("#mTurno").val('').val(values[13].val);
                            $("#mTgastos").val('').val(values[14].val);

                            $("#mPbruto").val('').val(values[8].val);
                            $("#mPneto").val('').val(values[15].val);

                            //////////////////// variables locales de planilla de recaudo //////////////////////
                            idPr = id;
                            idDp = $('td:first', $(this).parents('tr')).attr("id").toString().replace('idDp', '');
                            hS = values[2].val;
                            rec = values[4].val;
                            //////////////////// fin variables locales de planilla de recaudo //////////////////////

                            $(".cTorniquete").blur();
                            $(".gDias").blur();
                            $(".total").blur();

                            $('#ModalPlanillaRecaudo').modal('show');
                        }


                    });
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
                scrollY: "300px",
                scrollX: true,
                scrollCollapse: true,
                paging: false
            });
            new $.fn.dataTable.FixedColumns(table);
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
    PlanillaRecaudo.init();
});