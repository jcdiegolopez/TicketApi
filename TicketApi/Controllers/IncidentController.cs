using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TicketApi.Data;
using TicketApi.Models;

namespace TicketApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IncidentsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public IncidentsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/incidents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Incident>>> GetIncidents()
        {
            var incidents = await _context.Incidents.ToListAsync();

            if (incidents.Count == 0)
            {
                return NotFound(new { message = "No se encontraron incidentes registrados." });
            }

            return Ok(incidents);
        }

        // GET: api/incidents/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Incident>> GetIncident(int id)
        {
            var incident = await _context.Incidents.FindAsync(id);

            if (incident == null)
            {
                return NotFound(new { message = $"No se encontró un incidente con el ID {id}." });
            }

            return Ok(incident);
        }

        // POST: api/incidents
        [HttpPost]
        public async Task<ActionResult<Incident>> CreateIncident(IncidentDto incidentDto)
        {
            var newIncident = new Incident
            {
                report = incidentDto.report,
                description = incidentDto.description,
                status = incidentDto.status,
                created_at = DateTime.UtcNow
            };

            _context.Incidents.Add(newIncident);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetIncident), new { id = newIncident.id }, new
            {
                message = "Incidente creado exitosamente.",
                incident = newIncident
            });
        }

        // PUT: api/incidents/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateIncident(int id, UpdateStatusDto updateStatusDto)
        {
            var existingIncident = await _context.Incidents.FindAsync(id);
            if (existingIncident == null)
            {
                return NotFound(new { message = $"No se encontró un incidente con el ID {id}." });
            }

            existingIncident.status = updateStatusDto.status;

            _context.Entry(existingIncident).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { message = "Incidente actualizado exitosamente." });
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, new { message = "Ocurrió un error al actualizar el incidente." });
            }
        }

        // DELETE: api/incidents/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIncident(int id)
        {
            var incident = await _context.Incidents.FindAsync(id);
            if (incident == null)
            {
                return NotFound(new { message = $"No se encontró un incidente con el ID {id}." });
            }

            _context.Incidents.Remove(incident);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Incidente eliminado exitosamente." });
        }
    }
}
