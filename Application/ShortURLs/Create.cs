using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace Application.ShortURLs
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public CreateShortURLDto CreateShortURLDto { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly ApplicationDbContext _context;
            private readonly IUrlEncoder _urlEncoder;

            public Handler(ApplicationDbContext context, IUrlEncoder urlEncoder)
            {
                _context = context;
                _urlEncoder = urlEncoder;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var exist = await _context.ShortURLs.FirstOrDefaultAsync(x => x.DestinationURL == request.CreateShortURLDto.DestinationURL);
                if (exist != null) return Result<Unit>.Failure("Already exist");
                var newShortURL = new ShortURL
                {
                    ShortenedURL = _urlEncoder.Encode(request.CreateShortURLDto.DestinationURL),
                    DestinationURL = request.CreateShortURLDto.DestinationURL,
                    CreatedDate = DateTime.Now,
                };
                _context.ShortURLs.Add(newShortURL);
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to create ShortURL");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
