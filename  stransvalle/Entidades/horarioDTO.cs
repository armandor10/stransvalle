using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
   public class horarioDTO
    {
        public int id { get; set; }
        public Nullable<System.TimeSpan> hora { get; set; }
        public string time;
    }
}
