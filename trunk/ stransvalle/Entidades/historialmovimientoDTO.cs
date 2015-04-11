using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    public class historialmovimientoDTO
    {
        public string Placa { get; set; }
        public string Latitud { get; set; }
        public string Longitud { get; set; }
        public System.DateTime Fecha { get; set; }
        public Nullable<int> Velocidad { get; set; }
        public Nullable<int> Punto { get; set; }

        public string Ruta { get; set; }
        public string Vial { get; set; }
    }
}
