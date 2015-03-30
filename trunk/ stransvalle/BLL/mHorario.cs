using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entidades;
using DAL;

namespace BLL
{
   public class mHorario
    {
       tvEntities ctx;

       public List<horarioDTO> get(string nomRuta) {
           List<horarioDTO> lHor;
           horarioDTO horDTO;
           System.TimeSpan time;

           using (ctx = new tvEntities()) {
               rutas ruta ;
               horario hor ;

               if (nomRuta.ToUpper() == "RUTA 8" || nomRuta.ToUpper() == "RUTA 12" || nomRuta.ToUpper() == "RUTA 18T")
               {
                   ruta = ctx.rutas.Where(t => t.NomRuta == nomRuta).FirstOrDefault();
                   hor = ctx.horario.Where(t => t.id == ruta.idHorario).FirstOrDefault();
                   lHor = new List<horarioDTO>();

                   createListaHor(ref lHor, ruta, hor);

                   return lHor;
               }
               else 
               {
                   if (nomRuta.ToUpper() == "RUTA 10A" || nomRuta.ToUpper() == "RUTA 10B") 
                   {
                        ruta = ctx.rutas.Where(t => t.NomRuta == "Ruta 10A").FirstOrDefault();
                        hor = ctx.horario.Where(t => t.id == ruta.idHorario).FirstOrDefault();
                        lHor = new List<horarioDTO>();

                        createListaHor(ref lHor, ruta, hor);

                       ruta = ctx.rutas.Where(t => t.NomRuta == "Ruta 10B").FirstOrDefault();
                       hor = ctx.horario.Where(t => t.id == ruta.idHorario).FirstOrDefault();

                       createListaHor(ref lHor, ruta, hor);

                       return lHor;
                   } 
                   else 
                   {
                       return null;
                   }
                   
               }

           }                  
       }

       public List<List<horarioDTO>> getHorarioPlanilla(string nomRuta,DateTime fecha,int grupo) {
           List<List<horarioDTO>> llHorDTO = new List<List<horarioDTO>>();
           List<horarioDTO> lHorDTO = new List<horarioDTO>();
           horarioDTO horDTO=new horarioDTO();
           TimeSpan extra;
           int cap = 0;

           using (ctx = new tvEntities()) {
               rutas ruta = ctx.rutas.Where(t => t.NomRuta == nomRuta).FirstOrDefault();
               horario Hor=ctx.horario.Where(t=>t.id==ruta.idHorario).FirstOrDefault();
               planillacontrol pC=ctx.planillacontrol.Where(t=>t.Fecha==fecha && t.Grupo==grupo).FirstOrDefault();              
               cap=ctx.detallesplanilla.Where(t=>t.Ruta==nomRuta && t.idPlanillaControl==pC.id ).Count();

               if (ruta!=null||Hor !=null||pC!=null||cap!=0)
               {
                   ruta.Capacidad = cap;/// capacidad del Bus
               
               for (int i = 1; i <= ruta.NumeroRecorridos; i++) {
                   createListaHor(ref lHorDTO, ruta, Hor);

                   if (nomRuta.ToUpper() != "RUTA 10B")
                   {
                       if (i % 2 == 0 && i != 1)
                       {
                           extra = new TimeSpan(0, 8, 0);
                       }
                       else
                       {
                           extra = new TimeSpan(0, 0, 0);
                       }
                   }
                   else
                   {
                       if (nomRuta.ToUpper() == "RUTA 8" || nomRuta.ToUpper() == "RUTA 12" || nomRuta.ToUpper() == "RUTA 10A")
                       {
                           if (i % 2 == 0 && i != 1)
                           {
                               extra = new TimeSpan(0, 0, 0);
                           }
                           else
                           {
                               extra = new TimeSpan(0, 8, 0);
                           }
                       }
                       else
                       {
                           extra = new TimeSpan(0, 0, 0);
                       }
                   } 
                   
                   Hor.hora = lHorDTO.ElementAt(0).hora + new TimeSpan(0, ruta.TiempoRecorrido.Value, 0) + extra;
                   llHorDTO.Add(lHorDTO);
                   lHorDTO = new List<horarioDTO>();                                 
               }

               return llHorDTO; 
              
               }else{
                   return null;               
               }

               
           }
    
       }

       private void createListaHor(ref List<horarioDTO> lHor, rutas ruta, horario hor)
       {
          horarioDTO horDTO = new horarioDTO();
          System.TimeSpan time = hor.hora.Value;

           for (int i = 1; i <= ruta.Capacidad; i++)
           {
               horDTO.hora = time;
               horDTO.time = time.ToString();
               lHor.Add(horDTO);
               horDTO = new horarioDTO();
               time = time + new TimeSpan(0, ruta.Frecuencia.Value, 0);
           }
       }
    }
}
