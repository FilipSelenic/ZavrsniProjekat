using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Modul3TestApp.Models
{
    public class PaketDetailDTO
    {
        public int Id { get; set; }
        public string Posiljalac { get; set; }
        public string Primalac { get; set; }
        public decimal Tezina { get; set; }
        public int CenaPostarine { get; set; }
        public string KurirIme{ get; set; }

        public override bool Equals(object obj)
        {
            return obj is PaketDetailDTO dTO &&
                   Id == dTO.Id &&
                   Posiljalac == dTO.Posiljalac &&
                   Primalac == dTO.Primalac &&
                   Tezina == dTO.Tezina &&
                   CenaPostarine == dTO.CenaPostarine &&
                   KurirIme == dTO.KurirIme;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Id, Posiljalac, Primalac, Tezina, CenaPostarine, KurirIme);
        }
    }
}
