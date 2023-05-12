using Modul3TestApp.Models;
using System.Linq;

namespace Modul3TestApp.Repository
{
    public interface IPaketiRepository
    {
        void Add(Paket paket);
        void Delete(Paket paket);
        IQueryable<Paket> GetAll();
        IQueryable<Paket> GetAllByName(string primalac);
        Paket GetById(int id);
        IQueryable<Paket> Pretraga(decimal najmanje, decimal najvise);
        void Update(Paket paket);
    }
}