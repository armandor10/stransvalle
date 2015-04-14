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
    /// Descripción breve de wsEntradasSalidas
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsEntradasSalidas : System.Web.Services.WebService
    {
        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<entradassalidasDTO> GetUltimas()
        {
            mEntradasSalidas objES = new mEntradasSalidas();
            return objES.Getultimas();
        }
        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public objRes Insert(entradassalidasDTO Reg)
        {
            mEntradasSalidas objES = new mEntradasSalidas();
            return objES.Insert(Reg);
        }
    }
}
