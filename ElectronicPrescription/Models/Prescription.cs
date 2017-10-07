using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectronicPrescription.Models
{
    public class Prescription
    {
        public int PrescriptionId { get; set; }

        public DateTime ExpirationDate { get; set; }

        public virtual Presentation Presentation { get; set; }

        public virtual MedicalReceipt MedicalReceipt { get; set; }
    }
}
