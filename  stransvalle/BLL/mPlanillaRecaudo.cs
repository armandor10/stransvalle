using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;
using Entidades;
using AutoMapper;

namespace BLL
{
   public class mPlanillaRecaudo
    {
       public mPlanillaRecaudo() {
           Mapper.CreateMap<planillarecaudo, planillarecaudoDTO>()
               .ForMember(dest => dest.Placa, opt => opt.MapFrom(src => src.detallesplanilla.PlacaBus))
               .ForMember(dest => dest.Ruta, opt => opt.MapFrom(src => src.detallesplanilla.Ruta))
               .ForMember(dest => dest.Vial, opt => opt.MapFrom(src => src.detallesplanilla.buses.Vial));                       
           Mapper.CreateMap<planillarecaudoDTO, planillarecaudo>();
           Mapper.CreateMap<gastos, gastosDTO>();
           Mapper.CreateMap<gastosDTO, gastos>(); 
       }

       private static System.TimeSpan time;
       tvEntities ctx;

       public List<planillarecaudoDTO> get(DateTime fecha, int grupo) {
           fecha = fecha.Date;//new DateTime(fecha.Year,fecha.Month,fecha.d)
           List<planillarecaudoDTO> lPlaRecDto;
           planillarecaudo pR;
           planillarecaudo pRaux;
           planillarecaudoDTO pRDto;
           gastos gastos;
           DateTime fecha2;

           using (ctx = new tvEntities()) {
               planillacontrol PlaCtr = ctx.planillacontrol.Where(t => t.Fecha==fecha && t.Grupo == grupo).FirstOrDefault();               

               if (PlaCtr!=null) 
               {
                   lPlaRecDto = new List<planillarecaudoDTO>();

                   List<detallesplanilla> lDePla = PlaCtr.detallesplanilla.OrderBy(t=> t.id).Where(t=> t.idPlanillaControl==PlaCtr.id).ToList();
                  
                   foreach (detallesplanilla dP in lDePla) 
                   {
                       pR = ctx.planillarecaudo.OrderBy(t=> t.idDetallesPlanilla).Where(t => t.idDetallesPlanilla == dP.id).FirstOrDefault();
                       pRDto = new planillarecaudoDTO();

                       if (pR == null)
                       {                                                
                           pR = new planillarecaudo();
                           gastos = new gastos();
                           pR.idDetallesPlanilla = dP.id;                           
                           pR.Recorridos = 0;// Calcular el numero de Recorridos. Corregir 
                           pR.Fecha = fecha;
                           ctx.planillarecaudo.Add(pR);                           
                           ctx.SaveChanges();

                           gastos.idplanillarecaudo = pR.id;
                           ctx.gastos.Add(gastos);
                           ctx.SaveChanges();

                           //pRaux=ctx.planillarecaudo.OrderByDescending(t=> t.detallesplanilla.id)
                           //    .Where(t=> t.detallesplanilla.id<pR.idDetallesPlanilla &&
                           //        t.detallesplanilla.PlacaBus==
                           //        (ctx.detallesplanilla.Where(y=>y.id==pR.idDetallesPlanilla).FirstOrDefault().PlacaBus))
                           //    .FirstOrDefault();
                           fecha2 = fecha.AddDays(-1);
                           pRaux = ctx.planillarecaudo.Where(t => t.Fecha == fecha2 && t.detallesplanilla.PlacaBus ==dP.PlacaBus).FirstOrDefault();

                           if (pRaux == null)
                           {
                               pR.InicioTorniquete = 0;
                           }
                           else 
                           {
                               pR.InicioTorniquete = pRaux.FinTorniquete;
                           }

                           ctx.SaveChanges();

                       }

                       Mapper.Map(pR, pRDto);
                       pRDto.Time = dP.HoraSalida.ToString();
                       Mapper.Map(pR.gastos, pRDto.gastos);                                            
                       lPlaRecDto.Add(pRDto);
                   }

                   return lPlaRecDto;
               } 
               else 
               {
                   return null;
               }                                         
           }                  
       }

       public objRes update(planillarecaudoDTO pRDTO) {
           using (ctx = new tvEntities())
           {
               objRes Respuesta = new objRes();
               planillarecaudo pR;

               try
               {
                   pR= ctx.planillarecaudo.Where(t=>t.id==pRDTO.id).FirstOrDefault();
                   if (pR != null)
                   {
                       Mapper.Map(pRDTO, pR);
                       Mapper.Map(pRDTO.gastos, pR.gastos);
                       ctx.SaveChanges();
                       Respuesta.Error = false;
                       Respuesta.Mensaje = "Operacion realizada satisfactoriamente!!!";
                       return Respuesta;
                   }
                   else 
                   {
                       Respuesta.Error = true;
                       Respuesta.Mensaje = "No se encuentro registrada la planilla de reacaudo a actualizar...";
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
