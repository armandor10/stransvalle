﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entidades
{
    public class usuariosplataformaDto
    {
        public int id { get; set; }
        public Nullable<int> Roll { get; set; }
        public string Contraseña { get; set; }

        public string NombreRoll { get; set; }
    }
}
