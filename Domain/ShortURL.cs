﻿using System.ComponentModel.DataAnnotations.Schema;

namespace Domain
{
    public class ShortURL
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string ShortenedURL { get; set; }
        public string DestinationURL { get; set; }
        public DateTime CreatedDate { get; set; }

        [ForeignKey("CreatedById")]
        public ApplicationUser CreatedBy { get; set; }
        public string CreatedById { get; set; }
    }
}