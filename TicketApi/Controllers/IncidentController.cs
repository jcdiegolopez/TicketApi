using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TicketApi.Models;

namespace TicketApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class IncidentController : Controller
    {
        private static List<Incident> _incidents = new List<Incident>
        {
            new Incident
            {
                id = 1,
                reportar = "Juan",
                description = "Servidor no responde",
                status = "abierto",
                created_at = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")
            },
            new Incident
            {
                id = 2,
                reportar = "Maria",
                description = "Impresora sin papel",
                status = "cerrado",
                created_at = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")
            }
        };

        //GET: Incident
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_incidents);
        }

        //POST: Incident
        [HttpPost]
        public IActionResult Create([FromBody] IncidentCreateDto dto)
        {
            var newIncident = new Incident
            {
                id = _incidents.Count + 1,
                reportar = dto.reportar,
                description = dto.description,
                status = dto.status,
                created_at = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")
            };

            _incidents.Add(newIncident);

            return Ok(new
            {
                message = "Incidente creado exitosamente",
                data = newIncident
            });
        }

    }
}
