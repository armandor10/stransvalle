using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
   public class gastosDTO
    {
        public Nullable<int> idplanillarecaudo { get; set; }
        public Nullable<decimal> ACPM { get; set; }
        public Nullable<decimal> Sueldo { get; set; }
        public Nullable<decimal> Aseo { get; set; }
        public Nullable<decimal> Otros { get; set; }
        public Nullable<decimal> Turno { get; set; }
        public Nullable<decimal> TotalGasto { get; set; }
    }
}
