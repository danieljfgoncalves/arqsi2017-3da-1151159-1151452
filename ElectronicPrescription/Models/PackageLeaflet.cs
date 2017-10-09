using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectronicPrescription.Models
{
    public class PackageLeaflet
    {
        public int PackageLeafletId { get; set; }

        public String Description { get; set; }

        public int? PresentationId { get; set; }

        public Presentation Presentation { get; set; }

        public int? GenericPosologyId { get; set; }

        public Posology GenericPosology { get; set; }
    }
}
