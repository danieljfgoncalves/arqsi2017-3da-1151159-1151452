using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectronicPrescription.Models
{
    public class PrescriptionDTO
    {
        public int Id { get; set; }

        public string ExpirationDate { get; set; }

        public string MedicalReceiptCreationDate { get; set; }
    }
}
