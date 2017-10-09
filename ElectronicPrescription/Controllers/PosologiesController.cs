using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ElectronicPrescription.Models;
using ElectronicPrescription.DTOs;

namespace ElectronicPrescription.Controllers
{
    [Produces("application/json")]
    [Route("api/Posologies")]
    public class PosologiesController : Controller
    {
        private readonly ElectronicPrescriptionContext _context;

        public PosologiesController(ElectronicPrescriptionContext context)
        {
            _context = context;
        }

        // GET: api/Posologies
        [HttpGet]
        public IEnumerable<PosologyDTO> GetPosology()
        {
            var posologies = from p in _context.Posology
                        select new PosologyDTO()
                        {
                            PosologyId = p.PosologyId,
                            Quantity = p.Quantity,
                            Technique = p.Technique,
                            Interval = p.Interval,
                            Period = p.Period
                        };

            return posologies;
        }

        // GET: api/Posologies/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPosology([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var posology = await _context.Posology.Select(p =>
                            new PosologyDTO()
                            {
                                PosologyId = p.PosologyId,
                                Quantity = p.Quantity,
                                Technique = p.Technique,
                                Interval = p.Interval,
                                Period = p.Period
                            }).SingleOrDefaultAsync(p => p.PosologyId == id);

            if (posology == null)
            {
                return NotFound();
            }

            return Ok(posology);
        }

        // PUT: api/Posologies/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPosology([FromRoute] int id, [FromBody] Posology posology)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != posology.PosologyId)
            {
                return BadRequest();
            }

            _context.Entry(posology).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PosologyExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Posologies
        [HttpPost]
        public async Task<IActionResult> PostPosology([FromBody] Posology posology)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Posology.Add(posology);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPosology", new { id = posology.PosologyId }, posology);
        }

        // DELETE: api/Posologies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePosology([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var posology = await _context.Posology.SingleOrDefaultAsync(m => m.PosologyId == id);
            if (posology == null)
            {
                return NotFound();
            }

            _context.Posology.Remove(posology);
            await _context.SaveChangesAsync();

            return Ok(posology);
        }

        private bool PosologyExists(int id)
        {
            return _context.Posology.Any(e => e.PosologyId == id);
        }
    }
}