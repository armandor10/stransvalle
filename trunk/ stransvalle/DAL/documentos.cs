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
    
    public partial class documentos
    {
        public documentos()
        {
            this.documentos_has_bus = new HashSet<documentos_has_bus>();
            this.persona_has_documentos = new HashSet<persona_has_documentos>();
        }
    
        public int idDocumentos { get; set; }
        public string Aseguradora { get; set; }
        public Nullable<System.DateTime> FchExpedicion { get; set; }
        public Nullable<System.DateTime> FchExpiracion { get; set; }
        public string nombre { get; set; }
        public string Numero { get; set; }
    
        public virtual ICollection<documentos_has_bus> documentos_has_bus { get; set; }
        public virtual ICollection<persona_has_documentos> persona_has_documentos { get; set; }
    }
}
