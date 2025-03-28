using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TicketApi.Models
{
    public class Incident
    {
        public int id { get; set; }
        public string reportar { get; set; }
        public string description { get; set; }
        public string status { get; set; }
        public string created_at { get; set; }
    }
}
