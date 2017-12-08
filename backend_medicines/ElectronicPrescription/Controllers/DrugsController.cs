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
    [Route("api/Drugs")]
    public class DrugsController : Controller
    {
        private readonly ElectronicPrescriptionContext _context;

        public DrugsController(ElectronicPrescriptionContext context)
        {
            _context = context;
        }

        // GET: api/Drugs or api/Drugs/?name={name}
        [AllowAnonymous]
        [HttpGet]
        public IEnumerable<DrugDTO> GetDrug([FromQuery]string name)
        {
            var drugs = from d in _context.Drug
                        select new DrugDTO()
                        {
                            DrugId = d.DrugId,
                            Name = d.Name
                        };

            if (name != null)
            {
                if (name.StartsWith('"') && name.EndsWith('"'))
                {
                    name = name.Substring(1, name.Length - 2);
                }
                drugs = drugs.Where(d => d.Name == name);
            }

            return drugs;
        }

        // GET: api/Drugs/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDrug([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var drug = await _context.Drug.Select(d =>
                        new DrugDTO()
                        {
                            DrugId = d.DrugId,
                            Name = d.Name
                        }).SingleOrDefaultAsync(d => d.DrugId == id);

            if (drug == null)
            {
                return NotFound();
            }

            return Ok(drug);
        }

        // GET: api/Drugs/5/Medicines
        [AllowAnonymous]
        [HttpGet("{id}/Medicines")]
        public async Task<IActionResult> GetMedicinesByDrug([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var drugs = await _context.Drug.Include(d => d.Medicine).SingleOrDefaultAsync(d => d.DrugId == id);

            if (drugs == null)
            {
                return NotFound();
            }

            var medicines = drugs.Medicine.Select(m =>
                new MedicineDTO()
                {
                    MedicineId = m.MedicineId,
                    Name = m.Name
                }
            );

            return Ok(medicines);
        }

        // GET: api/Drugs/5/Presentations
        [AllowAnonymous]
        [HttpGet("{id}/Presentations")]
        public async Task<IActionResult> GetPresentationsByDrug([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var drugs = await _context.Drug.Include(d => d.Presentation).SingleOrDefaultAsync(d => d.DrugId == id);

            if (drugs == null)
            {
                return NotFound();
            }

            var presentations = drugs.Presentation.Select(ps =>
                new DrugPresentationDTO()
                {
                    PresentationId = ps.PresentationId
                }
            );

            return Ok(presentations);
        }

        // GET: api/Drugs/5/posologies
        [AllowAnonymous]
        [HttpGet("{id}/Posologies")]
        public async Task<IActionResult> GetPosologiesByDrug([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var drug = await _context.Drug.Include(d => d.Presentation)
                           .ThenInclude(pr => pr.PackageLeaflet).ThenInclude(pk => pk.GenericPosology)
                           .SingleOrDefaultAsync(d => d.DrugId == id);


            if (drug == null)
            {
                return NotFound();
            }

            // return a list of Posologies DTOs
            var posologies = drug.Presentation.SelectMany(pr =>
                             pr.PackageLeaflet.Select(pk =>
                                pk.GenericPosology)).Select(ps =>
                                new PosologyDTO()
                                {
                                    PosologyId = ps.PosologyId,
                                    Quantity = ps.Quantity,
                                    Technique = ps.Technique,
                                    Interval = ps.Interval,
                                    Period = ps.Period
                                });

            return Ok(posologies);
        }

        // PUT: api/Drugs/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDrug([FromRoute] int id, [FromBody] Drug drug)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != drug.DrugId)
            {
                return BadRequest();
            }

            _context.Entry(drug).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DrugExists(id))
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

        // POST: api/Drugs
        [HttpPost]
        public async Task<IActionResult> PostDrug([FromBody] Drug drug)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Drug.Add(drug);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDrug", new { id = drug.DrugId }, drug);
        }

        // DELETE: api/Drugs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDrug([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var drug = await _context.Drug.SingleOrDefaultAsync(m => m.DrugId == id);
            if (drug == null)
            {
                return NotFound();
            }

            _context.Drug.Remove(drug);
            await _context.SaveChangesAsync();

            return Ok(drug);
        }

        private bool DrugExists(int id)
        {
            return _context.Drug.Any(e => e.DrugId == id);
        }
    }
}