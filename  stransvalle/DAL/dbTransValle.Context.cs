﻿//------------------------------------------------------------------------------
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
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class tvEntities : DbContext
    {
        public tvEntities()
            : base("name=tvEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public DbSet<asignarbus> asignarbus { get; set; }
        public DbSet<buses> buses { get; set; }
        public DbSet<clasesbuses> clasesbuses { get; set; }
        public DbSet<clasesservicio> clasesservicio { get; set; }
        public DbSet<coordenadasrutas> coordenadasrutas { get; set; }
        public DbSet<detallesplanilla> detallesplanilla { get; set; }
        public DbSet<documentos> documentos { get; set; }
        public DbSet<documentosbus> documentosbus { get; set; }
        public DbSet<documentospersona> documentospersona { get; set; }
        public DbSet<empresa> empresa { get; set; }
        public DbSet<entradassalidas> entradassalidas { get; set; }
        public DbSet<gastos> gastos { get; set; }
        public DbSet<gruposbuses> gruposbuses { get; set; }
        public DbSet<historialmovimiento> historialmovimiento { get; set; }
        public DbSet<horario> horario { get; set; }
        public DbSet<personas> personas { get; set; }
        public DbSet<planillacontrol> planillacontrol { get; set; }
        public DbSet<planillarecaudo> planillarecaudo { get; set; }
        public DbSet<puntoscontrol> puntoscontrol { get; set; }
        public DbSet<puntoscontrolruta> puntoscontrolruta { get; set; }
        public DbSet<rolesusuariosplataforma> rolesusuariosplataforma { get; set; }
        public DbSet<rutagrupo> rutagrupo { get; set; }
        public DbSet<rutas> rutas { get; set; }
        public DbSet<tiposidentificacionpersona> tiposidentificacionpersona { get; set; }
        public DbSet<tipostrabajador> tipostrabajador { get; set; }
        public DbSet<usuariosplataforma> usuariosplataforma { get; set; }
    }
}
