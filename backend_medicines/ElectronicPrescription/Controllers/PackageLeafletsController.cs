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
    [Route("api/PackageLeaflets")]
    public class PackageLeafletsController : Controller
    {
        private readonly ElectronicPrescriptionContext _context;

        public PackageLeafletsController(ElectronicPrescriptionContext context)
        {
            _context = context;
        }

        // GET: api/PackageLeaflets
        [HttpGet]
        public IEnumerable<PackageLeafletDTO> GetPackageLeaflet()
        {
            var packageLeaflet = from pl in _context.PackageLeaflet
                                 select new PackageLeafletDTO()
                                 {
                                     PackageLeafletId = pl.PackageLeafletId,
                                     Description = pl.Description
                                 };

            return packageLeaflet;
        }

        // GET: api/PackageLeaflets/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPackageLeaflet([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var packageLeaflet = await _context.PackageLeaflet.Select(pl =>
                                 new PackageLeafletDTO()
                                 {
                                     PackageLeafletId = pl.PackageLeafletId,
                                     Description = pl.Description
                                 }).SingleOrDefaultAsync(pl => pl.PackageLeafletId == id);

            if (packageLeaflet == null)
            {
                return NotFound();
            }

            return Ok(packageLeaflet);
        }

        // PUT: api/PackageLeaflets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPackageLeaflet([FromRoute] int id, [FromBody] PackageLeaflet packageLeaflet)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != packageLeaflet.PackageLeafletId)
            {
                return BadRequest();
            }

            _context.Entry(packageLeaflet).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PackageLeafletExists(id))
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

        // POST: api/PackageLeaflets
        [HttpPost]
        public async Task<IActionResult> PostPackageLeaflet([FromBody] PackageLeaflet packageLeaflet)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.PackageLeaflet.Add(packageLeaflet);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPackageLeaflet", new { id = packageLeaflet.PackageLeafletId }, packageLeaflet);
        }

        // DELETE: api/PackageLeaflets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePackageLeaflet([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var packageLeaflet = await _context.PackageLeaflet.SingleOrDefaultAsync(m => m.PackageLeafletId == id);
            if (packageLeaflet == null)
            {
                return NotFound();
            }

            _context.PackageLeaflet.Remove(packageLeaflet);
            await _context.SaveChangesAsync();

            return Ok(packageLeaflet);
        }

        private bool PackageLeafletExists(int id)
        {
            return _context.PackageLeaflet.Any(e => e.PackageLeafletId == id);
        }
    }
}