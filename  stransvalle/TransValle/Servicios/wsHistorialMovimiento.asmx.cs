using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.Script.Services;
using BLL;
using Entidades;

namespace TransValle.Servicios
{
    /// <summary>
    /// Descripción breve de wsHistorialMovimiento
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsHistorialMovimiento : System.Web.Services.WebService
    {

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<entradassalidasDTO> getDetallesRecorridos(DateTime fecha, string Vial) 
        {
            return (new mHistorialMovimiento()).getDetallesRecorridos(fecha, Vial);
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<historialmovimientoDTO> get(entradassalidasDTO eSDto) 
        {
            return (new mHistorialMovimiento()).get(eSDto);
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<historialmovimientoDTO> getCoordTodayBuses(string Ruta) {
            return (new mHistorialMovimiento()).getCoordTodayBuses(Ruta);                                
        }
    }
}
