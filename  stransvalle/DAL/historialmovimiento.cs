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
    
    public partial class historialmovimiento
    {
        public string Placa { get; set; }
        public string Latitud { get; set; }
        public string Longitud { get; set; }
        public System.DateTime Fecha { get; set; }
        public Nullable<int> Velocidad { get; set; }
        public Nullable<int> Punto { get; set; }
    
        public virtual buses buses { get; set; }
        public virtual puntoscontrol puntoscontrol { get; set; }
    }
}
