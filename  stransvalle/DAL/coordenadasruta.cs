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
    
    public partial class coordenadasruta
    {
        public int idCordenadasRuta { get; set; }
        public Nullable<int> Item { get; set; }
        public string Latitud { get; set; }
        public string Longitud { get; set; }
        public int Ruta_idRuta { get; set; }
    
        public virtual ruta ruta { get; set; }
    }
}
