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
            if (context.MedicalReceipt.Any() || context.Prescription.Any() 
                || context.Presentation.Any() || context.Medicine.Any() 
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
                new Medicine{ Name = "Kivexa" },
                new Medicine{ Name = "Abederil" },
                new Medicine{ Name = "Lombalgina" }
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
                new Presentation{ Form = "injection", Concentration = 14.2f, Quantity = 14, MedicineId = 1, DrugId = 1 },
                new Presentation{ Form = "tablet", Concentration = 22.5f, Quantity = 9, MedicineId = 2, DrugId = 2 },
                new Presentation{ Form = "syrup", Concentration = 101.9f, Quantity = 14, MedicineId = 3, DrugId = 3 }
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

            var medicalReceipts = new MedicalReceipt[]
            {
                new MedicalReceipt{ CreationDate = DateTime.Parse("2017-10-14")},
                new MedicalReceipt{ CreationDate = DateTime.Parse("2017-08-20")}
            };
            foreach (MedicalReceipt mr in medicalReceipts)
            {
                context.MedicalReceipt.Add(mr);
            }
            context.SaveChanges();

            var prescriptions = new Prescription[]
            {
                new Prescription{ ExpirationDate = DateTime.Parse("2018-01-05"),
                    MedicalReceiptId = 1, PresentationId = 1, PosologyId = 1 },
                new Prescription{ ExpirationDate = DateTime.Parse("2017-12-10"),
                    MedicalReceiptId = 2, PresentationId = 2, PosologyId = 2 },
                new Prescription{ ExpirationDate = DateTime.Parse("2017-11-11"),
                    MedicalReceiptId = 2, PresentationId = 3, PosologyId = 3 }
            };
            foreach (Prescription p in prescriptions)
            {
                context.Prescription.Add(p);
            }
            context.SaveChanges();
        }
    }
}
