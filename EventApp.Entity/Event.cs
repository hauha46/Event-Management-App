using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace EventApp.Entity
{
    public class Event
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public DateTime PublishedDate { get; set; }
        public Boolean IsActive { get; set; }
        public DateTime DateCreated { get; set; }
        [JsonIgnore]
        public IList<EnrolledEvent> EnrolledEvents { get; set; } 
    }
}
