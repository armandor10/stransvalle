using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Entidades;
using DAL;
using AutoMapper;

namespace BLL
{
    public class mEmpresa
    {
        tvEntities ctx;
        public mEmpresa() { 
            Mapper.CreateMap<empresa,empresaDTO>();
        }

        public empresaDTO get() {
            using(ctx=new tvEntities()){
                empresaDTO empDto = new empresaDTO();
                empresa emp = ctx.empresa.FirstOrDefault();
                Mapper.Map(emp,empDto);
                return empDto;
            }            
        }

    }
}
