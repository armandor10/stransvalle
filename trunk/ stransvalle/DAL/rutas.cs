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
    
    public partial class rutas
    {
        public rutas()
        {
            this.coordenadasrutas = new HashSet<coordenadasrutas>();
            this.detallesplanilla = new HashSet<detallesplanilla>();
            this.rutagrupo = new HashSet<rutagrupo>();
        }
    
        public string NomRuta { get; set; }
        public string Descripcion { get; set; }
        public Nullable<int> Frecuencia { get; set; }
        public Nullable<int> Gabela { get; set; }
        public string Longitud { get; set; }
        public Nullable<int> Capacidad { get; set; }
        public Nullable<int> TiempoRecorrido { get; set; }
        public Nullable<int> idHorario { get; set; }
        public Nullable<int> NumeroRecorridos { get; set; }
    
        public virtual ICollection<coordenadasrutas> coordenadasrutas { get; set; }
        public virtual ICollection<detallesplanilla> detallesplanilla { get; set; }
        public virtual horario horario { get; set; }
        public virtual ICollection<rutagrupo> rutagrupo { get; set; }
    }
}