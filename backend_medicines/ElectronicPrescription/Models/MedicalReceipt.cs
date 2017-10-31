using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectronicPrescription.Models
{
    public class MedicalReceipt
    {
        public int MedicalReceiptId { get; set; }

        public DateTime CreationDate { get; set; }

        public ICollection<Prescription> Prescription { get; set; }
    }
}
