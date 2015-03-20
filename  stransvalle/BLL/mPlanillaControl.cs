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
  public  class mPlanillaControl
    {

      tvEntities ctx;

      public mPlanillaControl(){
          Mapper.CreateMap<planillacontrol, planillacontrolDTO>();
          Mapper.CreateMap<planillacontrolDTO, planillacontrol>();
          Mapper.CreateMap<detallesplanilla,detallesplanillaDTO>()
               .ForMember(dest => dest.Vial, opt => opt.MapFrom(src => src.buses.Vial));
          Mapper.CreateMap<detallesplanillaDTO, detallesplanilla>();
          Mapper.CreateMap<rutas, rutasDto>();

      }

    private  int[,] mesTurno = {   
                                  { 1,	2,	3,	4,	5,	6,	7,	8,	9,	10,	11,	12,	13,	14 }, 
                                  { 2,	1,	4,	3,	6,	5,	8,	7,	10,	9,	12,	11,	14,	13 }, 
                                  { 3,	4,	5,	6,	7,	8,	9,	10,	11,	12,	13,	14,	1,	2  },
                                  { 4,	3,	6,	5,	8,	7,	10,	9,	12,	11,	12,	8,	2,	1  },
                                  { 5,	6,	7,	8,	9,	10,	11,	12,	13,	14,	1,	2,	3,	4  },
                                  { 6,	5,	8,	7,	10,	9,	12,	11,	14,	13,	2,	1,	4,	3  },
                                  { 7,	8,	9,	10,	11,	12,	13,	14,	1,	2,	3,	4,	5,	6  },
                                  { 8,	7,	10,	9,	12,	11,	14,	13,	2,	1,	4,	3,	6,	5  },
                                  { 9,	10,	11,	12,	13,	14,	1,	2,	3,	4,	5,	6,	7,	8  },
                                  { 10,	9,	12,	11,	14,	13,	2,	1,	4,	3,	6,	5,	8,	7  },
                                  { 11,	12,	13,	14,	1,	2,	3,	4,	5,	6,	7,	8,	9,	10 }, 
                                  { 12,	11,	14,	13,	2,	1,	4,	3,	6,	5,	8,	7,	10,	9  },
                                  { 13,	14,	1,	2,	3,	4,	5,	6,	7,	8,	9,	10,	11,	12 },
                                  { 14,	13,	2,	1,	4,	3,	6,	5,	8,	7,	10,	9,	12,	11 } 
                               };
    private int[,] dia = {   
                             {1,  2,  3,  4,  5,  6,  7,  8,  9,  10, 11, 12, 13, 14},
                             {14, 3,  2,  5,  4,  7,  6,  9,  8,  11, 10, 13, 12, 1},
                             {3,  14, 5,  2,  7,  4,  9,  6,  11, 8,  13, 10, 1,  12},
                             {12, 5,  14, 7,  2,  9,  4,  11, 6,  13, 8,  1,  10, 3},
                             {5,  12, 7,  14, 9,  2,  11, 4,  13, 6,  1,  8,  3,  10},
                             {10, 7,  12, 9,  14, 11, 2,  13, 4,  1,  6,  3,  8,  5},
                             {7,  10, 9,  12, 11, 14, 13, 2,  1,  4,  3,  6,  5,  8},
                             {8,  9,  10, 11, 12, 13, 14, 1,  2,  3,  4,  5,  6,  7},
                             {9,  8,  11, 10, 13, 12, 1,  14, 3,  2,  5,  4,  7,  6},
                             {6,  11, 8,  13, 10, 1,  12, 3,  14, 5,  2,  7,  4,  9},
                             {11, 6,  13, 8,  1,  10, 3,  12, 5,  14, 7,  2,  9,  4},
                             {4,  13, 6,  1,  8,  3,  10, 5,  12, 7,  14, 9,  2,  11},
                             {13, 4,  1,  6,  3,  8,  5,  10, 7,  12, 9,  14, 11, 2},
                             {2,  1,  4,  3,  6,  5,  8,  7,  10, 9,  12, 11, 14, 13}
                         };
          
      public List<List<Entidades.detallesplanillaDTO>> getRotacionBuses(int mes, int grupo) {

        using(ctx=new tvEntities()){
            DateTime fchaI = new DateTime(DateTime.Now.Year, mes, 1);
            int diasMes = DateTime.DaysInMonth(fchaI.Year, fchaI.Month);
            DateTime fchaF = new DateTime(DateTime.Now.Year, mes, diasMes);           

            //planillacontrol pC ;//= ctx.planillacontrol.Where(t => t.Fecha >= fchaI && t.Fecha<=fchaF).FirstOrDefault();
            List<planillacontrol> lpC = ctx.planillacontrol.OrderBy(t=> t.id) .Where(t => t.Fecha >= fchaI && t.Fecha <= fchaF && t.Grupo==grupo).ToList();
                        
            if (lpC.Count<1)
            {
                List<rutagrupo> lrGrupo = ctx.rutagrupo.Where(t => t.Grupo == grupo).ToList();
                if (lrGrupo.Count==0) 
                {
                    return null;
                } 
                else 
                {
                    string[] nBus = new string[30];
                    int i = 1;
                    List<buses> lBus = ctx.buses.Where(t => t.Grupo == grupo).ToList();
                    foreach (buses bus in lBus)
                    {
                        nBus[i] = bus.Vial;
                        i++;
                    }

                    return crearRotacionesBuses(ref nBus,ref mes,ref fchaI,
                                                ref grupo,ref lrGrupo,
                                                ref lBus);
                }               
               
            }
            else 
            {
                List<List<Entidades.detallesplanillaDTO>> llDpDTO = new List<List<detallesplanillaDTO>>();
                List<detallesplanillaDTO> lDpDTO ;
                List<detallesplanilla> lDp;

                foreach (planillacontrol pC in lpC)
                {
                    lDp = ctx.detallesplanilla.OrderBy(t=>t.id).Where(t => t.idPlanillaControl == pC.id).ToList();
                    lDpDTO = new List<detallesplanillaDTO>();
                    Mapper.Map(lDp, lDpDTO);
                    llDpDTO.Add(lDpDTO);                  
                }
                return llDpDTO;// Por ahora
            }
        }
    }

      public objRes update(List<detallesplanillaDTO> lDpDTO)
      {
          using (ctx = new tvEntities())
          {
              objRes Respuesta = new objRes();
              detallesplanilla dp;
              buses bus;

              try
              {
                  foreach (detallesplanillaDTO DpDTO in lDpDTO)
                  {
                      bus = ctx.buses.Where(t => t.Vial == DpDTO.Vial).FirstOrDefault();
                      dp = ctx.detallesplanilla.Where(t => t.id == DpDTO.id).FirstOrDefault();
                      dp.PlacaBus = bus.Placa;
                      ctx.SaveChanges();
                                            
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

      private List<List<detallesplanillaDTO>> crearRotacionesBuses(ref string[] nBus,ref int mes,ref DateTime fcha,
                                                                 ref int grupo,ref List<rutagrupo> lrGrupo,
                                                                 ref List<buses> lBus)
    {
        planillacontrol pC;

        int diasMes = DateTime.DaysInMonth(fcha.Year, fcha.Month);
        int d = 1;
        int k=1;
        int daysToToday;

        daysToToday = Convert.ToInt32((fcha - (new DateTime(DateTime.Now.Year, 1, 1))).TotalDays);
        string[] mBus = new string[30];
        List<List<detallesplanillaDTO>> lldP = new List<List<detallesplanillaDTO>>();

        for (int i = 1; i <= mesTurno.GetLength(1); i++)
        {
            mBus[i] = nBus[mesTurno[mes - 1, i - 1]];
        }

        for (int i = 0; i < dia.GetLength(0); i++)
        {
            if (diasMes == lldP.Count)
            {
                break;
            }

            List<detallesplanillaDTO> ldP = new List<detallesplanillaDTO>();
            for (int j = 0; j < dia.GetLength(1); j++)
            {
                detallesplanillaDTO dP = new detallesplanillaDTO();
                dP.Vial = mBus[dia[i, j]];
                dP.PlacaBus = lBus.Find(t => t.Vial == dP.Vial).Placa;                
                ldP.Add(dP);
                k++;

            }

            if (i == dia.GetLength(0) - 1)
            {
                i = 0;
            }


            lldP.Add(ldP);

            /////////////// Rutas para cada dia //////////////////
            //En el primer objeto de la lista de detallesplanilla            
            if ((lldP.Count + daysToToday) % 2 == 0)
            {
                ldP.ElementAt(0).Ruta = lrGrupo.ElementAt(0).Ruta;
            }
            else
            {
                try
                {
                    ldP.ElementAt(0).Ruta = lrGrupo.ElementAt(1).Ruta;
                }
                catch (ArgumentOutOfRangeException e)
                {
                    ldP.ElementAt(0).Ruta = lrGrupo.ElementAt(0).Ruta;
                }
            }
            /////////////////////////////////////////////////////          
        }
     
        ///Guardar Detalles de Planilla (Rotaciones del mes)
        ///
        using (ctx=new tvEntities()){
            
            foreach (List<detallesplanillaDTO> lDp in lldP)
            {
                ////Creo una nueva Planilla control
                pC = new planillacontrol();
                pC.Fecha = new DateTime(DateTime.Now.Year,mes,d);
                pC.Grupo = grupo;
                ctx.planillacontrol.Add(pC);
                ctx.SaveChanges();
                d++;

                foreach (detallesplanillaDTO DpDTO in lDp)
                {
                    DpDTO.idPlanillaControl = pC.id;
                    DpDTO.Ruta = lDp.ElementAt(0).Ruta;
                    detallesplanilla dP = new detallesplanilla();
                    Mapper.Map(DpDTO, dP);
                    ctx.detallesplanilla.Add(dP);
                    ctx.SaveChanges();
                    DpDTO.id = dP.id;
                }
            }
            
        }
        ////////////////////////////////
        

        return lldP;
       
       
    }


    }
}
