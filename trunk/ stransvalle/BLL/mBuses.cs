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

        // id de los documentos en la base de datos
        private int docSOAT = 1; 
        private int docTecMec = 2;
        private int docTarOpe = 3;
        private int docPolCont = 4;
        private int docPolExtCont = 5;

        public mBuses()
        {
            Mapper.CreateMap<buses, busesDto>()
                .ForMember(dest => dest.NombreClaseBus, opt => opt.MapFrom(src => src.clasesbuses.Nombre))
                .ForMember(dest => dest.NombreClaseServicio, opt => opt.MapFrom(src => src.clasesservicio.Nombre))
                .ForMember(dest => dest.NombreGrupo, opt => opt.MapFrom(src => src.gruposbuses.Nombre))
                .ForMember(dest => dest.NumeroSOAT, opt => opt.MapFrom(src => src.documentosbus.Where(t => t.documento == docSOAT).FirstOrDefault().Numero))
                .ForMember(dest => dest.FechaExpedicionSOAT, opt => opt.MapFrom(src => src.documentosbus.Where(t => t.documento == docSOAT).FirstOrDefault().fechaExpedicion))
                .ForMember(dest => dest.FechaVencimientoSOAT, opt => opt.MapFrom(src => src.documentosbus.Where(t => t.documento == docSOAT).FirstOrDefault().fechaExpiracion))
                .ForMember(dest => dest.NumeroTecMec, opt => opt.MapFrom(src => src.documentosbus.Where(t => t.documento == docTecMec).FirstOrDefault().Numero))
                .ForMember(dest => dest.FechaExpedicionTecMec, opt => opt.MapFrom(src => src.documentosbus.Where(t => t.documento == docTecMec).FirstOrDefault().fechaExpedicion))
                .ForMember(dest => dest.FechaVencimientoTecMec, opt => opt.MapFrom(src => src.documentosbus.Where(t => t.documento == docTecMec).FirstOrDefault().fechaExpiracion))
                .ForMember(dest => dest.NumeroTarOpe, opt => opt.MapFrom(src => src.documentosbus.Where(t => t.documento == docTarOpe).FirstOrDefault().Numero))
                .ForMember(dest => dest.FechaExpedicionTarOpe, opt => opt.MapFrom(src => src.documentosbus.Where(t => t.documento == docTarOpe).FirstOrDefault().fechaExpedicion))
                .ForMember(dest => dest.FechaVencimientoTarOpe, opt => opt.MapFrom(src => src.documentosbus.Where(t => t.documento == docTarOpe).FirstOrDefault().fechaExpiracion))
                .ForMember(dest => dest.NumeroPolCont, opt => opt.MapFrom(src => src.documentosbus.Where(t => t.documento == docPolCont).FirstOrDefault().Numero))
                .ForMember(dest => dest.FechaExpedicionPolCont, opt => opt.MapFrom(src => src.documentosbus.Where(t => t.documento == docPolCont).FirstOrDefault().fechaExpedicion))
                .ForMember(dest => dest.FechaVencimientoPolCont, opt => opt.MapFrom(src => src.documentosbus.Where(t => t.documento == docPolCont).FirstOrDefault().fechaExpiracion))
                .ForMember(dest => dest.NumeroPolExtCont, opt => opt.MapFrom(src => src.documentosbus.Where(t => t.documento == docPolExtCont).FirstOrDefault().Numero))
                .ForMember(dest => dest.FechaExpedicionPolExtCont, opt => opt.MapFrom(src => src.documentosbus.Where(t => t.documento == docPolExtCont).FirstOrDefault().fechaExpedicion))
                .ForMember(dest => dest.FechaVencimientoPolExtCont, opt => opt.MapFrom(src => src.documentosbus.Where(t => t.documento == docPolExtCont).FirstOrDefault().fechaExpiracion));
            Mapper.CreateMap<busesDto, buses>();
            Mapper.CreateMap<gruposbuses, gruposbusesDto>();
            Mapper.CreateMap<gruposbusesDto, gruposbuses>();
            Mapper.CreateMap<documentosbusDTO, documentosbus>();
        }
        public List<busesDto> Gets()
        {
            using (ctx = new tvEntities())
            {
                List<busesDto> lrBuses = new List<busesDto>();
                List<buses> lBuses = ctx.buses.ToList();
                Mapper.Map(lBuses, lrBuses);
                lrBuses = lrBuses.OrderBy(t => t.FechaVencimientoSOAT).ToList();
                return lrBuses;
            }
        }

        public List<string> GetsVial() {
            using (ctx = new tvEntities())
            {
                List<string> lVial = new List<string>();
                List<buses> lBuses = ctx.buses.ToList();
                foreach (var bus in lBuses)
                {
                    string str = bus.Vial;
                    lVial.Add(str);
                }
                return lVial;
            }
        }

        public objRes InsertGrupo(string NombreGrupo)
        {
            using (ctx = new tvEntities())
            {
                objRes res = new objRes();
                gruposbuses grupo = ctx.gruposbuses.Where(t => t.Nombre == NombreGrupo).FirstOrDefault();
                if (grupo == null)
                {
                    grupo = new gruposbuses();
                    grupo.Nombre = NombreGrupo;
                    ctx.gruposbuses.Add(grupo);
                    ctx.SaveChanges();
                    res.Error = false;
                    res.Mensaje = "Operacion Realizada Satisfactoriamente...";
                }
                else
                {
                    res.Error = true;
                    res.Mensaje = "Ya existe un grupo con es nombre...";
                }
                return res;
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
        public char SingIn(string vial, string password)
        { 
            using(ctx=new tvEntities())
            {
                bool entrar = ctx.buses.Where(t=> t.Vial==vial).Any(t=> t.Password==password);
                if (entrar)
                {
                    return 'S';
                }
                else 
                {
                    return 'N';
                }
            }
        }
        public objRes InsertOrUpdateDocumentos(List<documentosbusDTO> lDocBusDto) {
            documentosbus DocBus;
            using (ctx = new tvEntities())
            {
                objRes Respuesta = new objRes();
                try
                {
                    foreach (var DocBusDto in lDocBusDto)
                    {
                        DocBus = ctx.documentosbus.Where(t => t.placa == DocBusDto.placa && t.documento == DocBusDto.documento).FirstOrDefault();
                        if (DocBus == null)
                        {
                            DocBus = new documentosbus();
                            Mapper.Map(DocBusDto, DocBus);
                            ctx.documentosbus.Add(DocBus);
                            ctx.SaveChanges();
                        }
                        else 
                        {
                            DocBus.Numero = DocBusDto.Numero;
                            DocBus.fechaExpedicion = DocBusDto.fechaExpedicion;
                            DocBus.fechaExpiracion = DocBusDto.fechaExpiracion;
                            ctx.SaveChanges();
                        }
                    }

                    Respuesta.Error = false;
                    Respuesta.Mensaje = "Operacion realizada satisfactoriamente!!!";
                    return Respuesta;

                }
                catch (Exception e)
                {
                    Respuesta.Error = true;
                    Respuesta.Mensaje = e.Message;
                    return Respuesta;
                }
            }
        }
    }
}
