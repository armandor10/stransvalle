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
    public class mHistorialMovimiento
    {

        public mHistorialMovimiento(){
            Mapper.CreateMap<historialmovimiento,historialmovimientoDTO>();
        }

        tvEntities ctx;

        public List<entradassalidasDTO> getDetallesRecorridos(DateTime fecha, string Vial)
        {
            fecha = fecha.Date;
            DateTime fechaFin = new DateTime(fecha.Year, fecha.Month, fecha.Day, 23, 59, 59);
            List<entradassalidasDTO> lEsDto;
            entradassalidasDTO eSDto;

            using (ctx = new tvEntities())
            {

                List<entradassalidas> lEs = ctx.entradassalidas
                    .OrderBy(t => t.Fecha)
                    .Where(t => t.Fecha > fecha && t.Fecha < fechaFin && t.buses.Vial == Vial)
                    .ToList();

                if (lEs.Count > 0)
                {
                    lEsDto = new List<entradassalidasDTO>();
                    eSDto = new entradassalidasDTO();

                    foreach (entradassalidas eS in lEs)
                    {
                        if (eS.Estado == "S")
                        {
                            eSDto.Fecha = eS.Fecha;
                        }
                        else
                        {
                            eSDto.Placa = eS.Placa;
                            eSDto.FechaFin = eS.Fecha;
                            lEsDto.Add(eSDto);
                            eSDto = new entradassalidasDTO();
                        }
                    }

                    return lEsDto;
                }
                else
                {
                    return null;
                }

            }
        }

        public List<historialmovimientoDTO> get(entradassalidasDTO eSDto) {             
            //fecha = fecha.Date;
            //DateTime fechaFin = new DateTime(fecha.Year, fecha.Month, fecha.Day, 23, 59, 59);
            List<historialmovimientoDTO> lHmDto ;
            historialmovimientoDTO hMDto;

            using(ctx=new tvEntities()){
                List<historialmovimiento> lHm = ctx.historialmovimiento
                    .OrderBy(t => t.Fecha)
                    .Where(t => t.Fecha>=eSDto.Fecha && t.Fecha<=eSDto.FechaFin && t.Placa==eSDto.Placa)
                    .ToList();

                detallesplanilla dP = ctx.detallesplanilla
                    .Where(t => t.planillacontrol.Fecha == eSDto.Fecha.Date && t.PlacaBus == eSDto.Placa)
                    .FirstOrDefault();

                if (lHm.Count > 0) 
                {
                    lHmDto = new List<historialmovimientoDTO>();
                    foreach (historialmovimiento hM in lHm)
                    {
                        hMDto = new historialmovimientoDTO();
                        Mapper.Map(hM, hMDto);
                        hMDto.Ruta = dP.Ruta;
                        lHmDto.Add(hMDto);
                    }

                    return lHmDto;
                } 
                else
                { 
                    return null; 
                }                            
            }
        }

        public List<historialmovimientoDTO> getCoordTodayBuses(string ruta) {
            List<historialmovimientoDTO> lHmDto;
            historialmovimientoDTO hMDto;

            DateTime fecha = DateTime.Now.Date;

            using(ctx=new tvEntities()){
                List<detallesplanilla> lDp = ctx.detallesplanilla.Where(t=>t.Ruta==ruta&&t.planillacontrol.Fecha==fecha).ToList();
                if (lDp.Count > 0)
                {
                    lHmDto = new List<historialmovimientoDTO>();
                    historialmovimiento hM;
                    foreach (detallesplanilla dP in lDp)
                    {
                        hM = ctx.historialmovimiento
                            .OrderByDescending(t => t.Fecha)
                            .Where(t => t.Placa == dP.PlacaBus && t.Fecha > fecha).FirstOrDefault();
                        if (hM != null)
                        {
                            hMDto=new historialmovimientoDTO();
                            Mapper.Map(hM, hMDto);
                            hMDto.Vial = dP.buses.Vial;
                            lHmDto.Add(hMDto);
                        }
                    }
                    return lHmDto;
                }
                else 
                {
                    return null;
                }
            }
        }
   
    }
}
