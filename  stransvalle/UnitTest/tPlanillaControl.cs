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
    public class tPlanillaControl
    {
        [TestMethod]
        public void getRotacionBuses()
        {
            mPlanillaControl lg = new mPlanillaControl();
            List<List<detallesplanillaDTO>> lldP=  lg.getRotacionBuses(1, 4);
            Assert.IsNotNull(lldP);
        }

        [TestMethod]
        public void daysBetweenDates() { 
            double days=59;
            double daysReal = ((new DateTime(DateTime.Now.Year, 3, 1)) - (new DateTime(DateTime.Now.Year, 1, 1))).TotalDays;
            Assert.AreEqual(days, daysReal);
        }
    }
}
