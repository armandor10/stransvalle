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
    public class tPlanillaRecaudo
    {
        [TestMethod]
        public void getPlanillaRecaudo()
        {
            mPlanillaRecaudo lg = new mPlanillaRecaudo();
            List<planillarecaudoDTO> lPlaRec = lg.get(new DateTime(2015, 1, 2), 4);
            Assert.IsNotNull(lPlaRec);
        }
    }
}
