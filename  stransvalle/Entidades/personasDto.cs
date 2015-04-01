using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    public class personasDto
    {
        public string Nombres { get; set; }
        public string Apellidos { get; set; }
        public string Cedula { get; set; }
        public Nullable<System.DateTime> FechaNacimiento { get; set; }
        public string Direccion { get; set; }
        public string Telefono { get; set; }
        public string EPS { get; set; }
        public string Pension { get; set; }
        public string TipoSangre { get; set; }
        public Nullable<int> TipoPersona { get; set; }
        public string User { get; set; }
        public string TipoIdentificacion { get; set; }

        public string NumeroContratoConduccion { get; set; }
        public DateTime FechaExpedicionContratoConduccion { get; set; }
        public DateTime FechaVencimientoContratoConduccion { get; set; }

        public string NumeroLicenciaConduccion { get; set; }
        public DateTime FechaExpedicionLicenciaConduccion { get; set; }
        public DateTime FechaVencimientoLicenciaConduccion { get; set; }
    }
}
