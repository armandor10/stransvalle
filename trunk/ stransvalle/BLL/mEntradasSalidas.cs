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
    public class mEntradasSalidas
    {
        tvEntities ctx;
        public mEntradasSalidas()
        {
            Mapper.CreateMap<entradassalidas, entradassalidasDTO>();
            Mapper.CreateMap<entradassalidasDTO, entradassalidas>();
        }
        public List<entradassalidasDTO> Getultimas()
        {
            using (ctx = new tvEntities())
            {
                List<entradassalidasDTO> lrES = new List<entradassalidasDTO>();
                List<entradassalidas> lES = ctx.entradassalidas.OrderByDescending(t => t.Fecha).ToList();
                if (lES.Count() > 10)
                {
                    for (int i = 0; i <= 9; i++)
                    {
                        entradassalidasDTO Es = new entradassalidasDTO();
                        Mapper.Map(lES[i], Es);
                        lrES.Add(Es);
                    }
                }
                else
                {
                    foreach (entradassalidas item in lES)
                    {
                        entradassalidasDTO Es = new entradassalidasDTO();
                        Mapper.Map(item, Es);
                        lrES.Add(Es);
                    }
                }
                return lrES;
            }
        }
        public objRes Insert(entradassalidasDTO Reg)
        {
            using (ctx = new tvEntities())
            {
                objRes Respuesta = new objRes();
                try
                {
                    buses Bus = ctx.buses.Where(t => t.Placa == Reg.Placa).FirstOrDefault();
                    if (Bus != null)
                    {
                        entradassalidas ESOld = ctx.entradassalidas.Where(t => t.Placa == Reg.Placa).OrderByDescending(t => t.Fecha).FirstOrDefault();
                        if (ESOld == null)
                        {
                            entradassalidas ES = new entradassalidas();
                            ES.Fecha = DateTime.Now;
                            ES.Estado = "S";
                            ES.Placa = Reg.Placa;
                            ctx.entradassalidas.Add(ES);
                            ctx.SaveChanges();
                            Respuesta.Error = false;
                            Respuesta.Mensaje = "Operacion realizada satisfactoriamente!!!";
                            return Respuesta;
                        }
                        else
                        {
                            DateTime FechaActual = DateTime.Now;
                            TimeSpan Diferencia = FechaActual - ESOld.Fecha;
                            if (Diferencia.Minutes < 10)
                            {
                                Respuesta.Error = true;
                                Respuesta.Mensaje = "Este bus ya tiene un evento registrado en menos de 10 minutos, por favor verifique o espere!!!";
                                return Respuesta;
                            }
                            else
                            {
                                entradassalidas ES = new entradassalidas();
                                ES.Fecha = FechaActual;
                                if (ESOld.Estado == "E") ES.Estado = "S";
                                else ES.Estado = "E";
                                ES.Placa = Reg.Placa;
                                ctx.entradassalidas.Add(ES);
                                ctx.SaveChanges();
                                Respuesta.Error = false;
                                Respuesta.Mensaje = "Operacion realizada satisfactoriamente!!!";
                                return Respuesta;
                            }

                        }
                    }
                    else
                    {
                        Respuesta.Error = true;
                        Respuesta.Mensaje = "No existe un bus registrado con placa: " + Reg.Placa;
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
    }
}
