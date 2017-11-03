using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ElectronicPrescription.Models
{
    public class Presentation
    {
        public int PresentationId { get; set; }

        public string Form { get; set; }

        public float Concentration { get; set; }

        public int Quantity { get; set; }

        public int? DrugId { get; set; }

        public Drug Drug { get; set; }

        public ICollection<PackageLeaflet> PackageLeaflet { get; set; }
    }
}
