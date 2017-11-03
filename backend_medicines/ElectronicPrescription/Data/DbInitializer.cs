using ElectronicPrescription.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectronicPrescription.Data
{
    public class DbInitializer
    {
        public static void Initialize(ElectronicPrescriptionContext context)
        {
            context.Database.EnsureCreated();

            // Look for any data.
            if ( context.Presentation.Any() || context.Medicine.Any() 
                || context.Posology.Any() || context.Drug.Any() 
                || context.PackageLeaflet.Any())
            {
                return;   // DB has been seeded
            }

            var drugs = new Drug[]
            {
                new Drug{ Name = "Abacavir" },
                new Drug{ Name = "Paracetamol" },
                new Drug{ Name = "Ibuprofeno" }
            };
            foreach (Drug d in drugs)
            {
                context.Drug.Add(d);
            }
            context.SaveChanges();

            var medicines = new Medicine[]
            {
                new Medicine{ Name = "Kivexa", DrugId = 1 },
                new Medicine{ Name = "Abederil", DrugId = 2 },
                new Medicine{ Name = "Lombalgina", DrugId = 3 }
            };
            foreach (Medicine m in medicines)
            {
                context.Medicine.Add(m);
            }
            context.SaveChanges();

            var posologies = new Posology[]
            {
                new Posology{ Quantity = 300, Technique = "injection", Interval = "12 hours", Period="7 days" },
                new Posology{ Quantity = 10, Technique = "oral", Interval = "8 hours", Period="3 days" },
                new Posology{ Quantity = 200, Technique = "oral", Interval = "1 day", Period="2 weeks" }
            };
            foreach (Posology p in posologies)
            {
                context.Posology.Add(p);
            }
            context.SaveChanges();

            var presentations = new Presentation[]
            {
                new Presentation{ Form = "injection", Concentration = 14.2f, Quantity = 14, DrugId = 1 },
                new Presentation{ Form = "tablet", Concentration = 22.5f, Quantity = 9, DrugId = 2 },
                new Presentation{ Form = "syrup", Concentration = 101.9f, Quantity = 14, DrugId = 3 }
            };
            foreach (Presentation p in presentations)
            {
                context.Presentation.Add(p);
            }
            context.SaveChanges();

            var packageLeaflets = new PackageLeaflet[]
            {
                new PackageLeaflet{ Description = "Kivexa Infar", PresentationId = 1, GenericPosologyId = 1 },
                new PackageLeaflet{ Description = "Abederil Generic", PresentationId = 2, GenericPosologyId = 2 },
                new PackageLeaflet{ Description = "Lombalgina Genis", PresentationId = 3, GenericPosologyId = 3 }
            };
            foreach (PackageLeaflet pf in packageLeaflets)
            {
                context.PackageLeaflet.Add(pf);
            }
            context.SaveChanges();
        }
    }
}
