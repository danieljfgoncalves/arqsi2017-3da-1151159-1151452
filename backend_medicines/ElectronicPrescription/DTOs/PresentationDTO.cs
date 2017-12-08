using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ElectronicPrescription.Models;

namespace ElectronicPrescription.DTOs
{
    public class PresentationDTO
    {
        public int PresentationId { get; set; }

        public string Form { get; set; }

        public float Concentration { get; set; }

        public int Quantity { get; set; }

        public DrugDTO Drug { get; set; }

        public IEnumerable<MedicineDTO> Medicines { get; set; }

        public IEnumerable<PosologyDTO> Posologies { get; set; }
    }
}
