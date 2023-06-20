using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.ShortURLs
{
    public class List
    {
        public class Query : IRequest<Result<List<ShortURLDto>>> { }

        public class Handler : IRequestHandler<Query, Result<List<ShortURLDto>>>
        {
            private readonly ApplicationDbContext _context;
            private readonly IMapper _mapper;

            public Handler(ApplicationDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<ShortURLDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var shortURLs = await _context.ShortURLs
                    .ProjectTo<ShortURLDto>(_mapper.ConfigurationProvider).ToListAsync(cancellationToken);

                return Result<List<ShortURLDto>>.Success(shortURLs);
            }
        }
    }
}
