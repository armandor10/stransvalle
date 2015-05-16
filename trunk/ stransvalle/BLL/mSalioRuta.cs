using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Entidades;
using Entidades.Geometria;
using DAL;

namespace BLL
{
    public class mSalioRuta
    {
        tvEntities ctx;
        private List<pl_punto> lPuntosRuta { get; set; }
        private double mError { get; set; }
        public mSalioRuta()
        {
            // El contructor debe recibir lista de puntos de la ruta y el margen de error en Kilometros

            mError = 0.2;

            lPuntosRuta = new List<pl_punto>();

            pl_punto punto1 = new pl_punto();
            punto1.x = 1;
            punto1.y = 14;

            pl_punto punto2 = new pl_punto();
            punto2.x = 2;
            punto2.y = 9;

            pl_punto punto3 = new pl_punto();
            punto3.x = 5;
            punto3.y = 13;

            lPuntosRuta.Add(punto1);
            lPuntosRuta.Add(punto2);
            lPuntosRuta.Add(punto3);
        }
        public bool VerificarPuntoEnRuta(pl_punto pv)
        {
            bool ban = false;
            for (int i = 0; i < lPuntosRuta.Count() -1; i++)
            {
                pl_punto p1 = lPuntosRuta[i];           
                pl_punto p2 = lPuntosRuta[i+1];

                pl_recta recta = new pl_recta(p1, p2); // Recta que pasa por un tramo de la ruta

                double m2 = -(1 / recta.m);
                pl_recta perpendicular = new pl_recta(pv, m2); // Recta perpendicular a la recta anterior, que pasa por el punto a verificar

                pl_punto pc = new pl_punto();
                pc.x = (perpendicular.b - recta.b) / (recta.m - perpendicular.m);
                pc.y = recta.m * pc.x + recta.b;  // Punto en que se cortan las dos rectas

                if ((_entrePuntos(pc, p1, p2)) && (distanciaEntre(pc, pv) <= mError)) { 
                    ban = true;
                    i = lPuntosRuta.Count();
                }
            }
            return ban;
        }
        public bool _siDentroPunto(pl_punto pv, pl_punto p1)
        {

        }
        public bool _entrePuntos(pl_punto pv, pl_punto p1, pl_punto p2)
        {
            double dt = distanciaEntre(p2,p1); // Distancia Total
            double d1 = distanciaEntre(pv,p1); 
            double d2 = distanciaEntre(pv,p2); 
            if ((d1 + d2) == dt) return true;
            else return false;
        }
        public double distanciaEntre(pl_punto p1, pl_punto p2)
        {
            double d = Math.Sqrt(Math.Pow((p2.x - p1.x), 2) + Math.Pow((p2.y - p1.y), 2));
            return d;
        }
    }
}
