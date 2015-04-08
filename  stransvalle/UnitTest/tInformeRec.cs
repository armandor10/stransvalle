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
    public class tInformeRec
    {
        [TestMethod]
        public void getInformeRec()
        {
            mRecorridos lg = new mRecorridos();
            List<detallesplanillaDTO> ldP = lg.getInformeRecorridos(new DateTime(2014, 8, 3), 5);
            Assert.IsNotNull(ldP);
        }
    }
}
