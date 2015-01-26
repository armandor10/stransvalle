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
    public class mUsers
    {
        tvEntities ctx;
        public mUsers()
        {
            Mapper.CreateMap<usuariosplataforma, usuariosplataformaDto>()
                .ForMember(dest => dest.NombreRoll, opt => opt.MapFrom(src => src.rolesusuariosplataforma.Nombre));
            Mapper.CreateMap<usuariosplataformaDto, usuariosplataforma>();
        }

        public usuariosplataformaDto Login(string user, string password)
        {
            using (ctx = new tvEntities())
            {
                usuariosplataforma usuario = ctx.usuariosplataforma.Where(t => t.User == user && t.Contraseña == password).FirstOrDefault();
                if (usuario == null) return null;
                else
                {
                    usuariosplataformaDto rUsuario = new usuariosplataformaDto();
                    Mapper.Map(usuario, rUsuario);
                    return rUsuario;
                }
            }
        }
    }
}
