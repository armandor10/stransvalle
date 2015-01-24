using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using BLL;

namespace WebApiProyects.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    //[Authorize]
    [RoutePrefix("api/pe/DatosBasicos")]
    public class pruebaController : ApiController
    {
        [Route("")]
        public bool Get()
        {
            prueba o = new prueba();
            return o.Get();
        }
    }
}
