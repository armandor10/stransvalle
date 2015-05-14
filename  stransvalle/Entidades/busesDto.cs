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
        public Nullable<System.DateTime> FechaMatricula { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string NumeroChasis { get; set; }
        public string NumeroMotor { get; set; }
        public string Observaciones { get; set; }
        public string Password { get; set; }
        public Nullable<int> Grupo { get; set; }

        public string NombreClaseBus { get; set; }
        public string NombreClaseServicio { get; set; }
        public string NombreGrupo { get; set; }

        public int DiaMatricula { get; set; }
        public int MesMatricula { get; set; }
        public int AñoMatricula { get; set; }

        public string NumeroSOAT { get; set; }
        public DateTime FechaExpedicionSOAT { get; set; }
        public DateTime FechaVencimientoSOAT { get; set; }

        public string NumeroTecMec { get; set; }
        public DateTime FechaExpedicionTecMec { get; set; }
        public DateTime FechaVencimientoTecMec { get; set; }

        public string NumeroTarOpe { get; set; }
        public DateTime FechaExpedicionTarOpe { get; set; }
        public DateTime FechaVencimientoTarOpe { get; set; }

        public string NumeroPolCont { get; set; }
        public DateTime FechaExpedicionPolCont { get; set; }
        public DateTime FechaVencimientoPolCont { get; set; }

        public string NumeroPolExtCont { get; set; }
        public DateTime FechaExpedicionPolExtCont { get; set; }
        public DateTime FechaVencimientoPolExtCont { get; set; }

    }
}
