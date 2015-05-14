using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    public class documentosbusDTO
    {
        public int id { get; set; }
        public Nullable<int> documento { get; set; }
        public string placa { get; set; }
        public string Numero { get; set; }
        public Nullable<System.DateTime> fechaExpedicion { get; set; }
        public Nullable<System.DateTime> fechaExpiracion { get; set; }
    }
}
