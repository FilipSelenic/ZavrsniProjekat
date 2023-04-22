using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Modul3TestApp.Models
{
    public class Kurir
    {
        public int Id { get; set; }
        [Required]
        [StringLength(120)]
        public string Ime { get; set; }
        [Required]
        [Range(1940,2004)]
        public int GodinaRodjenja { get; set; }
    }
}
