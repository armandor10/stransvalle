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
    public class tBuses
    {
        [TestMethod]
        public void SingIn()
        {
            mBuses lg = new mBuses();
            char esperado = lg.SingIn("TLU 10","1234");
            Assert.AreEqual('N',esperado);
        }
    }
}
