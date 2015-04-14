using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
   public class entradassalidasDTO
    {
        public string Placa { get; set; }
        public System.DateTime Fecha { get; set; }
        public string Estado { get; set; }

        public string HoraEvento { get; set; }
        public string FechaEvento {get;set;}

        public string HoraIni { get; set; }
        public string HoraFin { get; set; }
        public System.DateTime FechaFin { get; set; }
        public int Tiempo { get; set; }
        public int Coleo { get; set; }
    }
}
