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
    public class tHistorialMovimiento
    {
        [TestMethod]
        public void insert() 
        {
            historialmovimientoDTO hMDto = new historialmovimientoDTO();
            hMDto.Latitud = "10.4485648";
            hMDto.Longitud = "-73.2487037";
            hMDto.Vial = "10038";
            hMDto.Velocidad = 12;

            mHistorialMovimiento lg = new mHistorialMovimiento();
            objRes res = lg.insert(hMDto);
            Assert.IsNotNull(res);
        }

        [TestMethod]
        public void get()
        {
            entradassalidasDTO eSDto = new entradassalidasDTO();
            eSDto.Fecha = new DateTime(2014,8,5,10,39,6);
            eSDto.FechaFin = new DateTime(2014, 8, 5, 12, 25, 29);
            eSDto.Placa = "TLU 107";

            mHistorialMovimiento lg = new mHistorialMovimiento();
            List<historialmovimientoDTO> lHmDto = lg.get(eSDto);

            Assert.IsNotNull(lHmDto);
        }

        [TestMethod]
        public void getDetallesRecorridos() 
        {
            mHistorialMovimiento lg = new mHistorialMovimiento();
            List<entradassalidasDTO> lEsDto = lg.getDetallesRecorridos((new DateTime(2014, 8, 5)), "10038");
            Assert.IsNotNull(lEsDto);
        }

        [TestMethod]
        public void getCoordTodayBuses() {
            mHistorialMovimiento lg = new mHistorialMovimiento();
            List<historialmovimientoDTO> lHmDto = lg.getCoordTodayBuses("Ruta 8");
            Assert.IsNotNull(lHmDto);
        }
    }
}
