using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entidades;
using BLL;

namespace UnitTest
{
    [TestClass]
    public class tHorario
    {
        [TestMethod]
        public void getHorario()
        {
            mHorario lg = new mHorario();
            List<horarioDTO> lHor = lg.get("ruta 12");
            Assert.IsNotNull(lHor);
        }
       
    }
}
