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
        [Key, ForeignKey("Prescription")]
        public int PresentationId { get; set; }

        public string Form { get; set; }

        public float Concentration { get; set; }

        public int Quantity { get; set; }

        public Prescription Prescription { get; set; }
    }
}
