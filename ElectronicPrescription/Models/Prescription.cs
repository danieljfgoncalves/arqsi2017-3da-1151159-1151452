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

        public int? MedicalReceiptId { get; set; }
        public MedicalReceipt MedicalReceipt { get; set; }

        public int? PresentationId { get; set; }

        public Presentation Presentation { get; set; }

        public Posology PrescribedPosology { get; set; }
    }
}
