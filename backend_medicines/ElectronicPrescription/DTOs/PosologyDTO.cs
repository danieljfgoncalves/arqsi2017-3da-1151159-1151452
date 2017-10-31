using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectronicPrescription.DTOs
{
    public class PosologyDTO
    {
        public int PosologyId { get; set; }

        public int Quantity { get; set; }

        public string Technique { get; set; }

        public string Interval { get; set; }

        public string Period { get; set; }
    }
}
