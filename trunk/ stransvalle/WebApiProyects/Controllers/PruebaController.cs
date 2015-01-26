using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using BLL;
using Entidades;
using System.Web.Http.Cors;

namespace WebApiProyects.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/Prueba")]
    public class PruebaController : ApiController
    {
        [Route("")]
        public usuariosplataformaDto Get()
        {
            mUsers o = new mUsers();
            return o.Login("carlos", "justime");
        }
    }
}
