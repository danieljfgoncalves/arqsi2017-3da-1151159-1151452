using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectronicPrescription.DTOs
{
    public class PresentationDTO
    {
        public int PresentationId { get; set; }

        public string Form { get; set; }

        public float Concentration { get; set; }

        public int Quantity { get; set; }
    }
}
