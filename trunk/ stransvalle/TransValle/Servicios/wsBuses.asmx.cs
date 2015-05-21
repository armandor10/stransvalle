using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Entidades;
using BLL;
using System.Web.Script.Services;

namespace TransValle.Servicios
{
    /// <summary>
    /// Descripción breve de wsBuses
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsBuses : System.Web.Services.WebService
    {
        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<busesDto> Gets()
        {
            mBuses objBuses = new mBuses();
            return objBuses.Gets();
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<string> GetsVial() {
            mBuses objBuses = new mBuses();
            return objBuses.GetsVial();
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public objRes Insert(busesDto Reg)
        {
            Reg.FechaMatricula = new DateTime(Reg.AñoMatricula, Reg.MesMatricula, Reg.DiaMatricula);

            mBuses objBuses = new mBuses();
            return objBuses.Insert(Reg);
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public objRes Update(busesDto Reg)
        {
            Reg.FechaMatricula = new DateTime(Reg.AñoMatricula, Reg.MesMatricula, Reg.DiaMatricula);

            mBuses objBuses = new mBuses();
            return objBuses.Update(Reg);
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public objRes Delete(string Placa)
        {
            mBuses objBuses = new mBuses();
            return objBuses.Delete(Placa);
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public objRes InsertGrupo(string NombreGrupo) 
        {
            mBuses o = new mBuses();
            return o.InsertGrupo(NombreGrupo);
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public char SingIn(string Vial,string Password) 
        {
            return (new mBuses()).SingIn(Vial, Password);
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public objRes InsertOrUpdateDocumentos(List<documentosbusDTO> lDocBusDto) 
        {
            return (new mBuses()).InsertOrUpdateDocumentos(lDocBusDto);
        }
    }
}
