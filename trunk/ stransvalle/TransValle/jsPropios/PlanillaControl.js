
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
    var dias = [];
    var lHorario, llHorarioDTO;

    var mes = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    var weekday = new Array("Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado");   

    var _addHandlers = function () {
        $("#cboGrupoBus").change(function () {           
                cargarRotacionBuses();
        });
        $("#cboMeses").change(function () {
                cargarRotacionBuses();            
        });
        $("#cbodiaPlanCtrDesp").change(function () {
            $("#planCrt").css({ visibility: "hidden" });
            $("#FechaPlanCtrDesp").empty();
            $("#GrupoPlanCtrDesp").empty();
            $("#RutaPlanCtrDesp").empty();
            $("#tbodyPlanCtrDesp").empty();
            if ($("#cbodiaPlanCtrDesp").val().length > 0) {
                $('#planCrt').toggle();
                cargarPlanillaControl($("#cbodiaPlanCtrDesp").val());
            }
        });
        $("#btnGuardarPc").click(function () {            
            RegistrarPControl();
        });
        $("#btnPlaCtr").click(function () {
            
            if ($("#cboGrupoBus").val().length > 0 && $("#cboMeses").val().length > 0) {
                $("#planCrt").css({ visibility: "hidden" });
                $("#FechaPlanCtrDesp").empty();
                $("#GrupoPlanCtrDesp").empty();
                $("#RutaPlanCtrDesp").empty();
                $("#tbodyPlanCtrDesp").empty();

                $("#cbodiaPlanCtrDesp").byaCombo({
                    DataSource: dias, placeHolder: 'Seleccione...', Display: "id", Value: "id"
                });
                $('#ModalPlanCtrDespacho').modal('show');
            }
           
        });
        $("#CreatePDF").click(function () {
            ImprimirRotacionBuses();
        });
        $("#CreatePDF2").click(function () {
            ImprimirPlanillaCtr();
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
        $('#wait2').toggle();
        //$('#planCrt').toggle();
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

                if (ldetallesPlanilla != null) {

                    dias = [];
                    $("#Hora").empty().append("<th> Hora</th>");
                    $.each(ldetallesPlanilla, function (index, item) {
                        $.each(item, function (ind, ite) {
                            if (parseInt(ind) == 0) {
                                ruta = ite.Ruta;
                                $("#Ruta").append("<th>" + ite.Ruta.toUpperCase() + "</th>");
                            }
                        });

                        $("#Hora").append("<th></th>");
                        dias.push({
                            id: (parseInt(index) + 1)
                        });
                    });

                    $.each(ldetallesPlanilla, function (index, item) {

                        d = new Date((new Date()).getFullYear(), $("#cboMeses").val() - 1, (parseInt(index) + 1)); // fecha en el año actual
                        $("#dias").append("<th>" + weekday[d.getDay()] + ", " + (parseInt(index) + 1) + "</th>"); /// Agredo los Dias del Mes

                        if (ban) {
                            $.each(item, function (ind, ite) {
                                $("#tablePlanillaControl").append("<tr id='" + ind + "' class='tr-class-1'> <th id='H" + ind + "'></th> </tr>");
                                $("#" + ind).append("<td id='" + ite.id + "'>" + ite.Vial + "</td>");
                            });
                            ban = false;
                        }
                        else {
                            $.each(item, function (ind, ite) {
                                $("#" + ind).append("<td id='" + ite.id + "'>" + ite.Vial + "</td>");
                            });
                        }

                        //$("#tableBuses").append("<tr id='" + index + "' onclick='gBuses.SeleccionarBusTabla(id)'><th>" + item.Placa + "</th><th>" + item.Vial + "</th><th>" + item.Marca + "</th><th>" + Fecha + "</th><th>" + item.NombreClaseServicio + "</th><th>" + item.NombreClaseBus + "</th><th>" + item.NombreGrupo + "</th></tr>");
                    });

                    horarioDTO.GetsHorario(ruta, function (result) {
                        lHorario = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
                        $.each(lHorario, function (index, item) {
                            //alert(index+" "item)
                            $("#H" + index).append("<th>" + item.time + "</th>");
                        });
                    });

                    $('td').click(function () {
                        var col = $(this).parent().children().index($(this));
                        //var row = $(this).parent().parent().children().index($(this).parent());                         
                        //alert('Row: ' + row + ', Column: ' + col);

                        var d = new Date((new Date()).getFullYear(), $("#cboMeses").val() - 1, col + 1);
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
                }
                else {
                    $('#wait').toggle();
                    $('#contenido').toggle();
                    $("#contenido").css({ visibility: "hidden" });
                    alert("No hay Buses asignados a este grupo");
                }               
                
            });
                       
        }

        
    };

    var ImprimirRotacionBuses = function () {
        var rutas = "", days = "", hora = "";
        var ban = true;
        var tbody = "";
        
        if (ldetallesPlanilla != null) {            
            $.each(ldetallesPlanilla, function (index, item) {
                $.each(item, function (ind, ite) {
                    if (parseInt(ind) == 0) {
                        ruta = ite.Ruta;
                        rutas = rutas + "<th>" + ite.Ruta.toUpperCase() + "</th>";
                    }
                });

                hora= hora+ "<th></th>";               
            });

            $.each(ldetallesPlanilla, function (index, item) {

                d = new Date((new Date()).getFullYear(), $("#cboMeses").val() - 1, (parseInt(index) + 1)); // fecha en el año actual
                days = days + "<th>" + weekday[d.getDay()] + ", " + (parseInt(index) + 1) + "</th>"; /// Agredo los Dias del Mes

                if (ban) {
                    $.each(item, function (ind, ite) {
                        tbody = tbody + "<tr id='" + ind + "' class='tr-class-1'> <th>{" + ind + "}</th>" +
                            "<td id='" + ite.id + "'>" + ite.Vial + "</td>" + "{r" + ind + "} </tr>";
                    });
                    ban = false;
                }
                else {
                    
                    $.each(item, function (ind, ite) {
                        if (dias.length != (parseInt(index) + 1)) {
                            tbody = tbody.replace("{r" + ind + "}", "<td>" + ite.Vial + "</td>" + "{r" + ind + "}");
                        } else {
                            tbody = tbody.replace("{r" + ind + "}", "<td>" + ite.Vial + "</td>");
                        }
                        //$("#" + ind).append("<td id='" + ite.id + "'>" + ite.Vial + "</td>");
                    });
                }
            });

            $.each(lHorario, function (index, item) {
                tbody = tbody.replace("{" + index + "}", item.time );
                //$("#H" + index).append("<th>" + item.time + "</th>");
            });

            $.get("/PlantillasImpresion/PrintPlanillaRotaciones.html", function (data) {
                var Empresa;
                EmpresaDAO.Get(function (result) {
                    Empresa = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
                    //alert(JSON.stringify(Empresa));
                    data = data.replace("{NOM_EMPRESA}", '<h2><strong> ' + Empresa.RAZON_SOCIAL + ' </strong></h2>');
                    data = data.replace("{NIT_EMPRESA}", Empresa.NIT + '-' + Empresa.DIG_VER);
                    data = data.replace("{GRUPO}", $("#cboGrupoBus").val());
                    data = data.replace("{MES}", mes[parseInt($("#cboMeses").val()) - 1]);
                    

                    data = data.replace("{DIAS}", days);
                    data = data.replace("{RUTAS}", rutas);
                    data = data.replace("{SEC_TBL_IMP}", tbody);

                    // Esta es la parte que te abre la ventana de imprecion...
                    var win;
                    win = window.open();
                    win.document.write(data);
                    win.print();
                    win.close();
                });
            });
            
        } else {
            alert("No hay datos en la tabla de rotaciones");
        }
    };

    var ImprimirPlanillaCtr = function () {
        var d = $("#cbodiaPlanCtrDesp").val();

        if (d.length > 0) {
            var da = new Date((new Date()).getFullYear(), $("#cboMeses").val() - 1, (parseInt(d)));
            var r = $("#Ruta").find('th').eq(d).text();

            var fecha = "<strong>" + weekday[da.getDay()] + ", " + da.getDate() + " de " + mes[da.getMonth()] + " del " + da.getFullYear() + "</strong>";
            var grupo = "<strong>Grupo N° " + $("#cboGrupoBus").val() + "</strong>";
            var ruta = "<strong>" + $("#Ruta").find('th').eq(d).text() + " </strong>";

            var i = 1;
            var turno = "", vehiculo = "", desp1 = "", desp2 = "", tbody = "";
            $('#freeze-table tbody tr td:nth-child(' + (parseInt(d) + 1) + ')').each(function () {
                turno = turno + "<th style='text-align: center;'>" + i + "</th>";
                vehiculo = vehiculo + "<th style='text-align: center;'>" + $(this).text() + "</th>";
                desp1 = desp1 + "<th style='text-align: center;'></th>";
                desp2 = desp2 + "<th style='text-align: center;'></th>";
                i++;
            });

            if (llHorarioDTO != null) {                
                $.each(llHorarioDTO, function (index, item) {
                    tbody = tbody + "<tr style='margin:3px'><td style='margin:3px'>H. Salida</td>{rpC" + index + "}</tr>";
                    tbody = tbody + "<tr style='margin:3px'><td style='margin:3px'>H. Salida</td>{hs1" + index + "}</tr>";
                    tbody = tbody + "<tr style='margin:3px'><td style='margin:3px'><strong>" + (parseInt(index) + 1) + " REC</strong></td>{hs2" + index + "}</tr>";

                    var rpc = "", hs1 = "", hs2 = "";
                    $.each(item, function (ind, ite) {
                        rpc = rpc + "<td style='margin:3px'>" + ite.time + "</td>";
                        hs1 = hs1 + "<td style='margin:3px'></td>";
                        hs2 = hs2 + "<td style='margin:3px'></td>";
                    });

                    tbody = tbody.replace("{rpC" + index + "}", rpc);
                    tbody = tbody.replace("{hs1" + index + "}", hs1);
                    tbody = tbody.replace("{hs2" + index + "}", hs2);
                });
            }

            $.get("/PlantillasImpresion/PrintPlanillaControl.html", function (data) {
                var Empresa;
                EmpresaDAO.Get(function (result) {
                    Empresa = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
                    //alert(JSON.stringify(Empresa));
                    data = data.replace("{NOM_EMPRESA}", '<h2><strong> ' + Empresa.RAZON_SOCIAL + ' </strong></h2>');
                    data = data.replace("{NIT_EMPRESA}", Empresa.NIT + '-' + Empresa.DIG_VER);

                    data = data.replace("{GRUPO}", grupo);
                    data = data.replace("{FECHA}", fecha);
                    data = data.replace("{RUTA}", ruta);

                    data = data.replace("{TURNO}", turno);
                    data = data.replace("{VEHICULO}", vehiculo);
                    data = data.replace("{DESP1}", desp1);
                    data = data.replace("{DESP2}", desp2);

                    data = data.replace("{HORARIO}", tbody);

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

    var cargarPlanillaControl = function (d) {
        $("#planCrt").css({ visibility: "hidden" });
        //$("#wait2").css({ visibility: "hidden" });
        //$('#planCrt').toggle();

        var da = new Date((new Date()).getFullYear(), $("#cboMeses").val() - 1, (parseInt(d)));
        var r = $("#Ruta").find('th').eq(d).text();
        //alert($("#Ruta").find('th').eq(d).text());

        $("#TurnoPlanCtrDesp").empty().append("<th style='text-align: center;'> Turno</th> ");
        $("#VehPlanCtrDesp").empty().append("<th style='text-align: center;'> Veh. fijo</th>");
        $("#desp1PlanCtrDesp").empty().append("<th style='text-align: center;'>A Despachar</th>");
        $("#desp2PlanCtrDesp").empty().append("<th style='text-align: center;'>A Despachar</th>");
        
        $("#FechaPlanCtrDesp").empty().append("<strong>" + weekday[da.getDay()] + ", " + da.getDate() + " de " + mes[da.getMonth()] + " del " + da.getFullYear() + "</strong>");
        $("#GrupoPlanCtrDesp").empty().append("<strong>Grupo N° " + $("#cboGrupoBus").val() + "</strong>");
        $("#RutaPlanCtrDesp").empty().append("<strong>" + $("#Ruta").find('th').eq(d).text() + " </strong>");
        //alert("Antes")
        var i = 1;
        $('#freeze-table tbody tr td:nth-child(' +(parseInt(d)+1) + ')').each(function () {           
            $("#TurnoPlanCtrDesp").append("<th style='text-align: center;'>" + i + "</th>");
            $("#VehPlanCtrDesp").append("<th style='text-align: center;'>" + $(this).text() + "</th>");
            $("#desp1PlanCtrDesp").append("<th style='text-align: center;'></th>");
            $("#desp2PlanCtrDesp").append("<th style='text-align: center;'></th>");
            i++;
        });

        //alert("Antes");
        horarioDTO.GetHorarioPlanilla(r, da,$("#cboGrupoBus").val() , function (result) {
            //alert("Antes");
            llHorarioDTO = (typeof result.d) == 'string' ? eval('(' + result.d + ')') : result.d;
            if (llHorarioDTO != null) {

                $('#wait2').toggle();
                $("#wait2").css({ visibility: "visible" });
                $("#tbodyPlanCtrDesp").empty();

                $.each(llHorarioDTO, function (index, item) {
                    $("#tbodyPlanCtrDesp").append("<tr id='rpC" + index + "'><td>H. Salida</td></tr>");
                    $("#tbodyPlanCtrDesp").append("<tr id='hs1" + index + "'><td>H. Salida</td></tr>");
                    $("#tbodyPlanCtrDesp").append("<tr id='hs2" + index + "'><th>" + (parseInt(index) + 1) + " REC</th></tr>");
                    $.each(item, function (ind, ite) {
                        $("#rpC" + index).append("<td>" + ite.time + "</td>");
                        $("#hs1" + index).append("<td></td>");
                        $("#hs2" + index).append("<td></td>");
                    });
                });

                $('#wait2').toggle();
                $("#planCrt").css({ visibility: "visible" });
                $('#planCrt').toggle();
            } else {
                $("#planCrt").css({ visibility: "hidden" });
                $("#wait2").css({ visibility: "hidden" });
                //$('#planCrt').toggle();
            }
            
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
    PlanillaControl.init();  
});
