using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ElectronicPrescription.Models;
using ElectronicPrescription.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace ElectronicPrescription.Controllers
{
    [Authorize(AuthenticationSchemes = "Bearer")]
    [Produces("application/json")]
    [Route("api/Presentations")]
    public class PresentationsController : Controller
    {
        private readonly ElectronicPrescriptionContext _context;

        public PresentationsController(ElectronicPrescriptionContext context)
        {
            _context = context;
        }

        // GET: api/Presentations
        [AllowAnonymous]
        [HttpGet]
        public IEnumerable<PresentationDTO> GetPresentation()
        {

            var presentations = from p in _context.Presentation
                                    .Include(pr => pr.PackageLeaflet)
                                    .ThenInclude(pk => pk.GenericPosology)
                                select new PresentationDTO()
                                {
                                    PresentationId = p.PresentationId,
                                    Form = p.Form,
                                    Concentration = p.Concentration,
                                    Quantity = p.Quantity,
                                    Drug = 
                                        new DrugDTO()
                                        {
                                            DrugId = p.Drug.DrugId,
                                            Name = p.Drug.Name
                                        },
                                    Medicines = p.Drug.Medicine.Select(m => 
                                        new MedicineDTO()
                                        {
                                            MedicineId = m.MedicineId,
                                            Name = m.Name
                                        }),
                                    Posologies = p.Drug.Presentation.SelectMany(pr =>
                                        pr.PackageLeaflet.Select(pk =>
                                        pk.GenericPosology)).Select(ps =>
                                        new PosologyDTO()
                                        {
                                            PosologyId = ps.PosologyId,
                                            Quantity = ps.Quantity,
                                            Technique = ps.Technique,
                                            Interval = ps.Interval,
                                            Period = ps.Period
                                        })
                                };

            return presentations;
        }

        // GET: api/Presentations/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPresentation([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var presentation = await _context.Presentation
                                .Select(p =>
                                 new PresentationDTO()
                                {
                                    PresentationId = p.PresentationId,
                                    Form = p.Form,
                                    Concentration = p.Concentration,
                                    Quantity = p.Quantity,
                                    Drug =
                                        new DrugDTO()
                                        {
                                            DrugId = p.Drug.DrugId,
                                            Name = p.Drug.Name
                                        },
                                    Medicines = p.Drug.Medicine.Select(m =>
                                        new MedicineDTO()
                                        {
                                            MedicineId = m.MedicineId,
                                            Name = m.Name
                                        }),
                                    Posologies = p.Drug.Presentation.SelectMany(pr =>
                                        pr.PackageLeaflet.Select(pk =>
                                        pk.GenericPosology)).Select(ps =>
                                        new PosologyDTO()
                                        {
                                            PosologyId = ps.PosologyId,
                                            Quantity = ps.Quantity,
                                            Technique = ps.Technique,
                                            Interval = ps.Interval,
                                            Period = ps.Period
                                        })
                                })
                                .SingleOrDefaultAsync(p => p.PresentationId == id);

            if (presentation == null)
            {
                return NotFound();
            }

            return Ok(presentation);
        }

        // PUT: api/Presentations/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPresentation([FromRoute] int id, [FromBody] Presentation presentation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != presentation.PresentationId)
            {
                return BadRequest();
            }

            _context.Entry(presentation).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PresentationExists(id))
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

        // POST: api/Presentations
        [HttpPost]
        public async Task<IActionResult> PostPresentation([FromBody] Presentation presentation)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Presentation.Add(presentation);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PresentationExists(presentation.PresentationId))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPresentation", new { id = presentation.PresentationId }, presentation);
        }

        // DELETE: api/Presentations/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePresentation([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var presentation = await _context.Presentation.SingleOrDefaultAsync(m => m.PresentationId == id);
            if (presentation == null)
            {
                return NotFound();
            }

            _context.Presentation.Remove(presentation);
            await _context.SaveChangesAsync();

            return Ok(presentation);
        }

        private bool PresentationExists(int id)
        {
            return _context.Presentation.Any(e => e.PresentationId == id);
        }
    }
}