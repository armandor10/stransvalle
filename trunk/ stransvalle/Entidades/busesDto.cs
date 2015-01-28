using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    public class busesDto
    {
        public string Placa { get; set; }
        public string Vial { get; set; }
        public string Capacidad { get; set; }
        public Nullable<int> ClaseBus { get; set; }
        public Nullable<int> ClaseServicio { get; set; }
        public DateTime FechaMatricula { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string NumeroChasis { get; set; }
        public string NumeroMotor { get; set; }
        public string Observaciones { get; set; }
        public string Password { get; set; }

        public string NombreClaseBus { get; set; }
        public string NombreClaseServicio { get; set; }

        public int DiaMatricula { get; set; }
        public int MesMatricula { get; set; }
        public int AñoMatricula { get; set; }
    }
}
