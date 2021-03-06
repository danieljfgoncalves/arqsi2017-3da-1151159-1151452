﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ElectronicPrescription.Models
{
    public class Drug
    {
        public int DrugId { get; set; }

        public String Name { get; set; }

        public ICollection<Presentation> Presentation { get; set; }

        public ICollection<Medicine> Medicine { get; set; }
    }
}
