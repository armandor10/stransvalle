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
    
    public partial class horario
    {
        public horario()
        {
            this.rutas = new HashSet<rutas>();
        }
    
        public int id { get; set; }
        public Nullable<System.TimeSpan> hora { get; set; }
    
        public virtual ICollection<rutas> rutas { get; set; }
    }
}
