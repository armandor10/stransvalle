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
    
    public partial class detallesplanilla
    {
        public detallesplanilla()
        {
            this.planillarecaudo = new HashSet<planillarecaudo>();
        }
    
        public int id { get; set; }
        public int idPlanillaControl { get; set; }
        public string PlacaBus { get; set; }
        public string Ruta { get; set; }
        public Nullable<System.TimeSpan> HoraSalida { get; set; }
    
        public virtual buses buses { get; set; }
        public virtual planillacontrol planillacontrol { get; set; }
        public virtual rutas rutas { get; set; }
        public virtual ICollection<planillarecaudo> planillarecaudo { get; set; }
    }
}
