//------------------------------------------------------------------------------
// <auto-generated>
//    Este código se generó a partir de una plantilla.
//
//    Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//    Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class buses
    {
        public buses()
        {
            this.documentosbus = new HashSet<documentosbus>();
            this.detallesplanilla = new HashSet<detallesplanilla>();
        }
    
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
    
        public virtual gruposbuses gruposbuses { get; set; }
        public virtual ICollection<documentosbus> documentosbus { get; set; }
        public virtual ICollection<detallesplanilla> detallesplanilla { get; set; }
        public virtual clasesbuses clasesbuses { get; set; }
        public virtual clasesservicio clasesservicio { get; set; }
    }
}
