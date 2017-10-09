using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace ElectronicPrescription.Models
{
    public class Posology
    {
        [ForeignKey("Prescription")]
        public int PosologyId { get; set; }

        public int Quantity { get; set; }

        public string Technique { get; set; }

        public string Interval { get; set; }

        public string Period { get; set; }

        public ICollection<PackageLeaflet> PackageLeaflet { get; set; }
    }
}
