using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ShortURLs
{
    public class Details
    {
        public class Query : IRequest<Result<ShortURLDto>>
        {
            public int Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<ShortURLDto>>
        {
            private readonly ApplicationDbContext _context;
            private readonly IMapper _mapper;
            public Handler(ApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<ShortURLDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var shortUrlDto = await _context.ShortURLs
                    .ProjectTo<ShortURLDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);
                
                return Result<ShortURLDto>.Success(shortUrlDto);
            }
        }
    }
}
