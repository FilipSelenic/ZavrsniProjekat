using Modul3TestApp.Models;
using System.Collections.Generic;

namespace Modul3TestApp.Repository
{
    public interface IKurirRepository
    {
        IEnumerable<Kurir> GetAll();
        IEnumerable<Kurir> GetAllByName(string ime);
        Kurir GetById(int id);
        IEnumerable<BrojPaketaDTO> GetStanje();
        IEnumerable<KurirTezinaDTO> GetTezina(decimal granica);
    }
}