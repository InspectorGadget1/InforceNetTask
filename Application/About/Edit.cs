using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.About
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public AboutDescription AboutDescription { get; set; }
        }
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly ApplicationDbContext _context;
            public Handler(ApplicationDbContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var aboutDescription = await _context.AboutDescriptions.FindAsync(request.AboutDescription.Id);

                if (aboutDescription == null) return null;
                aboutDescription.Description = request.AboutDescription.Description;
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Unit>.Failure("Failed to update description");
                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}
