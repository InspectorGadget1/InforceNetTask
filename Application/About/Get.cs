using Application.Core;
using Application.ShortURLs;
using AutoMapper;
using MediatR;
using Persistence;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Application.About
{
    public class Get
    {
        public class Query : IRequest<Result<AboutDescription>> { }
        public class Handler : IRequestHandler<Query, Result<AboutDescription>>
        {
            private readonly ApplicationDbContext _context;
            public Handler(ApplicationDbContext context, IMapper mapper)
            {
                _context = context;
            }

            public async Task<Result<AboutDescription>> Handle(Query request, CancellationToken cancellationToken)
            {
                var aboutDescription = await _context.AboutDescriptions.FirstOrDefaultAsync();

                return Result<AboutDescription>.Success(aboutDescription);
            }
        }
    }
}
