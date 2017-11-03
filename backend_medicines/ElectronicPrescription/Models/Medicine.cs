using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectronicPrescription.Models
{
    public class Medicine
    {
        public int MedicineId { get; set; }

        public String Name { get; set; }

        public int? DrugId { get; set; }

        public Drug Drug { get; set; }
    }
}
