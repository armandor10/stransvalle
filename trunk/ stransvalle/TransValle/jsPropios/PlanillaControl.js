
var PlanillaControl = (function () {
    var Meses = [{ id: '01', mes: 'Enero' },
                 { id: '02', mes: 'Febrero' },
                 { id: '03', mes: 'Marzo' },
                 { id: '04', mes: 'Abril' },
                 { id: '05', mes: 'Mayo' },
                 { id: '06', mes: 'Junio' },
                 { id: '07', mes: 'Julio' },
                 { id: '08', mes: 'Agosto' },
                 { id: '09', mes: 'Septiembre'},
                 { id: '10', mes: 'Octubre' },
                 { id: '11', mes: 'Noviembre' },
                 { id: '12', mes: 'Diciembre' }];
    var sesion = false;
    var ldetallesPlanilla;
    var Buses = [], idBuses = [];

    var weekday = new Array("Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado");   

    var _addHandlers = function () {
        $("#cboGrupoBus").change(function () {           
                cargarRotacionBuses();
        });
        $("#cboMeses").change(function () {
                cargarRotacionBuses();            
        });
        $("#btnGuardarPc").click(function () {            
            RegistrarPControl();
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

    var _createElements = function () {
        CargarDatosBasicos();
    };

    var _ValidarViales = function () {
        var ban = true;
        var cadenaError = "Error:";
        var vBuses = [];

        $.each(Buses, function (ind, ite) {
            //vBuses.push(ite.Vial);
            if ($("#Dp" + ite.id).val().length < 1) {
                ban = false;
                cadenaError = cadenaError + "\n Complete todos los campos!!!";
                return false;
            }
            vBuses.push($("#Dp" + ite.id).val());
        });

        if (ban) {
            for (var i = 0; i < vBuses.length-1; i++) {
                for (var j = i + 1; j < vBuses.length; j++) {
                    if (vBuses[i] == vBuses[j]) {
                        ban = false;
                        cadenaError = cadenaError + "\n Uno o varios viales se repiten!!!";
                        break;
                    }
                }
                if (!ban) { break; }
            }
        }
        
        if (ban == false) alert(cadenaError);
        return ban;
    };

    var CargarDatosBasicos = function () {
        //$('#contenido').toggle();
        $('#wait').toggle();
        //$("#contenido").css({ visibility: "visible" });

        DatosBasicosDAO.Get(function (result) {
            DatosBasicos = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
            $("#cboGrupoBus").byaCombo({
                DataSource: DatosBasicos.lGruposBuses, placeHolder: 'Seleccione...', Display: "Nombre", Value: "id"
            });
        });

        $("#cboMeses").byaCombo({
                DataSource: Meses, placeHolder: 'Seleccione...', Display: "mes", Value: "id"
        });       
       
    };

    var cargarRotacionBuses = function () {
        $("#dias").empty();
        $("#Ruta").empty();
        $("#Ruta").append("<th data-field='Ruta' data-sortable='true'> Ruta</th>");
        $("#dias").append("<th data-field='Dia' > Dia</th>  ");
        $("#tablePlanillaControl").html("");

        $("#contenido").css({ visibility: "hidden" });        

        if ($("#cboGrupoBus").val().length > 0 && $("#cboMeses").val().length > 0) {
            $('#contenido').toggle();
            $('#wait').toggle();
            $("#contenido").css({ visibility: "visible" });
            $("#wait").css({ visibility: "visible" });

            var ruta;
            var d;
            PlanillaControlDAO.GetsRotacionBuses($("#cboMeses").val(), $("#cboGrupoBus").val(), function (result) {
                var ban = true;
                ldetallesPlanilla = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;

                $.each(ldetallesPlanilla, function (index, item) {
                    $.each(item, function (ind, ite) {
                        if (parseInt(ind) == 0) {
                            ruta = ite.Ruta;
                            $("#Ruta").append("<th>" + ite.Ruta.toUpperCase() + "</th>");                            
                        }
                    });
                });

                $.each(ldetallesPlanilla, function (index, item) {

                    d = new Date((new Date()).getFullYear(), $("#cboMeses").val()-1, (parseInt(index) + 1)); // fecha en el año actual
                    $("#dias").append("<th>" + weekday[d.getDay()] +", "+ (parseInt(index) + 1) + "</th>"); /// Agredo los Dias del Mes

                    if (ban) {
                        $.each(item, function (ind, ite) {
                            $("#tablePlanillaControl").append("<tr id='" + ind + "' class='tr-class-1'> <th id='H" + ind+ "'></th> </tr>");
                            $("#" + ind).append("<td id='" + ite.id + "'>" + ite.Vial + "</td>");
                        });
                        ban = false;
                    }
                    else {
                        $.each(item, function (ind, ite) {
                            $("#" + ind).append("<td id='"+ite.id+"'>" + ite.Vial + "</td>");
                        });
                    }

                    //$("#tableBuses").append("<tr id='" + index + "' onclick='gBuses.SeleccionarBusTabla(id)'><th>" + item.Placa + "</th><th>" + item.Vial + "</th><th>" + item.Marca + "</th><th>" + Fecha + "</th><th>" + item.NombreClaseServicio + "</th><th>" + item.NombreClaseBus + "</th><th>" + item.NombreGrupo + "</th></tr>");
                });

                horarioDTO.GetsHorario(ruta, function (result) {
                    var lHorario = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
                    $.each(lHorario, function (index, item) {
                        //alert(index+" "item)
                        $("#H" + index).append("<th>" + item.time + "</th>");
                    });
                });              
                 
                $('td').click(function () {                                  
                    var col = $(this).parent().children().index($(this));
                    //var row = $(this).parent().parent().children().index($(this).parent());                         
                    //alert('Row: ' + row + ', Column: ' + col);

                    var d = new Date((new Date()).getFullYear(), $("#cboMeses").val() - 1, col+1);
                    if (d >= (new Date())) {
                        Buses = [];
                        idBuses = [];
                        //Iterate all td's in second column
                        $('#freeze-table tbody tr td:nth-child(' + (parseInt(col) + 1) + ')').each(function () {
                            //add item to array
                            Buses.push({
                                id: $(this).attr("id"), Vial: $(this).text(),
                                idPlanillaControl: "", PlacaBus: "", Ruta: ""
                            });
                        });

                        $("#mhPC").empty().append("<strong> Dia: " + col + "</strong>");
                        $("#TbodyModalbodyPC").empty();

                        $.each(Buses, function (ind, ite) {
                            $("#TbodyModalbodyPC").append("<tr >" +
                                                          "<th style='text-align: center;'>" + (parseInt(ind) + 1) + " </th>" +
                                                          "<td> <select class='form-control' id='" + "Dp" + ite.id + "' placeholder='.col-xs-1'> </select> </td>" +
                                                          "</tr>");

                            $("#" + "Dp" + ite.id).byaCombo({
                                DataSource: Buses, placeHolder: 'Seleccione...', Display: "Vial", Value: "Vial"
                            });
                        });

                        $('#ModalPlanillaControl').modal('show');
                    } else {
                        alert("No puede editar fuera de fecha!!!");
                    }
                    

                });

                $('#wait').toggle();
                $('#contenido').toggle();
                //$("#contenido").css({ visibility: "visible" });
                
            });
                       
        }

        
    };

    var RegistrarPControl = function () {
        if (_ValidarViales()) {
            var vBuses = [];
            $.each(Buses, function (ind, ite) { 
                vBuses.push({
                    id: ite.id, idPlanillaControl: "0",PlacaBus: "", Ruta: "", Vial: $("#Dp" + ite.id).val()                   
                });
            });
         
            PlanillaControlDAO.Update(vBuses, function (result) {
                var respuesta = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;               
                alert(respuesta.Mensaje);
                $('#ModalPlanillaControl').modal('toggle');
                cargarRotacionBuses();                
            });

        }
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
    PlanillaControl.init();  
});
