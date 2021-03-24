using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;

namespace EventApp.Entity
{
    public class EnrolledEvent
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int EventId { get; set; }
        [JsonIgnore]
        public User User { get; set; }
        [JsonIgnore]
        public Event Event { get; set; }
    }
}
