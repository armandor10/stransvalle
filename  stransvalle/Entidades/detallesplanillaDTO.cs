using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
  public  class detallesplanillaDTO
    {      
      public int id { get; set; }
      public int idPlanillaControl { get; set; }
      public string PlacaBus { get; set; }
      public string Ruta { get; set; }

      public string Vial { get; set; }

    }
}
