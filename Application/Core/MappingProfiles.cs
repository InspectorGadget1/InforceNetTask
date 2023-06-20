using Application.ShortURLs;
using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;


namespace Application.Core
{
    public class MappingProfiles: Profile
    {
        public MappingProfiles()
        {
            CreateMap<ShortURL, ShortURLDto>()
                .ForMember(j => j.Id, o => o.MapFrom(s => s.Id))
                .ForMember(j => j.ShortenedURL, o => o.MapFrom(s => "https://localhost:7019/" + s.ShortenedURL))
                .ForMember(j => j.DestinationURL, o => o.MapFrom(c => c.DestinationURL))
                .ForMember(j => j.CreatedBy, o => o.MapFrom(c => c.CreatedBy.UserName))
                .ForMember(j => j.CreatedDate, o => o.MapFrom(r => r.CreatedDate));
        }
    }
}
