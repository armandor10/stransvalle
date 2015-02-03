using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    public class rutasDto
    {
        public string NomRuta { get; set; }
        public string Descripcion { get; set; }
        public Nullable<int> Frecuencia { get; set; }
        public Nullable<int> Gabela { get; set; }
        public string Longitud { get; set; }
        public Nullable<int> Capacidad { get; set; }
        public Nullable<int> TiempoRecorrido { get; set; }

        public List<coordenadasrutasDto> lCoordenadas { get; set; }
    }
}
