using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entidades;
using DAL;
using AutoMapper;

namespace BLL
{
    public class mDatosBasicos
    {
        tvEntities ctx;
        public mDatosBasicos()
        {
            Mapper.CreateMap<clasesbuses, clasesbusesDto>();
            Mapper.CreateMap<clasesservicio,clasesservicioDto>();
            Mapper.CreateMap<gruposbuses, gruposbusesDto>();
        }
        public DatosBasicosDto GetDatosBasicos()
        {
            DatosBasicosDto objDatosBasicos = new DatosBasicosDto();
            objDatosBasicos.lClasesBuses = GetClasesBuses();
            objDatosBasicos.lClasesServicio = GetClasesServicio();
            objDatosBasicos.lGruposBuses = GetGruposBuses();
            return objDatosBasicos;
        }
        public List<clasesservicioDto> GetClasesServicio()
        {
            using(ctx = new tvEntities())
            {
                List<clasesservicioDto> lRes = new List<clasesservicioDto>();
                List<clasesservicio> mObj = ctx.clasesservicio.ToList();
                Mapper.Map(mObj, lRes);
                return lRes;
            }
        }
        public List<clasesbusesDto> GetClasesBuses()
        {
            using (ctx = new tvEntities())
            {
                List<clasesbusesDto> lRes = new List<clasesbusesDto>();
                List<clasesbuses> mObj = ctx.clasesbuses.ToList();
                Mapper.Map(mObj, lRes);
                return lRes;
            }
        }
        public List<gruposbusesDto> GetGruposBuses()
        {
            using (ctx = new tvEntities())
            {
                List<gruposbusesDto> lRes = new List<gruposbusesDto>();
                List<gruposbuses> mObj = ctx.gruposbuses.ToList();
                Mapper.Map(mObj, lRes);
                return lRes;
            }
        }
    }
}
