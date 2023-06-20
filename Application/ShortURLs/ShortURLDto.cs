using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.ShortURLs
{
    public class ShortURLDto
    {
        public int Id { get; set; }
        public string ShortenedURL { get; set; }
        public string DestinationURL { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}
