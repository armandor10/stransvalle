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
    
    public partial class puntoscontrol
    {
        public puntoscontrol()
        {
            this.ruta = new HashSet<ruta>();
        }
    
        public int idPuntosControl { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public string Latitud { get; set; }
        public string Longitud { get; set; }
    
        public virtual ICollection<ruta> ruta { get; set; }
    }
}
