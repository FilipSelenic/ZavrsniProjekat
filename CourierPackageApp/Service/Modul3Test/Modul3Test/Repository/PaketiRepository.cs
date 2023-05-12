using Microsoft.EntityFrameworkCore;
using Modul3Test.Models;
using Modul3TestApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Modul3TestApp.Repository
{
    public class PaketiRepository : IPaketiRepository
    {
        private readonly AppDbContext _context;
        public PaketiRepository(AppDbContext context)
        {
            this._context = context;
        }
        public IQueryable<Paket> GetAll()
        {
            return _context.Paketi.Include(p => p.Kurir).OrderBy(p => p.Tezina);
        }
        public Paket GetById(int id)
        {
            return _context.Paketi.Include(p => p.Kurir).FirstOrDefault(p => p.Id == id);
        }
        public IQueryable<Paket> GetAllByName(string primalac)
        {
            return _context.Paketi.Include(p => p.Kurir).Where(p => p.Primalac.Equals(primalac)).OrderBy(p => p.CenaPostarine);
        }

        public void Add(Paket paket)
        {
            _context.Paketi.Add(paket);
            _context.SaveChanges();
        }

        public void Update(Paket paket)
        {
            _context.Entry(paket).State = EntityState.Modified;

            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
        }

        public void Delete(Paket paket)
        {
            _context.Paketi.Remove(paket);
            _context.SaveChanges();
        }
        public IQueryable<Paket> Pretraga(decimal najmanje, decimal najvise)
        {
            return _context.Paketi.Include(p => p.Kurir).Where(p => p.Tezina > najmanje && p.Tezina < najvise).OrderByDescending(p => p.Tezina);
        }
    }
}
