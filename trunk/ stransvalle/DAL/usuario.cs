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
    
    public partial class usuario
    {
        public usuario()
        {
            this.bus = new HashSet<bus>();
            this.perfil = new HashSet<perfil>();
            this.persona = new HashSet<persona>();
        }
    
        public long idUsuario { get; set; }
        public string Usuario1 { get; set; }
        public string Contrasena { get; set; }
    
        public virtual ICollection<bus> bus { get; set; }
        public virtual ICollection<perfil> perfil { get; set; }
        public virtual ICollection<persona> persona { get; set; }
    }
}
