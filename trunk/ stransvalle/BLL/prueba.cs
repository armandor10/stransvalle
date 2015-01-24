using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;


namespace BLL
{
    public class prueba
    {
        public bool Get()
        {
            dbtransvalleEntities ctx = new dbtransvalleEntities();
            List<historialmovimiento> his = ctx.historialmovimiento.ToList();
            return true;
        }
    }
}
