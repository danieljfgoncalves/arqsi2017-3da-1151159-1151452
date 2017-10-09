using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ElectronicPrescription.Models;
using Microsoft.AspNetCore.Authorization;

namespace ElectronicPrescription.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/Prescriptions")]
    public class PrescriptionsController : Controller
    {
        private readonly ElectronicPrescriptionContext _context;

        public PrescriptionsController(ElectronicPrescriptionContext context)
        {
            _context = context;
        }

        // GET: api/Prescriptions
        [HttpGet]
        public IEnumerable<PrescriptionDTO> GetPrescription()
        {
            var prescriptions = from p in _context.Prescription
                                select new PrescriptionDTO
                                {
                                    Id = p.PrescriptionId,
                                    ExpirationDate = p.ExpirationDate.ToShortDateString(),
                                    MedicalReceiptCreationDate = p.MedicalReceipt.CreationDate.ToShortDateString()
                                };

            return prescriptions;
        }

        // GET: api/Prescriptions/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPrescription([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var prescription = await _context.Prescription.Select(p =>
                                new PrescriptionDTO {
                                    Id = p.PrescriptionId,
                                    ExpirationDate = p.ExpirationDate.ToShortDateString(),
                                    MedicalReceiptCreationDate = p.MedicalReceipt.CreationDate.ToShortDateString()
                                }).SingleOrDefaultAsync(m => m.Id == id);

            if (prescription == null)
            {
                return NotFound();
            }

            return Ok(prescription);
        }

        // PUT: api/Prescriptions/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPrescription([FromRoute] int id, [FromBody] Prescription prescription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != prescription.PrescriptionId)
            {
                return BadRequest();
            }

            _context.Entry(prescription).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PrescriptionExists(id))
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

        // POST: api/Prescriptions
        [HttpPost]
        public async Task<IActionResult> PostPrescription([FromBody] Prescription prescription)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Prescription.Add(prescription);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPrescription", new { id = prescription.PrescriptionId }, prescription);
        }

        // DELETE: api/Prescriptions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePrescription([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var prescription = await _context.Prescription.SingleOrDefaultAsync(m => m.PrescriptionId == id);
            if (prescription == null)
            {
                return NotFound();
            }

            _context.Prescription.Remove(prescription);
            await _context.SaveChangesAsync();

            return Ok(prescription);
        }

        private bool PrescriptionExists(int id)
        {
            return _context.Prescription.Any(e => e.PrescriptionId == id);
        }
    }
}