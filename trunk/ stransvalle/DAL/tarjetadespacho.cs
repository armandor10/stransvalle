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
    
    public partial class tarjetadespacho
    {
        public tarjetadespacho()
        {
            this.recorrido = new HashSet<recorrido>();
        }
    
        public string NumTarjeta { get; set; }
        public Nullable<System.DateTime> Fecha { get; set; }
        public string Persona_Cedula { get; set; }
        public string Bus_Placa { get; set; }
        public string Bus_Vial { get; set; }
    
        public virtual ICollection<recorrido> recorrido { get; set; }
    }
}
