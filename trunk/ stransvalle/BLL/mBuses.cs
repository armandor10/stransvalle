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
    public class mBuses
    {
        tvEntities ctx;
        public mBuses()
        {
            Mapper.CreateMap<buses, busesDto>()
                .ForMember(dest => dest.NombreClaseBus, opt => opt.MapFrom(src => src.clasesbuses.Nombre))
                .ForMember(dest => dest.NombreClaseServicio, opt => opt.MapFrom(src => src.clasesservicio.Nombre));
            Mapper.CreateMap<busesDto, buses>();
        }
        public List<busesDto> Gets()
        {
            using (ctx = new tvEntities())
            {
                List<busesDto> lrBuses = new List<busesDto>();
                List<buses> lBuses = ctx.buses.ToList();
                Mapper.Map(lBuses, lrBuses);
                return lrBuses;
            }
        }
        public objRes Insert(busesDto Reg)
        {
            using (ctx = new tvEntities())
            {
                objRes Respuesta = new objRes();
                try
                {
                    buses BusOld = ctx.buses.Where(t => t.Placa == Reg.Placa).FirstOrDefault();
                    if (BusOld == null)
                    {
                        buses Bus = new buses();
                        Mapper.Map(Reg, Bus);
                        ctx.buses.Add(Bus);
                        ctx.SaveChanges();
                        Respuesta.Error = false;
                        Respuesta.Mensaje = "Operacion realizada satisfactoriamente!!!";
                        return Respuesta;
                    }
                    else
                    {
                        Respuesta.Error = true;
                        Respuesta.Mensaje = "Ya se encuentra registrado un bus con esta placa...";
                        return Respuesta;
                    }
                }
                catch (Exception e)
                {
                    Respuesta.Error = true;
                    Respuesta.Mensaje = e.Message;
                    return Respuesta;
                }
            }
        }
        public objRes Update(busesDto Reg)
        {
            using (ctx = new tvEntities())
            {
                objRes Respuesta = new objRes();
                try
                {
                    buses BusOld = ctx.buses.Where(t => t.Placa == Reg.Placa).FirstOrDefault();
                    if (BusOld != null)
                    {
                        Mapper.Map(Reg, BusOld);
                        ctx.SaveChanges();
                        Respuesta.Error = false;
                        Respuesta.Mensaje = "Operacion realizada satisfactoriamente!!!";
                        return Respuesta;
                    }
                    else
                    {
                        Respuesta.Error = true;
                        Respuesta.Mensaje = "No se encuentra registrado un bus con esta placa...";
                        return Respuesta;
                    }
                }
                catch (Exception e)
                {
                    Respuesta.Error = true;
                    Respuesta.Mensaje = e.Message;
                    return Respuesta;
                }
            }
        }
        public objRes Delete(string Placa)
        {
            using (ctx = new tvEntities())
            {
                objRes Res = new objRes();
                try
                {
                    buses oBus = ctx.buses.Where(t => t.Placa == Placa).FirstOrDefault();
                    if (oBus != null)
                    {
                        ctx.buses.Remove(oBus);
                        ctx.SaveChanges();
                        Res.Error = false;
                        Res.Mensaje = "Operacion realizada satisfactoriamente!!!";
                    }
                    else
                    {
                        Res.Error = true;
                        Res.Mensaje = "No existe bus con esa placa!!!";
                    }
                    return Res;
                }
                catch (Exception e)
                {
                    Res.Error = true;
                    Res.Mensaje = e.Message;
                    return Res;
                }
            }
        }
    }
}
