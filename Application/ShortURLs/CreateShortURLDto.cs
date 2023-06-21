using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ShortURLs
{
    public class CreateShortURLDto
    {
        public string DestinationURL { get; set; }
        public string CreatedBy { get; set; }
    }
}
