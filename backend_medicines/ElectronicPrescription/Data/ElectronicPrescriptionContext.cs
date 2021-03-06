﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ElectronicPrescription.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace ElectronicPrescription.Models
{
    public class ElectronicPrescriptionContext : IdentityDbContext<UserEntity>
    {
        public ElectronicPrescriptionContext (DbContextOptions<ElectronicPrescriptionContext> options)
            : base(options)
        {
        }

        public DbSet<ElectronicPrescription.Models.Presentation> Presentation { get; set; }

        public DbSet<ElectronicPrescription.Models.Drug> Drug { get; set; }

        public DbSet<ElectronicPrescription.Models.Medicine> Medicine { get; set; }

        public DbSet<ElectronicPrescription.Models.PackageLeaflet> PackageLeaflet { get; set; }

        public DbSet<ElectronicPrescription.Models.Posology> Posology { get; set; }
    }
}
