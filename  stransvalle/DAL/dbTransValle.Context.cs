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
    
        public DbSet<buses> buses { get; set; }
        public DbSet<clasesbuses> clasesbuses { get; set; }
        public DbSet<clasesservicio> clasesservicio { get; set; }
        public DbSet<rolesusuariosplataforma> rolesusuariosplataforma { get; set; }
        public DbSet<usuariosplataforma> usuariosplataforma { get; set; }
    }
}
