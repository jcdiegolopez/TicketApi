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

        [RegularExpression("^(pendiente|en proceso|resuelto)$", ErrorMessage = "El estado debe ser 'pendiente', 'en proceso' o 'resuelto'.")]
        public string status { get; set; }

        public DateTime created_at { get; set; } = DateTime.UtcNow;
    }

    public class IncidentDto
    {
        public string report { get; set; }
        public string description { get; set; }

        [RegularExpression("^(pendiente|en proceso|resuelto)$", ErrorMessage = "El estado debe ser 'pendiente', 'en proceso' o 'resuelto'.")]
        public string status { get; set; }
    }

    public class UpdateStatusDto
    {
        [RegularExpression("^(pendiente|en proceso|resuelto)$", ErrorMessage = "El estado debe ser 'pendiente', 'en proceso' o 'resuelto'.")]
        public string status { get; set; }
    }

}
