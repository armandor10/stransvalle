using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades.Geometria
{
    public class pl_recta
    {
        public double m { get; set; }
        public double b { get; set; }

        public pl_recta(double m, double b)
        {
            this.m = m;
            this.b = b;
        }
        public pl_recta(pl_punto punto, double m)
        {
            this.m = m;
            this.b = punto.y - m * punto.x;
        }
        public pl_recta(pl_punto punto1, pl_punto punto2)
        {
            this.m = (punto2.y - punto1.y)/(punto2.x - punto1.x);
            this.b = punto1.y - this.m * punto1.x;
        }
    }
}
