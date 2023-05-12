using Microsoft.EntityFrameworkCore;
using Modul3Test.Models;
using Modul3TestApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Modul3TestApp.Repository
{
    public class KurirRepository : IKurirRepository
    {
        private readonly AppDbContext _context;
        public KurirRepository(AppDbContext context)
        {
            this._context = context;
        }
        public IEnumerable<Kurir> GetAll()
        {
            return _context.Kuriri.OrderBy(p => p.Ime);
        }
        public Kurir GetById(int id)
        {
            return _context.Kuriri.FirstOrDefault(p => p.Id == id);
        }

        public IEnumerable<KurirTezinaDTO> GetTezina(decimal granica)
        {
            return _context.Paketi.Include(p => p.Kurir).GroupBy(b => b.KurirId)
                .Select(r => new KurirTezinaDTO
                {
                    KurirId = r.Key,
                    KurirName = _context.Kuriri.Where(c => c.Id == r.Key).Select(a => a.Ime).Single(),
                    PaketiTezina = _context.Paketi.Where(a => a.KurirId == r.Key).Select(a => a.Tezina).Sum()
                }).Where(p => p.PaketiTezina < granica).OrderByDescending(p => p.KurirName).ToList();
        }
        public IEnumerable<BrojPaketaDTO> GetStanje()
        {
            return _context.Paketi.Include(p => p.Kurir).GroupBy(b => b.KurirId)
                .Select(r => new BrojPaketaDTO
                {
                    KurirId = r.Key,
                    KurirName = _context.Kuriri.Where(c => c.Id == r.Key).Select(a => a.Ime).Single(),
                    BrojPaketa = _context.Paketi.Where(a => a.KurirId == r.Key).Count()
                }).OrderByDescending(p => p.BrojPaketa).ToList();
        }
        public IEnumerable<Kurir> GetAllByName(string ime)
        {
            return _context.Kuriri.Where(p => p.Ime.Contains(ime)).OrderByDescending(p => p.GodinaRodjenja).ThenBy(p => p.Ime).ToList();
        }
    }
}
