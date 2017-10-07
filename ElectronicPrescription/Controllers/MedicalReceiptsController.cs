using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ElectronicPrescription.Models;

namespace ElectronicPrescription.Controllers
{
    [Produces("application/json")]
    [Route("api/MedicalReceipts")]
    public class MedicalReceiptsController : Controller
    {
        private readonly ElectronicPrescriptionContext _context;

        public MedicalReceiptsController(ElectronicPrescriptionContext context)
        {
            _context = context;
        }

        // GET: api/MedicalReceipts
        [HttpGet]
        public IEnumerable<MedicalReceipt> GetMedicalReceipt()
        {
            return _context.MedicalReceipt;
        }

        // GET: api/MedicalReceipts/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetMedicalReceipt([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medicalReceipt = await _context.MedicalReceipt.SingleOrDefaultAsync(m => m.MedicalReceiptId == id);

            if (medicalReceipt == null)
            {
                return NotFound();
            }

            return Ok(medicalReceipt);
        }

        // PUT: api/MedicalReceipts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedicalReceipt([FromRoute] int id, [FromBody] MedicalReceipt medicalReceipt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != medicalReceipt.MedicalReceiptId)
            {
                return BadRequest();
            }

            _context.Entry(medicalReceipt).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedicalReceiptExists(id))
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

        // POST: api/MedicalReceipts
        [HttpPost]
        public async Task<IActionResult> PostMedicalReceipt([FromBody] MedicalReceipt medicalReceipt)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.MedicalReceipt.Add(medicalReceipt);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMedicalReceipt", new { id = medicalReceipt.MedicalReceiptId }, medicalReceipt);
        }

        // DELETE: api/MedicalReceipts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMedicalReceipt([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var medicalReceipt = await _context.MedicalReceipt.SingleOrDefaultAsync(m => m.MedicalReceiptId == id);
            if (medicalReceipt == null)
            {
                return NotFound();
            }

            _context.MedicalReceipt.Remove(medicalReceipt);
            await _context.SaveChangesAsync();

            return Ok(medicalReceipt);
        }

        private bool MedicalReceiptExists(int id)
        {
            return _context.MedicalReceipt.Any(e => e.MedicalReceiptId == id);
        }
    }
}