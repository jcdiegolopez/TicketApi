using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TicketApi.Models
{
    public class Incident
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int id { get; set; }

        public string report { get; set; }
        public string description { get; set; }
        public string status { get; set; }

        public DateTime created_at { get; set; } = DateTime.UtcNow;
    }

    public class IncidentDto
    {
        public string report { get; set; }
        public string description { get; set; }
        public string status { get; set; }
    }

}
