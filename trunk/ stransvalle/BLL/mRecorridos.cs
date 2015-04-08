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
   public class mRecorridos
    {
       tvEntities ctx;

       public mRecorridos() {
           Mapper.CreateMap<detallesplanilla, detallesplanillaDTO>()
              .ForMember(dest => dest.Vial, opt => opt.MapFrom(src => src.buses.Vial));
       }

       public List<detallesplanillaDTO> getInformeRecorridos(DateTime fecha, int grupo) {
           fecha = fecha.Date;
           DateTime fechaFin = new DateTime(fecha.Year, fecha.Month, fecha.Day, 23, 59, 59);
           List<detallesplanillaDTO> lDpDto = new List<detallesplanillaDTO>();

           using (ctx = new tvEntities()) {
               planillacontrol PlaCtr = ctx.planillacontrol.Where(t => t.Fecha == fecha && t.Grupo == grupo).FirstOrDefault();

               if (PlaCtr != null)
               {
                   List<detallesplanilla> lDp = ctx.detallesplanilla.Where(t => t.idPlanillaControl == PlaCtr.id).ToList();

                   Mapper.Map(lDp, lDpDto);

                   foreach (var dP in lDpDto)
                   {
                       asignarbus aBus = ctx.asignarbus.Where(t => t.Placa == dP.PlacaBus && t.Estado == "A").FirstOrDefault();
                       if (aBus != null)
                       {
                           dP.Conductor = aBus.personas.Nombres + " " + aBus.personas.Apellidos;
                       }

                       dP.Recorridos = ctx.entradassalidas.Where(t => t.Fecha > fecha &&
                      t.Fecha < fechaFin &&
                      t.Placa == dP.PlacaBus && t.Estado == "E").Count();

                   }

                   return lDpDto;
               }
               else 
               {
                   return null;
               }          
           }       
       }

       public List<entradassalidasDTO> getDetallesRecorridos(DateTime fecha,int grupo,string placa) {

           fecha = fecha.Date;
           DateTime fechaFin = new DateTime(fecha.Year, fecha.Month, fecha.Day, 23, 59, 59);
           List<entradassalidasDTO> lEsDto = new List<entradassalidasDTO>();
           entradassalidasDTO eSDto;

           using (ctx = new tvEntities()) {

               List<entradassalidas> lEs = ctx.entradassalidas.OrderBy(t=>t.Fecha).Where(t => t.Fecha > fecha && t.Fecha < fechaFin && t.Placa == placa).ToList();
               //rutagrupo rG = ctx.rutagrupo.Where(t=> t.Grupo==grupo).FirstOrDefault().rutas;
               rutas ruta = ctx.rutagrupo.Where(t => t.Grupo == grupo).FirstOrDefault().rutas;

               eSDto = new entradassalidasDTO();
               foreach (entradassalidas eS in lEs)
               {
                   if (eS.Estado == "S")
                   {
                       eSDto.Fecha = eS.Fecha;
                       eSDto.HoraIni = (eS.Fecha.TimeOfDay).ToString();
                   }
                   else 
                   {
                       eSDto.FechaFin = eS.Fecha;
                       eSDto.HoraFin = (eS.Fecha.TimeOfDay).ToString();
                       eSDto.Tiempo =Convert.ToInt32((eSDto.FechaFin - eSDto.Fecha).TotalMinutes);
                       eSDto.Coleo =(eSDto.Tiempo - Convert.ToInt32(ruta.TiempoRecorrido.Value));
                       lEsDto.Add(eSDto);

                       eSDto = new entradassalidasDTO();
                   }                                     
               }

               return lEsDto;
           } 
       }

       public List<puntoscontrolDTO> getPuntosControl(DateTime fecha, string placa,
           TimeSpan horaIni,TimeSpan horaFin)//Fecha inicio... Fecha Fin
       {
           fecha = fecha.Date+horaIni;
           DateTime fechaFin = fecha.Date+horaFin;

           List<puntoscontrolDTO> lPctr = new List<puntoscontrolDTO>();
           puntoscontrolDTO pCtr;

           using(ctx=new tvEntities()){
               List<historialmovimiento> lHm = ctx.historialmovimiento.OrderBy(t=>t.Fecha).Where(t => t.Fecha >= fecha && t.Fecha <= fechaFin && 
                   t.Placa == placa && t.puntoscontrol != null).ToList();

               foreach (historialmovimiento hM in lHm)
               {
                   pCtr = new puntoscontrolDTO();
                   pCtr.Nombre = hM.puntoscontrol.Nombre;
                   pCtr.Time = (hM.Fecha.TimeOfDay).ToString();
                   lPctr.Add(pCtr);
               }

               return lPctr;
           }
       }

    }
}
