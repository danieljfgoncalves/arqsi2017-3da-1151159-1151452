using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ElectronicPrescription.Models;

namespace ElectronicPrescription.Models
{
    public class ElectronicPrescriptionContext : DbContext
    {
        public ElectronicPrescriptionContext (DbContextOptions<ElectronicPrescriptionContext> options)
            : base(options)
        {
        }

        public DbSet<ElectronicPrescription.Models.MedicalReceipt> MedicalReceipt { get; set; }

        public DbSet<ElectronicPrescription.Models.Prescription> Prescription { get; set; }

        public DbSet<ElectronicPrescription.Models.Presentation> Presentation { get; set; }
    }
}
