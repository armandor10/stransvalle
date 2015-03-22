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
    /// Descripción breve de wsHorario
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
     [System.Web.Script.Services.ScriptService]
    public class wsHorario : System.Web.Services.WebService
    {

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<horarioDTO> getHorario(string nomRuta)
        {
            mHorario lg = new mHorario();
            List<horarioDTO> lHor = lg.get(nomRuta);
            return lHor;
        }

        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<List<horarioDTO>> getHorarioPlanilla(string nomRuta, DateTime fecha,int grupo)
        {
            mHorario lg = new mHorario();
           List<List<horarioDTO>> lHor = lg.getHorarioPlanilla(nomRuta,fecha,grupo);
            return lHor;
        }
    }
}
