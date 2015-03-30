using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
   public class planillarecaudoDTO
    {
        public int id { get; set; }
        public Nullable<System.DateTime> Fecha { get; set; }
        public Nullable<int> Recorridos { get; set; }
        public Nullable<int> InicioTorniquete { get; set; }
        public Nullable<int> FinTorniquete { get; set; }
        public Nullable<int> NumPasajeros { get; set; }
        public Nullable<decimal> ProductoBruto { get; set; }
        public Nullable<decimal> ProductoNeto { get; set; }
        public Nullable<int> idDetallesPlanilla { get; set; }

        public gastosDTO gastos { get; set; }

        public string Vial { get; set; }
        public string Placa { get; set; }
        public string Ruta { get; set; }
        public string Time { get; set; }
    }
}
