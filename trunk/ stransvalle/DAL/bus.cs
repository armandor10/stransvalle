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
    
    public partial class bus
    {
        public string Placa { get; set; }
        public string Vial { get; set; }
        public string Capacidad { get; set; }
        public string Clase { get; set; }
        public string ClaseServicio { get; set; }
        public string Estado { get; set; }
        public Nullable<System.DateTime> fechaMatricula { get; set; }
        public string Grupo { get; set; }
        public string Marca { get; set; }
        public string Modelo { get; set; }
        public string NumChasis { get; set; }
        public string NumMotor { get; set; }
        public string Observaciones { get; set; }
        public string TO { get; set; }
        public Nullable<System.DateTime> VidaUtil { get; set; }
        public int PlanillaRecaudo_idPlanillaRecaudo { get; set; }
        public int PlanillaControl_idPlanillaControl { get; set; }
        public string Transvalle_Nit { get; set; }
        public long Usuario_idUsuario { get; set; }
    
        public virtual planillacontrol planillacontrol { get; set; }
        public virtual planillarecaudo planillarecaudo { get; set; }
        public virtual transvalle transvalle { get; set; }
        public virtual usuario usuario { get; set; }
    }
}
