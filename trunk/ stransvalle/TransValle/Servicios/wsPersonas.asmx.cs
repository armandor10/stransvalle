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
    /// Descripción breve de wsPersonas
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsPersonas : System.Web.Services.WebService
    {
        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<personasDto> GetsConductores()
        {
            mPersonas objPersonas = new mPersonas();
            return objPersonas.GetsConductores();
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public objRes Insert(personasDto Reg)
        {
            mPersonas objPersonas = new mPersonas();
            return objPersonas.Insert(Reg);
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public objRes Update(personasDto Reg)
        {
            mPersonas objPersonas = new mPersonas();
            return objPersonas.Update(Reg);
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public objRes Delete(string Cedula)
        {
            mPersonas objPersonas = new mPersonas();
            return objPersonas.Delete(Cedula);
        }
    }
}
