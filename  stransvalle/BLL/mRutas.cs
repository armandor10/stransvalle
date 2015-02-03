using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Entidades;
using DAL;

namespace BLL
{
    public class mRutas
    {
        tvEntities ctx;
        public mRutas()
        {
            Mapper.CreateMap<rutas, rutasDto>()
                .ForMember(dest => dest.lCoordenadas, opt => opt.MapFrom(src => src.coordenadasrutas.OrderBy(t=> t.id).ToList()));
            Mapper.CreateMap<rutasDto, rutas>();
            Mapper.CreateMap<coordenadasrutasDto, coordenadasrutas>();
            Mapper.CreateMap<coordenadasrutas, coordenadasrutasDto>();
        }
        public objRes Insert(rutasDto Reg)
        {
            using (ctx = new tvEntities())
            {
                objRes Respuesta = new objRes();
                try
                {
                    rutas RutaOld = ctx.rutas.Where(t => t.NomRuta == Reg.NomRuta).FirstOrDefault();
                    if (RutaOld == null)
                    {
                        rutas ruta = new rutas();
                        Mapper.Map(Reg, ruta);
                        ctx.rutas.Add(ruta);
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
        public List<rutasDto> Gets()
        {
            using (ctx = new tvEntities())
            {
                List<rutasDto> lrRutas = new List<rutasDto>();
                List<rutas> lRutas = ctx.rutas.OrderBy(t => t.NomRuta).ToList();
                Mapper.Map(lRutas, lrRutas);
                return lrRutas;
            }
        }
        public objRes Delete(string NomRuta)
        {
            using (ctx = new tvEntities())
            {
                objRes Res = new objRes();
                try
                {
                    rutas oRuta = ctx.rutas.Where(t => t.NomRuta == NomRuta).FirstOrDefault();
                    if (oRuta != null)
                    {
                        foreach (coordenadasrutas item in oRuta.coordenadasrutas.ToList())
                        {
                            ctx.coordenadasrutas.Remove(item);
                            ctx.SaveChanges();
                        }

                        ctx.rutas.Remove(oRuta);
                        ctx.SaveChanges();
                        Res.Error = false;

                        Res.Mensaje = "Operacion realizada satisfactoriamente!!!";
                    }
                    else
                    {
                        Res.Error = true;
                        Res.Mensaje = "No existe ruta con este nombre!!!";
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
        public objRes AsigPuntosRuta(coordenadasrutasDto Reg)
        {
            using (ctx = new tvEntities())
            {
                objRes Respuesta = new objRes();
                try
                {
                    coordenadasrutas coor = new coordenadasrutas();
                    Mapper.Map(Reg, coor);
                    ctx.coordenadasrutas.Add(coor);
                    ctx.SaveChanges();
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
