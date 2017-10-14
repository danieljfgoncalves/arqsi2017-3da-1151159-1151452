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
    [Route("api/Medicines")]
    public class MedicinesController : Controller
    {
        private readonly ElectronicPrescriptionContext _context;

        public MedicinesController(ElectronicPrescriptionContext context)
        {
            _context = context;
        }

        // GET: api/Medicines or api/Medicines/?name={name}
        [HttpGet]
        public IEnumerable<MedicineDTO> GetMedicine([FromQuery] string name = "")
        {
            var medicines = from m in _context.Medicine
                        select new MedicineDTO()
                        {
                            MedicineId = m.MedicineId,
                            Name = m.Name
                        };

            if (!name.Equals(""))
            {
                if (name.StartsWith('"') && name.EndsWith('"'))
                {
                    name = name.Substring(1, name.Length - 2);
                }
                medicines = medicines.Where(d => d.Name == name);
            }

            return medicines;
        }

        // GET: api/Medicines/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMedicine([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medicine = await _context.Medicine.Select(md => 
                            new MedicineDTO()
                            {
                                MedicineId = md.MedicineId,
                                Name = md.Name
                            }).SingleOrDefaultAsync(m => m.MedicineId == id);

            if (medicine == null)
            {
                return NotFound();
            }

            return Ok(medicine);
        }

        // GET: api/Medicines/5/presentations
        [HttpGet("{id}/Presentations")]
        public async Task<IActionResult> GetPresentationsByMedicine([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medicine = await _context.Medicine.Include(m => m.Presentation).SingleOrDefaultAsync(m => m.MedicineId == id);

            if (medicine == null)
            {
                return NotFound();
            }

            var presentations = medicine.Presentation.Select(ps =>
            new MedicinePresentationDTO()
            {
                PresentationId = ps.PresentationId
            });

            return Ok(presentations);
        }

        // GET: api/Medicines/5/posologies
        [HttpGet("{id}/Posologies")]
        public async Task<IActionResult> GetPosologiesByMedicine([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medicine = await _context.Medicine.Include(m => m.Presentation)
                           .ThenInclude(p => p.PackageLeaflet).ThenInclude(pk => pk.GenericPosology)
                           .SingleOrDefaultAsync(m => m.MedicineId == id);
                           

            if (medicine == null)
            {
                return NotFound();
            }

            // return a list of Posologies DTOs
            var posologies = medicine.Presentation.SelectMany(pr =>
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

        // PUT: api/Medicines/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedicine([FromRoute] int id, [FromBody] Medicine medicine)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != medicine.MedicineId)
            {
                return BadRequest();
            }

            _context.Entry(medicine).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedicineExists(id))
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

        // POST: api/Medicines
        [HttpPost]
        public async Task<IActionResult> PostMedicine([FromBody] Medicine medicine)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Medicine.Add(medicine);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMedicine", new { id = medicine.MedicineId }, medicine);
        }

        // DELETE: api/Medicines/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedicine([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medicine = await _context.Medicine.SingleOrDefaultAsync(m => m.MedicineId == id);
            if (medicine == null)
            {
                return NotFound();
            }

            _context.Medicine.Remove(medicine);
            await _context.SaveChangesAsync();

            return Ok(medicine);
        }

        private bool MedicineExists(int id)
        {
            return _context.Medicine.Any(e => e.MedicineId == id);
        }
    }
}