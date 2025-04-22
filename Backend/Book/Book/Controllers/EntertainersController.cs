using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Book.Models;            // your EF models namespace
using System.Linq;           // for LINQ
using System.Threading.Tasks;
using System.Collections.Generic;

namespace YourNamespace.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntertainersController : ControllerBase
    {
        private readonly EntertainmentAgencyExampleContext _context;
        public EntertainersController(EntertainmentAgencyExampleContext context)
            => _context = context;

        // DTO now uses DateTime? for LastBookingDate
      
     // At top of EntertainersController.cs:
public class EntertainerListItem
{
    public int EntertainerId { get; set; }
    public string? EntStageName { get; set; }
    public int     BookingsCount { get; set; }
    public DateTime? LastBookingDate { get; set; }
}

[HttpGet]
public async Task<ActionResult<IEnumerable<EntertainerListItem>>> GetEntertainers()
{
    var list = await _context.Entertainers
        .Select(e => new EntertainerListItem {
            EntertainerId   = e.EntertainerId,
            EntStageName    = e.EntStageName,
            BookingsCount   = _context.Engagements.Count(en => en.EntertainerId == e.EntertainerId),
            LastBookingDate = _context.Engagements
                                  .Where(en => en.EntertainerId == e.EntertainerId && en.StartDate.HasValue)
                                  .OrderByDescending(en => en.StartDate.Value)
                                  .Select(en => en.StartDate.Value.ToDateTime(new TimeOnly(0,0)))
                                  .FirstOrDefault()
        })
        .ToListAsync();

    return Ok(list);
}
// GET: api/entertainers/{id}
[HttpGet("{id}")]
public async Task<ActionResult<Entertainer>> GetEntertainer(int id)
{
    var ent = await _context.Entertainers.FindAsync(id);
    if (ent == null) return NotFound();
    return ent;    // <-- returns all columns automatically
}      // POST/PUT/DELETE unchanged…
    


        // POST, PUT, DELETE remain unchanged…
        [HttpPost]
        public async Task<ActionResult<Entertainer>> PostEntertainer(Entertainer entertainer)
        {
            _context.Entertainers.Add(entertainer);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEntertainer), new { id = entertainer.EntertainerId }, entertainer);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutEntertainer(int id, Entertainer entertainer)
        {
            if (id != entertainer.EntertainerId) return BadRequest();
            _context.Entry(entertainer).State = EntityState.Modified;

            try { await _context.SaveChangesAsync(); }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Entertainers.Any(e => e.EntertainerId == id))
                    return NotFound();
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEntertainer(int id)
        {
            var ent = await _context.Entertainers.FindAsync(id);
            if (ent == null) return NotFound();
            _context.Entertainers.Remove(ent);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
