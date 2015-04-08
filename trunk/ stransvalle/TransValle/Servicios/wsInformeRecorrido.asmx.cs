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
    /// Descripción breve de wsInformeRecorrido
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsInformeRecorrido : System.Web.Services.WebService
    {

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<detallesplanillaDTO> getInformeRecorridos(DateTime fecha, int grupo)
        {
            return (new mRecorridos()).getInformeRecorridos(fecha,grupo);
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<entradassalidasDTO> getDetallesRecorridos(DateTime fecha, int grupo, string placa) {
            return (new mRecorridos()).getDetallesRecorridos(fecha,grupo,placa);
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<puntoscontrolDTO> getPuntosControl(DateTime fecha, string placa, TimeSpan horaIni, TimeSpan horaFin) 
        {
            return (new mRecorridos()).getPuntosControl(fecha,placa,horaIni,horaFin);
        }
    }
}
