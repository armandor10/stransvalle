using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Entidades;
using BLL;

namespace UnitTest
{
    [TestClass]
    public class tRecorridos
    {
        [TestMethod]
        public void getDetallesRecorridos()
        {
            mRecorridos lg = new mRecorridos();
            List<entradassalidasDTO> lEs = lg.getDetallesRecorridos(new DateTime(2014, 8, 5), 5,"TLU 107");
            Assert.IsNotNull(lEs);
        }
    }
}
