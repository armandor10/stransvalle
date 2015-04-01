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
    public class mPersonas
    {
        tvEntities ctx;
        public mPersonas()
        {
            
            Mapper.CreateMap<personasDto, personas>();
        }
        public List<personasDto> GetsConductores()
        {
            using (ctx = new tvEntities())
            {
                List<personasDto> lr = new List<personasDto>();
                List<personas> l = ctx.personas.Where(t=> t.TipoPersona == 1).ToList();

                Mapper.CreateMap<personas, personasDto>()
                    .ForMember(dest => dest.NumeroContratoConduccion, opt => opt.MapFrom(src => src.documentospersona.Where(t => t.documento == 6).FirstOrDefault().Numero))
                    .ForMember(dest => dest.FechaExpedicionContratoConduccion, opt => opt.MapFrom(src => src.documentospersona.Where(t => t.documento == 6).FirstOrDefault().fechaExpedicion))
                    .ForMember(dest => dest.FechaVencimientoContratoConduccion, opt => opt.MapFrom(src => src.documentospersona.Where(t => t.documento == 6).FirstOrDefault().fechaExpiracion))
                    .ForMember(dest => dest.NumeroLicenciaConduccion, opt => opt.MapFrom(src => src.documentospersona.Where(t => t.documento == 7).FirstOrDefault().Numero))
                    .ForMember(dest => dest.FechaExpedicionLicenciaConduccion, opt => opt.MapFrom(src => src.documentospersona.Where(t => t.documento == 7).FirstOrDefault().fechaExpedicion))
                    .ForMember(dest => dest.FechaVencimientoLicenciaConduccion, opt => opt.MapFrom(src => src.documentospersona.Where(t => t.documento == 7).FirstOrDefault().fechaExpiracion));

                Mapper.Map(l, lr);
                return lr;
            }
        }
        public objRes Insert(personasDto Reg)
        {
            using (ctx = new tvEntities())
            {
                objRes Respuesta = new objRes();
                try
                {
                    personas Old = ctx.personas.Where(t => t.Cedula == Reg.Cedula).FirstOrDefault();
                    if (Old == null)
                    {
                        personas Per = new personas();
                        Mapper.Map(Reg, Per);
                        ctx.personas.Add(Per);

                        // Crear Contrato de conduccion
                        documentospersona ContratoConduccion = new documentospersona();
                        ContratoConduccion.cedula = Reg.Cedula;
                        ContratoConduccion.documento = 6;
                        ContratoConduccion.Numero = Reg.NumeroContratoConduccion;
                        ContratoConduccion.fechaExpedicion = Reg.FechaExpedicionContratoConduccion;
                        ContratoConduccion.fechaExpiracion = Reg.FechaVencimientoContratoConduccion;
                        ctx.documentospersona.Add(ContratoConduccion);

                        // Crear Contrato de conduccion
                        documentospersona LicenciaConduccion = new documentospersona();
                        LicenciaConduccion.cedula = Reg.Cedula;
                        LicenciaConduccion.documento = 7;
                        LicenciaConduccion.Numero = Reg.NumeroLicenciaConduccion;
                        LicenciaConduccion.fechaExpedicion = Reg.FechaExpedicionLicenciaConduccion;
                        LicenciaConduccion.fechaExpiracion = Reg.FechaVencimientoLicenciaConduccion;
                        ctx.documentospersona.Add(LicenciaConduccion);

                        ctx.SaveChanges();
                        Respuesta.Error = false;
                        Respuesta.Mensaje = "Operacion realizada satisfactoriamente!!!";
                        return Respuesta;
                    }
                    else
                    {
                        Respuesta.Error = true;
                        Respuesta.Mensaje = "Ya se encuentra registrado una con esta cedula...";
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
        public objRes Update(personasDto Reg)
        {
            using (ctx = new tvEntities())
            {
                objRes Respuesta = new objRes();
                try
                {
                    personas Old = ctx.personas.Where(t => t.Cedula == Reg.Cedula).FirstOrDefault();
                    if (Old != null)
                    {
                        Mapper.Map(Reg, Old);

                        // Modifica Contrato de conduccion
                        Old.documentospersona.Where(t=> t.documento == 6).FirstOrDefault().Numero = Reg.NumeroContratoConduccion;
                        Old.documentospersona.Where(t => t.documento == 6).FirstOrDefault().fechaExpedicion = Reg.FechaExpedicionContratoConduccion;
                        Old.documentospersona.Where(t => t.documento == 6).FirstOrDefault().fechaExpiracion = Reg.FechaVencimientoContratoConduccion;

                        // Modifica Contrato de conduccion
                        Old.documentospersona.Where(t => t.documento == 7).FirstOrDefault().Numero = Reg.NumeroLicenciaConduccion;
                        Old.documentospersona.Where(t => t.documento == 7).FirstOrDefault().fechaExpedicion = Reg.FechaExpedicionLicenciaConduccion;
                        Old.documentospersona.Where(t => t.documento == 7).FirstOrDefault().fechaExpiracion = Reg.FechaVencimientoLicenciaConduccion;

                        ctx.SaveChanges();
                        Respuesta.Error = false;
                        Respuesta.Mensaje = "Operacion realizada satisfactoriamente!!!";
                        return Respuesta;
                    }
                    else
                    {
                        Respuesta.Error = true;
                        Respuesta.Mensaje = "No se encuentra registrado persona con esta cedula...";
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
        public objRes Delete(string Cedula)
        {
            using (ctx = new tvEntities())
            {
                objRes Res = new objRes();
                try
                {
                    personas oPer = ctx.personas.Where(t => t.Cedula == Cedula).FirstOrDefault();
                    if (oPer != null)
                    {
                        List<documentospersona> lDocumentos = ctx.documentospersona.Where(t => t.cedula == Cedula).ToList();
                        foreach (documentospersona item in lDocumentos)
                        {
                            ctx.documentospersona.Remove(item);
                        }

                        ctx.personas.Remove(oPer);
                        ctx.SaveChanges();
                        Res.Error = false;
                        Res.Mensaje = "Operacion realizada satisfactoriamente!!!";
                    }
                    else
                    {
                        Res.Error = true;
                        Res.Mensaje = "No existe persona con esa cedula!!!";
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
