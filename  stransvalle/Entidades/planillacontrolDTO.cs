using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
   public class planillacontrolDTO
    {
        public int id { get; set; }
        public Nullable<System.DateTime> Fecha { get; set; }
        public string Observaciones { get; set; }
        public Nullable<int> Grupo { get; set; }
    }
}
