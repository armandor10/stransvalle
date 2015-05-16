using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using BLL;
using Entidades;
using Entidades.Geometria;
using System.Web.Script.Services;

namespace TransValle.Servicios
{
    /// <summary>
    /// Descripción breve de wsRutas
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // Para permitir que se llame a este servicio web desde un script, usando ASP.NET AJAX, quite la marca de comentario de la línea siguiente. 
    [System.Web.Script.Services.ScriptService]
    public class wsRutas : System.Web.Services.WebService
    {
        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public objRes Insert(rutasDto Reg)
        {
            mRutas o = new mRutas();
            return o.Insert(Reg);
        }
        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public List<rutasDto> Gets()
        {
            mRutas o = new mRutas();
            return o.Gets();
        }
        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public rutasDto Get(string Vial) {
            return (new mRutas()).Get(Vial);
        }
        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public objRes Delete(string NomRuta)
        {
            mRutas o = new mRutas();
            return o.Delete(NomRuta);
        }
        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public objRes AsigPuntosRuta(coordenadasrutasDto Reg)
        {
            mRutas o = new mRutas();
            return o.AsigPuntosRuta(Reg);
        }


        // Esto esta aqui de prueba
        [WebMethod]
        [ScriptMethod(UseHttpGet = true, ResponseFormat = ResponseFormat.Json)]
        public bool Prueba(double x, double y)
        {
            mSalioRuta o = new mSalioRuta();

            pl_punto p = new pl_punto();
            p.x = x;
            p.y = y;

            return o.VerificarPuntoEnRuta(p);
        }
    }
}
